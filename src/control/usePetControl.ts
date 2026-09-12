import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { petService } from '../services/petService';

export function usePets() {
  return useQuery({ queryKey: ['pets'], queryFn: petService.listar });
}

export function useCriarPet() {
  const client = useQueryClient();
  return useMutation({ mutationFn: petService.criar, onSuccess: () => client.invalidateQueries({ queryKey: ['pets'] }) });
}

export function useAtualizarPet() {
  const client = useQueryClient();
  return useMutation({ mutationFn: petService.atualizar, onSuccess: () => client.invalidateQueries({ queryKey: ['pets'] }) });
}

export function useExcluirPet() {
  const client = useQueryClient();
  return useMutation({ mutationFn: petService.excluir, onSuccess: () => client.invalidateQueries({ queryKey: ['pets'] }) });
}
