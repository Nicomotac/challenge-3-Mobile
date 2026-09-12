import React, { useState } from "react";
import {Modal,View,Text,TextInput,StyleSheet,Pressable,KeyboardAvoidingView,} from "react-native";

type LoginModalProps = {
  visible: boolean;
  onLogin: (token: string) => void;
};

const LoginDetail: React.FC<LoginModalProps> = ({ visible, onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar() {
    if (email === "" || senha === "") {
      setErro("Preencha o email e a senha.");
      return;
    }

    if (email === "admin@clyvo.com" && senha === "123456") {
      const tokenFake = "TOKEN_FAKE_CLYVO_PETCARE";

      setErro("");
      onLogin(tokenFake);
      return;
    }

    setErro("Email ou senha inválidos.");
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.subtitle}>
            Acesse o Clyvo PetCare para acompanhar a jornada de saúde do pet.
          </Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="admin@clyvo.com"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          {erro !== "" && <Text style={styles.error}>{erro}</Text>}

          <Pressable style={styles.button} onPress={entrar}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>

          <Text style={styles.hint}>
            Login de teste: admin@clyvo.com / 123456
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default LoginDetail;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    justifyContent: "center",
    padding: 24,
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f8fafc",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 14,
  },
  error: {
    color: "#dc2626",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginTop: 4,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  hint: {
    marginTop: 16,
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
  },
});