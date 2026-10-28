import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import type { Pet, PetPayload } from '../model/Pet';
import { mensagemErroApi } from '../services/api';
import { petSchema, primeiraMensagemYup } from '../validation/schemas';
import { useOperacoesPet, usePets } from './usePetControl';
import { useTutores } from './useTutorControl';

const vazio = {
  nome: '', idade: '', especie: '', raca: '', sexo: '',
  dataNascimento: '', peso: '', responsavelId: 0,
};

export function usePetFormulario() {
  const { usuario } = useAuth();
  const admin = usuario?.role === 'ADMIN';
  const pets = usePets();
  const tutores = useTutores();
  const { criar, atualizar, excluir } = useOperacoesPet();
  const [form, setForm] = useState({ ...vazio });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [erro, setErro] = useState('');
  const pendente = criar.isPending || atualizar.isPending || excluir.isPending;

  function limpar() {
    setForm({ ...vazio });
    setEditandoId(null);
    setErro('');
  }

  function editar(pet: Pet) {
    setForm({
      nome: pet.nome,
      idade: pet.idade?.toString() ?? '',
      especie: pet.especie,
      raca: pet.raca ?? '',
      sexo: pet.sexo,
      dataNascimento: pet.dataNascimento ?? '',
      peso: pet.peso?.toString() ?? '',
      responsavelId: pet.responsavelId,
    });
    setEditandoId(pet.id);
    setErro('');
  }

  async function salvar() {
    if (!admin || pendente) return;
    setErro('');
    const dados: PetPayload = {
      nome: form.nome.trim(),
      idade: form.idade.trim() ? Number(form.idade) : null,
      especie: form.especie.trim(),
      raca: form.raca.trim() || null,
      sexo: form.sexo.trim(),
      dataNascimento: form.dataNascimento.trim() || null,
      peso: form.peso.trim() ? Number(form.peso.replace(',', '.')) : null,
      responsavelId: form.responsavelId,
    };
    try {
      await petSchema.validate(dados);
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
    Alert.alert('Excluir pet?', 'O cadastro será removido permanentemente.', [
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
    admin, pets, tutores, form, setForm, editandoId,
    erro, pendente, limpar, editar, salvar, confirmarExclusao,
  };
}
