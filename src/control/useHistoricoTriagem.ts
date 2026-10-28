import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { NovoRegistroTriagem } from '../model/RegistroTriagem';
import { historicoTriagemService } from '../services/historicoTriagemService';

export function useHistoricoTriagem(usuario: string) {
  return useQuery({
    queryKey: ['historico-triagens', usuario],
    queryFn: () => historicoTriagemService.listar(usuario),
    enabled: Boolean(usuario),
  });
}

export function useRegistrarTriagem(usuario: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (dados: NovoRegistroTriagem) => historicoTriagemService.registrar(usuario, dados),
    onSuccess: () => client.invalidateQueries({ queryKey: ['historico-triagens', usuario] }),
  });
}
