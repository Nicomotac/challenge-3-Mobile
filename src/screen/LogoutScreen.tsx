import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { RootDrawerParamList } from "../navigation/navigation";

type Props = DrawerScreenProps<RootDrawerParamList, "LogOut"> & {onLogout: () => void | Promise<void>;};

const LogOutScreen: React.FC<Props> = ({ onLogout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sair da conta</Text>

      <Text style={styles.text}>
        Clique no botão abaixo para encerrar a sessão e voltar para a tela de login.
      </Text>

      <View style={styles.botao}>
        <Button title="Sair da conta" color="red" onPress={onLogout} />
      </View>
    </View>
  );
};

export default LogOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 24,
  },
  botao: {
    marginTop: 12,
  },
});