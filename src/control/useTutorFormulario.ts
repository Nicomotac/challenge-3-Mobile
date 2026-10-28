import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import type { Tutor, TutorPayload } from '../model/Tutor';
import { mensagemErroApi } from '../services/api';
import { primeiraMensagemYup, tutorSchema } from '../validation/schemas';
import { useOperacoesTutor, useTutores } from './useTutorControl';

const vazio = { nome: '', cpf: '', dataNascimento: '', email: '', celular: '' };

export function useTutorFormulario() {
  const { usuario } = useAuth();
  const admin = usuario?.role === 'ADMIN';
  const tutores = useTutores();
  const { criar, atualizar, excluir } = useOperacoesTutor();
  const [form, setForm] = useState({ ...vazio });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [erro, setErro] = useState('');

  const pendente = criar.isPending || atualizar.isPending || excluir.isPending;

  function limpar() {
    setForm({ ...vazio });
    setEditandoId(null);
    setErro('');
  }

  function editar(tutor: Tutor) {
    setForm({
      nome: tutor.nome,
      cpf: tutor.cpf ?? '',
      dataNascimento: tutor.dataNascimento ?? '',
      email: tutor.email,
      celular: tutor.celular,
    });
    setEditandoId(tutor.id);
    setErro('');
  }

  async function salvar() {
    if (!admin || pendente) return;
    setErro('');
    const dados: TutorPayload = {
      nome: form.nome.trim(),
      cpf: form.cpf.trim() || null,
      dataNascimento: form.dataNascimento.trim() || null,
      email: form.email.trim(),
      celular: form.celular.trim(),
    };
    try {
      await tutorSchema.validate(dados);
      if (editandoId !== null) {
        await atualizar.mutateAsync({ id: editandoId, dados });
      } else {
        await criar.mutateAsync(dados);
      }
      limpar();
    } catch (error) {
      setErro(
        error instanceof Error && error.name === 'ValidationError'
          ? primeiraMensagemYup(error)
          : mensagemErroApi(error),
      );
    }
  }

  function confirmarExclusao(id: number) {
    if (!admin || pendente) return;
    Alert.alert('Excluir tutor?', 'Primeiro exclua os pets vinculados a ele.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluir.mutateAsync(id);
          } catch (error) {
            Alert.alert('Não foi possível excluir', mensagemErroApi(error));
          }
        },
      },
    ]);
  }

  return {
    admin, tutores, form, setForm, editandoId, erro, pendente,
    limpar, editar, salvar, confirmarExclusao,
  };
}
