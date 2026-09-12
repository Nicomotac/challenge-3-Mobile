import { Pet, PetPayload } from '../model/Pet';
import { api } from './api';

export const petService = {
  async listar(): Promise<Pet[]> {
    const response = await api.get<Pet[]>('/api/animais');
    return Array.isArray(response.data) ? response.data : [];
  },

  async criar(dados: PetPayload): Promise<Pet> {
    const response = await api.post<Pet>('/api/animais', dados);
    return response.data;
  },

  async atualizar({ id, dados }: { id: number; dados: PetPayload }): Promise<Pet> {
    const response = await api.put<Pet>(`/api/animais/${id}`, dados);
    return response.data;
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`/api/animais/${id}`);
  },
};
