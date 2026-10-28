import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ModoTema = 'sistema' | 'claro' | 'escuro';
export type Cores = {
  fundo: string;
  superficie: string;
  fundoSecundario: string;
  texto: string;
  textoSecundario: string;
  borda: string;
  primaria: string;
  perigo: string;
};

const claras: Cores = {
  fundo: '#f8fafc', superficie: '#ffffff', fundoSecundario: '#e2e8f0',
  texto: '#1e293b', textoSecundario: '#64748b', borda: '#cbd5e1',
  primaria: '#2563eb', perigo: '#dc2626',
};
const escuras: Cores = {
  fundo: '#0f172a', superficie: '#1e293b', fundoSecundario: '#334155',
  texto: '#f8fafc', textoSecundario: '#cbd5e1', borda: '#475569',
  primaria: '#60a5fa', perigo: '#f87171',
};

type TemaContexto = {
  modo: ModoTema;
  modoEfetivo: 'claro' | 'escuro';
  cores: Cores;
  definirModo: (modo: ModoTema) => void;
};

const TemaContext = createContext<TemaContexto | null>(null);
const CHAVE_TEMA = '@clyvo_tema';

export function TemaProvider({ children }: { children: React.ReactNode }) {
  const preferenciaSO = useColorScheme();
  const [modo, setModo] = useState<ModoTema>('sistema');

  useEffect(() => {
    AsyncStorage.getItem(CHAVE_TEMA)
      .then((salvo) => {
        if (salvo === 'claro' || salvo === 'escuro' || salvo === 'sistema') setModo(salvo);
      })
      .catch(() => {});
  }, []);

  const definirModo = (novoModo: ModoTema) => {
    setModo(novoModo);
    AsyncStorage.setItem(CHAVE_TEMA, novoModo).catch(() => {});
  };
  const modoEfetivo = modo === 'sistema' ? (preferenciaSO === 'dark' ? 'escuro' : 'claro') : modo;
  const cores = modoEfetivo === 'escuro' ? escuras : claras;
  const valor = useMemo(() => ({ modo, modoEfetivo, cores, definirModo }), [modo, modoEfetivo, cores]);
  return <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>;
}

export function useTema() {
  const tema = useContext(TemaContext);
  if (!tema) throw new Error('useTema deve ser utilizado dentro de TemaProvider.');
  return tema;
}
