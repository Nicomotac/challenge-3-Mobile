import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim() ||
  (__DEV__ ? 'http://10.0.2.2:8082' : '');
export const CREDENTIALS_KEY = '@clyvo_credentials';

export const api = axios.create({
  baseURL: API_URL || undefined,
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  if (!API_URL) {
    throw new Error('Endereço da API não configurado nesta versão do aplicativo.');
  }
  if (config.url?.includes('/api/auth/register')) return config;

  const raw = await AsyncStorage.getItem(CREDENTIALS_KEY);
  if (raw && !config.auth) {
    const credentials = JSON.parse(raw) as { username: string; password: string };
    config.auth = credentials;
  }
  return config;
});

export function mensagemErroApi(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; error?: string } | undefined;
    if (data?.message) return data.message;
    if (error.response?.status === 401) return 'Usuário ou senha inválidos.';
    if (error.response?.status === 403) return 'Seu usuário não possui permissão para esta operação.';
    if (error.code === 'ECONNABORTED') return 'A API não respondeu no tempo esperado.';
    if (error.code === 'ERR_NETWORK') return 'Não foi possível conectar à API. Verifique sua conexão.';
    return 'Não foi possível concluir a operação com a API.';
  }
  if (error instanceof Error && error.message.includes('API não configurado')) {
    return error.message;
  }
  return 'Não foi possível concluir a operação com a API.';
}
