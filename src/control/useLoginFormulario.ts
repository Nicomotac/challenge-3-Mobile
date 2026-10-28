import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mensagemErroApi } from '../services/api';
import { loginSchema, primeiraMensagemYup } from '../validation/schemas';

export function useLoginFormulario() {
  const { entrar, entrando } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  async function enviar() {
    if (entrando) return;
    setErro('');
    try {
      await loginSchema.validate({ username, password });
      await entrar({ username: username.trim(), password });
    } catch (error) {
      setErro(
        error instanceof Error && error.name === 'ValidationError'
          ? primeiraMensagemYup(error)
          : mensagemErroApi(error),
      );
    }
  }

  return { username, setUsername, password, setPassword, erro, entrando, enviar };
}
