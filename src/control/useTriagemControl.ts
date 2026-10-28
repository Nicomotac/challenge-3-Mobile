import { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import type { ResultadoTriagem, SintomasTriagem } from '../model/Triagem';
import { notificarRiscoTriagem } from '../notifications/notificationService';
import { analisarTriagem } from '../services/triagemService';
import { useRegistrarTriagem } from './useHistoricoTriagem';
import { usePets } from './usePetControl';

const sintomasIniciais: SintomasTriagem = {
  vomito: false,
  diarreia: false,
  apatia: false,
  dificuldadeRespirar: false,
  observacoes: '',
};

export function useTriagemControl() {
  const pets = usePets();
  const { usuario } = useAuth();
  const registrar = useRegistrarTriagem(usuario?.username ?? '');
  const [petId, setPetId] = useState<number | null>(null);
  const [sintomas, setSintomas] = useState<SintomasTriagem>({ ...sintomasIniciais });
  const [resultado, setResultado] = useState<ResultadoTriagem | null>(null);

  const pet = useMemo(
    () => pets.data?.find((item) => item.id === petId) ?? null,
    [pets.data, petId],
  );

  function selecionarPet(id: number) {
    setPetId(id);
    setSintomas({ ...sintomasIniciais });
    setResultado(null);
  }

  function alterarSintoma(chave: keyof SintomasTriagem, valor: boolean | string) {
    setSintomas((anterior) => ({ ...anterior, [chave]: valor }));
    setResultado(null);
  }

  async function executarTriagem() {
    if (!pet) {
      Alert.alert('Selecione um pet', 'Escolha o pet antes de iniciar a avaliação.');
      return;
    }

    const avaliacao = analisarTriagem(sintomas);
    setResultado(avaliacao);
    try {
      await registrar.mutateAsync({
        petId: pet.id,
        petNome: pet.nome,
        usuario: usuario?.username ?? '',
        sintomas: { ...sintomas },
        resultado: avaliacao,
      });
    } catch {
      Alert.alert('Não foi possível salvar', 'O resultado da triagem não entrou no histórico local.');
    }

    if (avaliacao.nivel === 'ALTO' || avaliacao.nivel === 'EMERGÊNCIA') {
      try {
        const autorizado = await notificarRiscoTriagem(
          pet.nome, avaliacao.nivel, avaliacao.mensagem,
        );
        if (!autorizado) {
          Alert.alert('Notificações desativadas', 'Ative a permissão nas configurações do celular.');
        }
      } catch {
        Alert.alert('Aviso', 'Triagem realizada, mas não foi possível exibir a notificação.');
      }
    }
  }

  return {
    pets, petId, pet, sintomas, resultado,
    pendente: registrar.isPending,
    selecionarPet, alterarSintoma, executarTriagem,
  };
}
