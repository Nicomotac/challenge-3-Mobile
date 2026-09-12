import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { RootDrawerParamList } from "../navigation/navigation";

type Props = DrawerScreenProps<RootDrawerParamList, "Home"> & {
  token: string;
};

const HomeScreen: React.FC<Props> = ({ token }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Clyvo PetCare</Text>

      <Text style={styles.subtitulo}>
        Cuidado contínuo, preventivo e inteligente para a saúde do seu pet.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bem-vindo!</Text>
        <Text style={styles.text}>
          Use o menu lateral para acessar o cadastro do pet, veterinário,
          cuidados, triagem de risco e histórico.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Objetivo do App</Text>
        <Text style={styles.text}>
          Ajudar tutores a manterem a continuidade do cuidado do pet, evitando
          esquecimentos de vacinas, retornos, exames e sinais de risco.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Status</Text>
        <Text style={styles.text}>Usuário logado</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 24,
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
  text: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  token: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 8,
  },
});