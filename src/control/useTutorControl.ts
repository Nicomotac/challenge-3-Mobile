import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tutorService } from '../services/tutorService';
import type { TutorPayload } from '../model/Tutor';

export function useTutores() {
  return useQuery({ queryKey: ['tutores'], queryFn: tutorService.listar });
}

export function useOperacoesTutor() {
  const queryClient = useQueryClient();

  const atualizarListas = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['tutores'] }),
      queryClient.invalidateQueries({ queryKey: ['pets'] }),
    ]);
  };

  const criar = useMutation({
    mutationFn: (dados: TutorPayload) => tutorService.criar(dados),
    onSuccess: atualizarListas,
  });
  const atualizar = useMutation({
    mutationFn: ({ id, dados }: { id: number; dados: TutorPayload }) =>
      tutorService.atualizar({ id, dados }),
    onSuccess: atualizarListas,
  });
  const excluir = useMutation({
    mutationFn: (id: number) => tutorService.excluir(id),
    onSuccess: atualizarListas,
  });

  return { criar, atualizar, excluir };
}
