import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { RootDrawerParamList } from "../navigation/navigation";

type Props = DrawerScreenProps<RootDrawerParamList, "Historico"> & {
  token: string;
};

const HistoricoScreen: React.FC<Props> = ({ navigation, token }) => {
  const [pet, setPet] = useState<any>(null);
  const [ultimaTriagem, setUltimaTriagem] = useState<any>(null);
  const [cuidados, setCuidados] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarHistoricoLocal();
  }, []);

  async function carregarHistoricoLocal() {
    const petSalvo = await AsyncStorage.getItem("@pet");
    const triagemSalva = await AsyncStorage.getItem("@ultimaTriagem");
    const cuidadosSalvos = await AsyncStorage.getItem("@cuidados");

    setPet(petSalvo ? JSON.parse(petSalvo) : null);
    setUltimaTriagem(triagemSalva ? JSON.parse(triagemSalva) : null);
    setCuidados(cuidadosSalvos ? JSON.parse(cuidadosSalvos) : []);

    if (!petSalvo && !triagemSalva && !cuidadosSalvos) {
      setMensagem("Nenhum dado salvo localmente ainda.");
    } else {
      setMensagem("Histórico carregado do AsyncStorage.");
    }
  }

  async function limparHistorico() {
    await AsyncStorage.removeItem("@pet");
    await AsyncStorage.removeItem("@petId");
    await AsyncStorage.removeItem("@ultimaTriagem");
    await AsyncStorage.removeItem("@cuidados");

    setPet(null);
    setUltimaTriagem(null);
    setCuidados([]);
    setMensagem("Histórico local apagado.");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Histórico do Pet</Text>

      <Text style={styles.status}>Usuário logado</Text>

      {mensagem !== "" && <Text style={styles.message}>{mensagem}</Text>}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dados do Pet</Text>

        {pet ? (
          <>
            <Text>Nome: {pet.nome}</Text>
            <Text>Espécie: {pet.especie}</Text>
            <Text>Raça: {pet.raca}</Text>
            <Text>Idade: {pet.idade}</Text>
            <Text>Peso: {pet.peso}</Text>
            <Text>Tutor ID: {pet.tutorId}</Text>
          </>
        ) : (
          <Text>Nenhum pet salvo localmente.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Última Triagem</Text>

        {ultimaTriagem ? (
          <>
            <Text>Nível: {ultimaTriagem.nivel}</Text>
            <Text>Mensagem: {ultimaTriagem.mensagem}</Text>
            <Text>
              Observações:{" "}
              {ultimaTriagem.observacoes
                ? ultimaTriagem.observacoes
                : "Sem observações"}
            </Text>
            <Text>Data: {ultimaTriagem.data}</Text>
          </>
        ) : (
          <Text>Nenhuma triagem salva ainda.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cuidados Salvos</Text>

        {cuidados.length > 0 ? (
          cuidados.map((cuidado) => (
            <View key={cuidado.id} style={styles.item}>
              <Text>{cuidado.titulo}</Text>
              <Text>Status: {cuidado.status}</Text>
            </View>
          ))
        ) : (
          <Text>Nenhum cuidado salvo ainda.</Text>
        )}
      </View>

      <View style={styles.buttonArea}>
        <Button title="Atualizar Histórico" onPress={carregarHistoricoLocal} />
      </View>

      <View style={styles.buttonArea}>
        <Button
          title="Cadastrar/Editar Pet"
          onPress={() => navigation.navigate("CadastroPet")}
        />
      </View>

      <View style={styles.buttonArea}>
        <Button
          title="Limpar Histórico Local"
          color="red"
          onPress={limparHistorico}
        />
      </View>
    </ScrollView>
  );
};

export default HistoricoScreen;

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
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 8,
  },
  item: {
    marginBottom: 10,
  },
  buttonArea: {
    marginBottom: 12,
  },
});