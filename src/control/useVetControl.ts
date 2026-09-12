import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vet } from "../model/Vet";

const STORAGE_DADOS = "@vet";

const vetInicial: Vet = {
  id: null,
  nome: "",
  crmv: "",
  especialidade: "",
  telefone: "",
  cidade: "",
  email: "",
};

export default function useVetControl() {
  const [vet, setVet] = useState<Vet>(vetInicial);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function atualizarCampo(campo: keyof Vet, valor: string) {
    setVet({
      ...vet,
      [campo]: campo === "id" ? Number(valor) : valor,
    });
  }

  async function salvarLocalmente() {
    const vetParaSalvar: Vet = {
      ...vet,
      id: vet.id ? vet.id : Date.now(),
    };

    await AsyncStorage.setItem(STORAGE_DADOS, JSON.stringify(vetParaSalvar));

    setVet(vetParaSalvar);
    setMensagem("Veterinário salvo no AsyncStorage com sucesso!");
    setErro("");
  }

  async function carregarVetLocal() {
    const dados = await AsyncStorage.getItem(STORAGE_DADOS);

    if (dados) {
      setVet(JSON.parse(dados));
      setMensagem("Veterinário carregado do AsyncStorage.");
      setErro("");
    } else {
      setMensagem("Nenhum veterinário salvo no AsyncStorage.");
      setErro("");
    }
  }

  function limparFormulario() {
    setVet(vetInicial);
    setMensagem("");
    setErro("");
  }

  async function apagarVetLocal() {
    await AsyncStorage.removeItem(STORAGE_DADOS);

    setVet(vetInicial);
    setMensagem("Veterinário apagado do AsyncStorage.");
    setErro("");
  }

  async function verificarStorage() {
    const dados = await AsyncStorage.getItem(STORAGE_DADOS);

    console.log("DADOS DO VETERINÁRIO NO ASYNCSTORAGE:", dados);

    if (dados) {
      setMensagem("Existe um veterinário salvo no AsyncStorage. Veja o console.");
      setErro("");
    } else {
      setMensagem("Nenhum veterinário encontrado no AsyncStorage.");
      setErro("");
    }
  }

  return {
    vet,
    mensagem,
    erro,
    atualizarCampo,
    salvarLocalmente,
    carregarVetLocal,
    limparFormulario,
    apagarVetLocal,
    verificarStorage,
  };
}