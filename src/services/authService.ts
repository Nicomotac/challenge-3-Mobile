import AsyncStorage from '@react-native-async-storage/async-storage';
import { CadastroUsuario, Credenciais, Usuario } from '../model/Usuario';
import { api, CREDENTIALS_KEY } from './api';

export const authService = {
  async entrar({ username, password }: Credenciais): Promise<Usuario> {
    const response = await api.get<Usuario>('/api/auth/me', {
      auth: { username, password },
    });
    return response.data;
  },

  async cadastrar(dados: CadastroUsuario): Promise<Usuario> {
    await api.post('/api/auth/register', dados);
    return this.entrar({ username: dados.username, password: dados.password });
  },

  async salvarCredenciais(credenciais: Credenciais): Promise<void> {
    await AsyncStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credenciais));
  },

  async carregarCredenciais(): Promise<Credenciais | null> {
    const raw = await AsyncStorage.getItem(CREDENTIALS_KEY);
    return raw ? (JSON.parse(raw) as Credenciais) : null;
  },

  async sair(): Promise<void> {
    await AsyncStorage.removeItem(CREDENTIALS_KEY);
  },
};
