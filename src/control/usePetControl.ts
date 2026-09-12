import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pet } from "../model/Pet";

const STORAGE_DADOS = "@pet";

const petInicial: Pet = {
  id: null,
  nome: "",
  especie: "",
  raca: "",
  idade: "",
  peso: "",
};

export default function usePetControl() {
  const [pet, setPet] = useState<Pet>(petInicial);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

function atualizarCampo(campo: keyof Pet, valor: string) {
  setPet({...pet,[campo]: campo === "peso" ? Number(valor) : valor,
  });
}

async function salvarLocalmente() {
  try {
    const petParaSalvar: Pet = {
      ...pet,
      id: pet.id ? pet.id : Date.now(),
    };

    await AsyncStorage.setItem("@pet", JSON.stringify(petParaSalvar));

    const dadosSalvos = await AsyncStorage.getItem("@pet");

    console.log("PET REGISTRADO NO ASYNCSTORAGE:", dadosSalvos);

    setPet(petParaSalvar);
    setMensagem("Pet salvo localmente com sucesso!");
    setErro("");
  } catch (error) {
    console.log("ERRO AO SALVAR PET NO ASYNCSTORAGE:", error);

    setErro("Erro ao salvar pet localmente.");
    setMensagem("");
  }
}

  async function carregarPetLocal() {
    const dados = await AsyncStorage.getItem(STORAGE_DADOS);

    if (dados) {
      setPet(JSON.parse(dados));
      setMensagem("Pet carregado do AsyncStorage.");
      setErro("");
    } else {
      setMensagem("Nenhum pet salvo no AsyncStorage.");
      setErro("");
    }
  }

  function limparFormulario() {
    setPet(petInicial);
    setMensagem("");
    setErro("");
  }

  async function apagarPetLocal() {
    await AsyncStorage.removeItem(STORAGE_DADOS);

    setPet(petInicial);
    setMensagem("Pet apagado do AsyncStorage.");
    setErro("");
  }


  return {
    pet,
    mensagem,
    erro,
    atualizarCampo,
    salvarLocalmente,
    carregarPetLocal,
    limparFormulario,
    apagarPetLocal,
  };
}