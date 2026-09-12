import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tutor } from "../model/Tutor";

const STORAGE_DADOS = "@tutor";

const tutorInicial: Tutor = {
  id: null,
  nome: "",
  email: "",
  telefone: "",
};

export default function useTutorControl() {
  const [tutor, setTutor] = useState<Tutor>(tutorInicial);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");


  function atualizarCampo(campo: keyof Tutor, valor: string) {
    setTutor({
      ...tutor,
      [campo]: campo === "id" ? Number(valor) : valor,
    });
  }

  
  async function salvarLocalmente() {
    const tutorParaSalvar: Tutor = {
      ...tutor,
      id: tutor.id ? tutor.id : Date.now(),
    };

    await AsyncStorage.setItem(STORAGE_DADOS, JSON.stringify(tutorParaSalvar));

    setTutor(tutorParaSalvar);
    setMensagem("Tutor salvo no AsyncStorage com sucesso!");
    setErro("");
  }

  async function carregarTutorLocal() {
    const dados = await AsyncStorage.getItem(STORAGE_DADOS);

    if (dados) {
      setTutor(JSON.parse(dados));
      setMensagem("Tutor carregado do AsyncStorage.");
      setErro("");
    } else {
      setMensagem("Nenhum tutor salvo no AsyncStorage.");
      setErro("");
    }
  }

  function limparFormulario() {
    setTutor(tutorInicial);
    setMensagem("");
    setErro("");
  }

  async function apagarTutorLocal() {
    await AsyncStorage.removeItem(STORAGE_DADOS);

    setTutor(tutorInicial);
    setMensagem("Tutor apagado do AsyncStorage.");
    setErro("");
  }

  async function verificarStorage() {
    const dados = await AsyncStorage.getItem(STORAGE_DADOS);

    console.log("DADOS DO TUTOR NO ASYNCSTORAGE:", dados);

    if (dados) {
      setMensagem("Existe um tutor salvo no AsyncStorage. Veja o console.");
      setErro("");
    } else {
      setMensagem("Nenhum tutor encontrado no AsyncStorage.");
      setErro("");
    }
  }

  return {
    tutor,
    mensagem,
    erro,
    atualizarCampo,
    salvarLocalmente,
    carregarTutorLocal,
    limparFormulario,
    apagarTutorLocal,
    verificarStorage,
  };
}