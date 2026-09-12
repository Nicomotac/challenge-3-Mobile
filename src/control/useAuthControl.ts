import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CadastroUsuario, Credenciais } from '../model/Usuario';
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

export function useEntrar() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (credenciais: Credenciais) => {
      const usuario = await authService.entrar(credenciais);
      await authService.salvarCredenciais(credenciais);
      return usuario;
    },
    onSuccess: (usuario) => client.setQueryData(['auth', 'session'], usuario),
  });
}

export function useCadastrarUsuario() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (dados: CadastroUsuario) => {
      const usuario = await authService.cadastrar(dados);
      await authService.salvarCredenciais({ username: dados.username, password: dados.password });
      return usuario;
    },
    onSuccess: (usuario) => client.setQueryData(['auth', 'session'], usuario),
  });
}

export function useSair() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: authService.sair,
    onSuccess: () => {
      client.setQueryData(['auth', 'session'], null);
      client.removeQueries({ queryKey: ['tutores'] });
      client.removeQueries({ queryKey: ['pets'] });
    },
  });
}
