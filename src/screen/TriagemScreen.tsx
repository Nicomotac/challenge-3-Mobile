import React, { useState } from "react";
import { View,Text,StyleSheet,Button,ScrollView,Switch,TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { RootDrawerParamList } from "../navigation/navigation";

type Props = DrawerScreenProps<RootDrawerParamList, "Triagem"> & {
  token: string;
};

type TriagemLocal = {
  apetiteReduzido: boolean;
  vomito: boolean;
  diarreia: boolean;
  apatia: boolean;
  dificuldadeRespirar: boolean;
  observacoes: string;
};

type ResultadoTriagem = {
  nivel: string;
  mensagem: string;
  observacoes: string;
  data: string;
};

const TriagemScreen: React.FC<Props> = ({ navigation, token }) => {
  const [triagem, setTriagem] = useState<TriagemLocal>({
    apetiteReduzido: false,
    vomito: false,
    diarreia: false,
    apatia: false,
    dificuldadeRespirar: false,
    observacoes: "",
  });

  const [resultado, setResultado] = useState<ResultadoTriagem | null>(null);
  const [mensagemTela, setMensagemTela] = useState("");

  function atualizarCampo(campo: keyof TriagemLocal, valor: boolean | string) {
    setTriagem({
      ...triagem,
      [campo]: valor,
    });
  }

  async function analisarTriagem() {
    let nivel = "BAIXO";
    let mensagem = "Sintomas leves. Continue observando o pet.";

    if (triagem.dificuldadeRespirar) {
      nivel = "EMERGÊNCIA";
      mensagem = "Procure atendimento veterinário imediatamente.";
    } else if (
      (triagem.vomito && triagem.apatia) ||
      (triagem.diarreia && triagem.apetiteReduzido)
    ) {
      nivel = "ALTO";
      mensagem = "Recomenda-se contato com a clínica ainda hoje.";
    } else if (triagem.vomito || triagem.diarreia || triagem.apatia) {
      nivel = "MÉDIO";
      mensagem = "Observe o pet e agende atendimento se os sintomas persistirem.";
    }

    const resultadoFinal: ResultadoTriagem = {
      nivel,
      mensagem,
      observacoes: triagem.observacoes,
      data: new Date().toLocaleString(),
    };

    setResultado(resultadoFinal);

    await AsyncStorage.setItem(
      "@ultimaTriagem",
      JSON.stringify(resultadoFinal)
    );

    setMensagemTela("Triagem salva localmente com sucesso.");
  }

  function limparTriagem() {
    setTriagem({
      apetiteReduzido: false,
      vomito: false,
      diarreia: false,
      apatia: false,
      dificuldadeRespirar: false,
      observacoes: "",
    });

    setResultado(null);
    setMensagemTela("");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Triagem de Risco</Text>

      <Text style={styles.status}>Usuário logado</Text>
      <Text style={styles.description}>
        Informe os sintomas percebidos. Esta triagem não substitui atendimento
        veterinário.
      </Text>

      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Text>Apetite reduzido</Text>
          <Switch
            value={triagem.apetiteReduzido}
            onValueChange={(valor) => atualizarCampo("apetiteReduzido", valor)}
          />
        </View>

        <View style={styles.switchRow}>
          <Text>Vômito</Text>
          <Switch
            value={triagem.vomito}
            onValueChange={(valor) => atualizarCampo("vomito", valor)}
          />
        </View>

        <View style={styles.switchRow}>
          <Text>Diarreia</Text>
          <Switch
            value={triagem.diarreia}
            onValueChange={(valor) => atualizarCampo("diarreia", valor)}
          />
        </View>

        <View style={styles.switchRow}>
          <Text>Apatia</Text>
          <Switch
            value={triagem.apatia}
            onValueChange={(valor) => atualizarCampo("apatia", valor)}
          />
        </View>

        <View style={styles.switchRow}>
          <Text>Dificuldade para respirar</Text>
          <Switch
            value={triagem.dificuldadeRespirar}
            onValueChange={(valor) =>
              atualizarCampo("dificuldadeRespirar", valor)
            }
          />
        </View>
      </View>

      <Text>Observações</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva outros sintomas..."
        multiline
        value={triagem.observacoes}
        onChangeText={(texto) => atualizarCampo("observacoes", texto)}
      />

      <View style={styles.buttonArea}>
        <Button title="Analisar Triagem" onPress={analisarTriagem} />
      </View>

      <View style={styles.buttonArea}>
        <Button title="Limpar Triagem" onPress={limparTriagem} />
      </View>

      {resultado && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resultado da Triagem</Text>
          <Text>Nível de risco: {resultado.nivel}</Text>
          <Text>Orientação: {resultado.mensagem}</Text>
          <Text>
            Observações:{" "}
            {resultado.observacoes ? resultado.observacoes : "Sem observações"}
          </Text>
          <Text>Data: {resultado.data}</Text>
        </View>
      )}

      {mensagemTela !== "" && <Text style={styles.success}>{mensagemTela}</Text>}

      <View style={styles.buttonArea}>
        <Button
          title="Ver Histórico"
          onPress={() => navigation.navigate("Historico")}
        />
      </View>
    </ScrollView>
  );
};

export default TriagemScreen;

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
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 12,
    borderRadius: 8,
    minHeight: 90,
    marginTop: 6,
    marginBottom: 14,
  },
  buttonArea: {
    marginBottom: 12,
  },
  success: {
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
});