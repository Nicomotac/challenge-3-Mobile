import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mensagemErroApi } from '../services/api';
import { cadastroSchema, primeiraMensagemYup } from '../validation/schemas';

export function useCadastroFormulario() {
  const { cadastrar, cadastrando } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  async function enviar() {
    if (cadastrando) return;
    setErro('');
    const dados = {
      nome: nome.trim(),
      email: email.trim(),
      username: username.trim(),
      password,
    };
    try {
      await cadastroSchema.validate(dados);
      await cadastrar(dados);
    } catch (error) {
      setErro(
        error instanceof Error && error.name === 'ValidationError'
          ? primeiraMensagemYup(error)
          : mensagemErroApi(error),
      );
    }
  }

  return {
    nome, setNome, email, setEmail, username, setUsername,
    password, setPassword, erro, cadastrando, enviar,
  };
}
