import { Tutor, TutorPayload } from '../model/Tutor';
import { api } from './api';

export const tutorService = {
  async listar(): Promise<Tutor[]> {
    const response = await api.get<Tutor[]>('/api/responsaveis');
    return Array.isArray(response.data) ? response.data : [];
  },

  async criar(dados: TutorPayload): Promise<Tutor> {
    const response = await api.post<Tutor>('/api/responsaveis', dados);
    return response.data;
  },

  async atualizar({ id, dados }: { id: number; dados: TutorPayload }): Promise<Tutor> {
    const response = await api.put<Tutor>(`/api/responsaveis/${id}`, dados);
    return response.data;
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`/api/responsaveis/${id}`);
  },
};
