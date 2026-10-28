import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { orientarSobrePet } from '../services/iaService';
import { useHistoricoTriagem } from './useHistoricoTriagem';
import { usePets } from './usePetControl';

type Mensagem = { id: string; autor: 'usuario' | 'assistente'; texto: string };

export function useAssistenteControl() {
  const { usuario } = useAuth();
  const pets = usePets();
  const historico = useHistoricoTriagem(usuario?.username ?? '');
  const [petId, setPetId] = useState<number | null>(null);
  const [texto, setTexto] = useState('');
  const [erro, setErro] = useState('');
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const pet = useMemo(() => pets.data?.find((item) => item.id === petId) ?? null, [pets.data, petId]);

  function selecionarPet(id: number) {
    setPetId(id);
    setMensagens([]);
    setErro('');
  }

  function enviar() {
    const pergunta = texto.trim();
    if (!pergunta) return;
    if (!pet) {
      setErro('Selecione um pet para consultar orientações.');
      return;
    }
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const resposta = orientarSobrePet(pergunta, pet, historico.data ?? []);
    setMensagens((anteriores) => [
      ...anteriores,
      { id: `usuario-${id}`, autor: 'usuario', texto: pergunta },
      { id: `assistente-${id}`, autor: 'assistente', texto: resposta },
    ]);
    setTexto('');
    setErro('');
  }

  return { pets, historico, petId, selecionarPet, texto, setTexto, mensagens, erro, enviar };
}
