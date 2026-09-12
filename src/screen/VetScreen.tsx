import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { RootDrawerParamList } from "../navigation/navigation";

type Props = DrawerScreenProps<RootDrawerParamList, "Vet"> & {
  token: string;
};

const VetScreen: React.FC<Props> = ({ navigation, token }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Veterinário</Text>

      <Text style={styles.status}>Usuário logado</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Clínica Parceira</Text>
        <Text>Clyvo Vet Digital</Text>
        <Text>Atendimento preventivo e acompanhamento contínuo.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Veterinária Responsável</Text>
        <Text>Nome: Dra. Mariana Lopes</Text>
        <Text>Especialidade: Clínica geral veterinária</Text>
        <Text>CRMV: 12345-SP</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Objetivo</Text>
        <Text>
          Ajudar tutores a acompanharem vacinas, sintomas, retornos,
          tratamentos e cuidados importantes do pet.
        </Text>
      </View>

      <View style={styles.buttonArea}>
        <Button
          title="Ver Jornada de Cuidados"
          onPress={() => navigation.navigate("Cuidados")}
        />
      </View>
    </ScrollView>
  );
};

export default VetScreen;

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
  buttonArea: {
    marginTop: 8,
    marginBottom: 12,
  },
});