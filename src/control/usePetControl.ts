import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { petService } from '../services/petService';
import type { PetPayload } from '../model/Pet';

export function usePets() {
  return useQuery({ queryKey: ['pets'], queryFn: petService.listar });
}

export function useOperacoesPet() {
  const queryClient = useQueryClient();
  const atualizarLista = () => queryClient.invalidateQueries({ queryKey: ['pets'] });

  const criar = useMutation({
    mutationFn: (dados: PetPayload) => petService.criar(dados),
    onSuccess: atualizarLista,
  });
  const atualizar = useMutation({
    mutationFn: ({ id, dados }: { id: number; dados: PetPayload }) =>
      petService.atualizar({ id, dados }),
    onSuccess: atualizarLista,
  });
  const excluir = useMutation({
    mutationFn: (id: number) => petService.excluir(id),
    onSuccess: atualizarLista,
  });

  return { criar, atualizar, excluir };
}
