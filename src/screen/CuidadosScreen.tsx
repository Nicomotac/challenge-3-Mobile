import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { RootDrawerParamList } from "../navigation/navigation";

type Props = DrawerScreenProps<RootDrawerParamList, "Cuidados"> & {
  token: string;
};

type Cuidado = {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  tipo: string;
  dataPrevista: string;
};


const cuidadosMock: Cuidado[] = [
  {
    id: 1,
    titulo: "Vacina antirrábica",
    descricao: "Aplicação anual recomendada para proteção do pet.",
    status: "PENDENTE",
    tipo: "VACINA",
    dataPrevista: "2026-05-20",
  },
  {
    id: 2,
    titulo: "Check-up anual",
    descricao: "Consulta preventiva para avaliar a saúde geral do animal.",
    status: "RECOMENDADO",
    tipo: "CHECKUP",
    dataPrevista: "2026-06-10",
  },
  {
    id: 3,
    titulo: "Retorno veterinário",
    descricao: "Reconsulta após atendimento, exame ou tratamento.",
    status: "AGENDÁVEL",
    tipo: "RETORNO",
    dataPrevista: "2026-06-25",
  },
];

const CuidadosScreen: React.FC<Props> = ({ navigation }) => {
  const [cuidados, setCuidados] = useState<Cuidado[]>([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarCuidados();
  }, []);

  async function carregarCuidados() {
    const dados = await AsyncStorage.getItem("@cuidados");

    if (dados) {
      setCuidados(JSON.parse(dados));
      setMensagem("Cuidados carregados do AsyncStorage.");
    } else {
      await AsyncStorage.setItem("@cuidados", JSON.stringify(cuidadosMock));
      setCuidados(cuidadosMock);
      setMensagem("Dados mockados salvos no AsyncStorage.");
    }
  }

  async function restaurarMocks() {
    await AsyncStorage.setItem("@cuidados", JSON.stringify(cuidadosMock));
    setCuidados(cuidadosMock);
    setMensagem("Dados mockados restaurados.");
  }

  async function marcarComoConcluido(id: number) {
    const novaLista = cuidados.map((cuidado) =>
      cuidado.id === id ? { ...cuidado, status: "CONCLUÍDO" } : cuidado
    );

    await AsyncStorage.setItem("@cuidados", JSON.stringify(novaLista));
    setCuidados(novaLista);
    setMensagem("Cuidado atualizado e salvo localmente.");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Jornada de Cuidados</Text>

      <Text style={styles.status}>Usuário logado</Text>

      <Text style={styles.description}>
        Acompanhe vacinas, retornos, exames e cuidados preventivos importantes.
      </Text>

      {mensagem !== "" && <Text style={styles.message}>{mensagem}</Text>}

      {cuidados.map((cuidado) => (
        <View style={styles.card} key={cuidado.id}>
          <Text style={styles.cardTitle}>{cuidado.titulo}</Text>
          <Text>{cuidado.descricao}</Text>
          <Text>Tipo: {cuidado.tipo}</Text>
          <Text>Data prevista: {cuidado.dataPrevista}</Text>
          <Text>Status: {cuidado.status}</Text>

          {cuidado.status !== "CONCLUÍDO" && (
            <View style={styles.buttonArea}>
              <Button
                title="Marcar como concluído"
                onPress={() => marcarComoConcluido(cuidado.id)}
              />
            </View>
          )}
        </View>
      ))}

      <View style={styles.buttonArea}>
        <Button title="Restaurar Dados Mockados" onPress={restaurarMocks} />
      </View>

      <View style={styles.buttonArea}>
        <Button
          title="Fazer Triagem de Risco"
          onPress={() => navigation.navigate("Triagem")}
        />
      </View>
    </ScrollView>
  );
};

export default CuidadosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  status: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2563eb",
  },
  token: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 16,
  },
  message: {
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 8,
  },
  buttonArea: {
    marginTop: 10,
    marginBottom: 10,
  },
});