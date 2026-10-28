import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RegistroTriagem, NovoRegistroTriagem } from '../model/RegistroTriagem';

const chave = (usuario: string) => `@clyvo_triagens:${usuario}`;

export const historicoTriagemService = {
  async listar(usuario: string): Promise<RegistroTriagem[]> {
    if (!usuario) return [];
    const raw = await AsyncStorage.getItem(chave(usuario));
    if (!raw) return [];
    const registros: unknown = JSON.parse(raw);
    if (!Array.isArray(registros)) return [];
    return (registros as RegistroTriagem[]).sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
  },

  async registrar(usuario: string, dados: NovoRegistroTriagem): Promise<RegistroTriagem> {
    if (!usuario) throw new Error('É necessário estar autenticado para salvar uma triagem.');
    const registro: RegistroTriagem = {
      ...dados,
      usuario,
      id: `${Date.now()}-${dados.petId}`,
      criadoEm: new Date().toISOString(),
    };
    const anteriores = await this.listar(usuario);
    await AsyncStorage.setItem(chave(usuario), JSON.stringify([registro, ...anteriores]));
    return registro;
  },
};
