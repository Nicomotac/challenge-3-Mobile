import React, { useEffect } from "react";
import {View,Text,TextInput,StyleSheet,Button,ScrollView,} from "react-native";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { RootDrawerParamList } from "../navigation/navigation";
import usePetControl from "../control/usePetControl";

type Props = DrawerScreenProps<RootDrawerParamList, "CadastroPet"> & {
  token: string;
};

const CadastroPetScreen: React.FC<Props> = ({ token }) => {
  const {
    
    pet,
    mensagem,
    erro,
    atualizarCampo,
    salvarLocalmente,
    carregarPetLocal,
    limparFormulario,
    apagarPetLocal,

  } = usePetControl();

  useEffect(() => {
    carregarPetLocal();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastro do Pet</Text>

      <Text style={styles.status}>Usuário logado</Text>

      <Text>Nome do pet</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Thor"
        value={pet.nome}
        onChangeText={(texto) => atualizarCampo("nome", texto)}
      />

      <Text>Espécie</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Cachorro"
        value={pet.especie}
        onChangeText={(texto) => atualizarCampo("especie", texto)}
      />

      <Text>Raça</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Golden Retriever"
        value={pet.raca}
        onChangeText={(texto) => atualizarCampo("raca", texto)}
      />

      <Text>Idade</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 5 anos"
        value={pet.idade ? String(pet.idade) : ""}
        onChangeText={(texto) => atualizarCampo("idade", texto)}
      />

      <Text>Peso</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 28.5"
        value={pet.peso ? String(pet.peso) : ""}
        onChangeText={(texto) => atualizarCampo("peso", texto)}
      />

      <View style={styles.preview}>
        <Text style={styles.previewTitle}>Prévia dos dados</Text>
        <Text>Nome: {pet.nome}</Text>
        <Text>Espécie: {pet.especie}</Text>
        <Text>Raça: {pet.raca}</Text>
        <Text>Idade: {pet.idade}</Text>
        <Text>Peso: {pet.peso}</Text>
      </View>

      <View style={styles.buttonArea}>
        <Button title="Salvar Localmente" onPress={salvarLocalmente} />
      </View>

      <View style={styles.buttonArea}>
        <Button title="Carregar Pet Local" onPress={carregarPetLocal} />
      </View>

      <View style={styles.buttonArea}>
        <Button title="Limpar Formulário" onPress={limparFormulario} />
      </View>

      <View style={styles.buttonArea}>
        <Button title="Apagar Pet Local" color="red" onPress={apagarPetLocal} />
      </View>

      {mensagem !== "" && <Text style={styles.success}>{mensagem}</Text>}
      {erro !== "" && <Text style={styles.error}>{erro}</Text>}
    </ScrollView>
  );
};

export default CadastroPetScreen;

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
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 14,
  },
  preview: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginTop: 8,
    marginBottom: 18,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
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
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
});