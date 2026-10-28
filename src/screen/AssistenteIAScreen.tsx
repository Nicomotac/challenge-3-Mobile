import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/ThemedText';
import { useAssistenteControl } from '../control/useAssistenteControl';
import { useTema, type Cores } from '../theme/ThemeContext';

export default function AssistenteIAScreen() {
  const { cores } = useTema();
  const styles = criarEstilos(cores);
  const {
    pets, historico, petId, selecionarPet, texto, setTexto, mensagens, erro, enviar,
  } = useAssistenteControl();

  return (
    <KeyboardAvoidingView
      style={styles.pagina}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.titulo}>Assistente de Cuidados</Text>
      <Text style={styles.subtitulo}>
        Consulte informações do pet cadastrado e seus registros de triagem.
      </Text>
      <ScrollView horizontal style={styles.pets} showsHorizontalScrollIndicator={false}>
        {(pets.data ?? []).map((pet) => (
          <TouchableOpacity
            key={pet.id}
            style={[styles.chip, petId === pet.id && styles.chipAtivo]}
            onPress={() => selecionarPet(pet.id)}
          >
            <Text style={petId === pet.id ? styles.chipTextoAtivo : undefined}>{pet.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {pets.isError && <Text style={styles.erro}>Falha ao carregar os pets da API.</Text>}
      {historico.isError && <Text style={styles.erro}>Falha ao consultar o histórico.</Text>}
      {!!erro && <Text style={styles.erro}>{erro}</Text>}
      <FlatList
        ListEmptyComponent={
          <Text style={styles.subtitulo}>
            Selecione um pet e pergunte sobre dados, vacinação, alimentação ou triagens.
          </Text>
        }
        style={styles.chat}
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.mensagem,
            item.autor === 'usuario' ? styles.mensagemUsuario : styles.mensagemAssistente,
          ]}>
            <Text style={item.autor === 'usuario' ? styles.textoUsuario : undefined}>
              {item.texto}
            </Text>
          </View>
        )}
      />
      <View style={styles.entrada}>
        <TextInput
          style={styles.input}
          value={texto}
          onChangeText={setTexto}
          placeholder="Ex.: quais cuidados com vacinas?"
          placeholderTextColor={cores.textoSecundario}
          onSubmitEditing={enviar}
        />
        <TouchableOpacity style={styles.enviar} onPress={enviar}>
          <Text style={styles.textoUsuario}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.rodape}>Não substitui atendimento veterinário.</Text>
    </KeyboardAvoidingView>
  );
}

const criarEstilos = (cores: Cores) => StyleSheet.create({
  pagina: { flex: 1, backgroundColor: cores.fundo, padding: 16 },
  titulo: { fontSize: 26, fontWeight: 'bold' },
  subtitulo: { color: cores.textoSecundario, marginVertical: 9 },
  pets: { maxHeight: 45, marginBottom: 10 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 18,
    marginRight: 7,
  },
  chipAtivo: { backgroundColor: '#2563eb' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
  chat: {
    flex: 1,
    backgroundColor: cores.superficie,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 10,
  },
  mensagem: { maxWidth: '84%', padding: 10, borderRadius: 11, marginBottom: 8 },
  mensagemUsuario: { alignSelf: 'flex-end', backgroundColor: '#2563eb' },
  mensagemAssistente: { alignSelf: 'flex-start', backgroundColor: cores.fundoSecundario },
  textoUsuario: { color: '#fff', fontWeight: 'bold' },
  entrada: { flexDirection: 'row', gap: 8, marginTop: 10 },
  input: {
    flex: 1,
    color: cores.texto,
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderWidth: 1,
    borderRadius: 9,
    padding: 10,
  },
  enviar: { backgroundColor: '#2563eb', paddingHorizontal: 16, justifyContent: 'center', borderRadius: 9 },
  rodape: { color: cores.textoSecundario, textAlign: 'center', fontSize: 11, marginTop: 7 },
  erro: { color: cores.perigo, marginBottom: 8 },
});
