import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tutorService } from '../services/tutorService';

export function useTutores() {
  return useQuery({ queryKey: ['tutores'], queryFn: tutorService.listar });
}

export function useCriarTutor() {
  const client = useQueryClient();
  return useMutation({ mutationFn: tutorService.criar, onSuccess: () => client.invalidateQueries({ queryKey: ['tutores'] }) });
}

export function useAtualizarTutor() {
  const client = useQueryClient();
  return useMutation({ mutationFn: tutorService.atualizar, onSuccess: () => client.invalidateQueries({ queryKey: ['tutores'] }) });
}

export function useExcluirTutor() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: tutorService.excluir,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['tutores'] });
      await client.invalidateQueries({ queryKey: ['pets'] });
    },
  });
}
