import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Image } from "react-native";
import cuteLogin from "../../assets/cuteLogin.jpg";


type LoginScreenProps = {
  onLogin: (token: string) => void | Promise<void>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function entrar() {
    if (email === "" || senha === "") {
      setErro("Preencha o email e a senha.");
      return;
    }

    if (email === "admin@clyvo.com" && senha === "123456") {
      const tokenFake = "TOKEN_FAKE_CLYVO_PETCARE";
      setErro("");
      await onLogin(tokenFake);
      return;
    }

    setErro("Email ou senha inválidos.");
  }

  return (

    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={cuteLogin} style={styles.logo} />
        <Text style={styles.title}>Clyvo PetCare</Text>

        <Text style={styles.subtitle}>
          Entre para acompanhar a jornada de saúde do seu pet.
        </Text>

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {erro !== "" && <Text style={styles.error}>{erro}</Text>}

        <Button title="Entrar" onPress={entrar} />

        <Text style={styles.AcessoLogin}>
          Login de teste: admin@clyvo.com / senha: 123456
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: "cover",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#475569",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 14,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "bold",
  },
  AcessoLogin: {
    marginTop: 16,
    textAlign: "center",
    color: "#64748b",
  },
});