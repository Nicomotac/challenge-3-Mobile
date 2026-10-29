import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/ThemedText';
import { useTriagemControl } from '../control/useTriagemControl';
import { useTema, type Cores } from '../Theme/themeContext';
import type { SintomasTriagem } from '../model/Triagem';

const campos = [
  ['vomito', 'Vômito'],
  ['diarreia', 'Diarreia'],
  ['apatia', 'Apatia'],
  ['dificuldadeRespirar', 'Dificuldade para respirar'],
] as const;

export default function TriagemScreen() {
  const { cores } = useTema();
  const styles = criarEstilos(cores);
  const {
    pets, petId, sintomas, resultado, pendente,
    selecionarPet, alterarSintoma, executarTriagem,
  } = useTriagemControl();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Triagem de Risco</Text>
      <Text style={styles.subtitulo}>
        Selecione um pet e informe os sinais observados. Esta avaliação acadêmica
        não substitui um médico-veterinário.
      </Text>
      {pets.isLoading && <ActivityIndicator color={cores.primaria} />}
      {pets.isError && <Text style={styles.erro}>Não foi possível consultar os pets.</Text>}
      <ScrollView horizontal style={styles.pets} showsHorizontalScrollIndicator={false}>
        {(pets.data ?? []).map((pet) => (
          <TouchableOpacity
            key={pet.id}
            style={[styles.chip, petId === pet.id && styles.chipSelecionado]}
            onPress={() => selecionarPet(pet.id)}
          >
            <Text style={petId === pet.id ? styles.chipTextoSelecionado : undefined}>
              {pet.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {campos.map(([chave, titulo]) => (
        <View style={styles.linha} key={chave}>
          <Text>{titulo}</Text>
          <Switch
            value={sintomas[chave]}
            onValueChange={(marcado) => alterarSintoma(chave, marcado)}
          />
        </View>
      ))}
      <TextInput
        style={styles.observacoes}
        placeholder="Observações"
        placeholderTextColor={cores.textoSecundario}
        multiline
        value={sintomas.observacoes}
        onChangeText={(valor) => alterarSintoma('observacoes', valor)}
      />
      <TouchableOpacity
        style={styles.botao}
        onPress={() => { void executarTriagem(); }}
        disabled={pendente}
      >
        <Text style={styles.botaoTexto}>
          {pendente ? 'Salvando triagem...' : 'Analisar triagem'}
        </Text>
      </TouchableOpacity>
      {resultado && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTitulo}>Nível: {resultado.nivel}</Text>
          <Text>{resultado.mensagem}</Text>
          <Text style={styles.hint}>Consulte o registro salvo em Histórico.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const criarEstilos = (cores: Cores) => StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 18, paddingBottom: 36 },
  titulo: { fontSize: 26, fontWeight: 'bold' },
  subtitulo: { color: cores.textoSecundario, marginVertical: 12 },
  pets: { maxHeight: 46, marginBottom: 12 },
  chip: {
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  chipSelecionado: { backgroundColor: '#2563eb' },
  chipTextoSelecionado: { color: '#fff', fontWeight: 'bold' },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  observacoes: {
    backgroundColor: cores.superficie,
    color: cores.texto,
    borderColor: cores.borda,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    marginVertical: 8,
  },
  botao: { backgroundColor: '#2563eb', padding: 14, borderRadius: 9 },
  botaoTexto: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  resultado: {
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginTop: 14,
  },
  resultadoTitulo: { fontWeight: 'bold', color: cores.primaria, marginBottom: 6 },
  hint: { color: cores.textoSecundario, marginTop: 10, fontSize: 12 },
  erro: { color: cores.perigo, marginBottom: 8 },
});
