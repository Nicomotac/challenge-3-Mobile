import React, { createContext, ReactNode, useContext } from 'react';
import { CadastroUsuario, Credenciais, Usuario } from '../model/Usuario';
import { useCadastrarUsuario, useEntrar, useSair, useSessao } from '../control/useAuthControl';

type AuthContextValue = {
  usuario: Usuario | null;
  carregandoSessao: boolean;
  entrando: boolean;
  cadastrando: boolean;
  entrar: (dados: Credenciais) => Promise<Usuario>;
  cadastrar: (dados: CadastroUsuario) => Promise<Usuario>;
  sair: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const sessao = useSessao();
  const login = useEntrar();
  const cadastro = useCadastrarUsuario();
  const logout = useSair();

  return (
    <AuthContext.Provider value={{
      usuario: sessao.data || null,
      carregandoSessao: sessao.isLoading,
      entrando: login.isPending,
      cadastrando: cadastro.isPending,
      entrar: login.mutateAsync,
      cadastrar: cadastro.mutateAsync,
      sair: async () => { await logout.mutateAsync(); },
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth deve ser utilizado dentro de AuthProvider.');
  return contexto;
}
