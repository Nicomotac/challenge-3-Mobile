import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CadastroUsuario, Credenciais } from '../model/Usuario';
import { authService } from '../services/authService';

export function useSessao() {
  return useQuery({
    queryKey: ['auth', 'session'],
    retry: false,
    queryFn: async () => {
      const credenciais = await authService.carregarCredenciais();
      if (!credenciais) return null;
      try {
        return await authService.entrar(credenciais);
      } catch {
        await authService.sair();
        return null;
      }
    },
  });
}

export function useAcoesAuth() {
  const queryClient = useQueryClient();
  const chaveSessao = ['auth', 'session'] as const;

  const login = useMutation({
    mutationFn: async (credenciais: Credenciais) => {
      const usuario = await authService.entrar(credenciais);
      await authService.salvarCredenciais(credenciais);
      return usuario;
    },
    onSuccess: (usuario) => queryClient.setQueryData(chaveSessao, usuario),
  });

  const cadastro = useMutation({
    mutationFn: async (dados: CadastroUsuario) => {
      const usuario = await authService.cadastrar(dados);
      await authService.salvarCredenciais({
        username: dados.username,
        password: dados.password,
      });
      return usuario;
    },
    onSuccess: (usuario) => queryClient.setQueryData(chaveSessao, usuario),
  });

  const logout = useMutation({
    mutationFn: authService.sair,
    onSuccess: () => {
      queryClient.setQueryData(chaveSessao, null);
      queryClient.removeQueries({ queryKey: ['tutores'] });
      queryClient.removeQueries({ queryKey: ['pets'] });
      queryClient.removeQueries({ queryKey: ['historico-triagens'] });
    },
  });

  return { login, cadastro, logout };
}
