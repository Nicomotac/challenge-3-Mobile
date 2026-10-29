import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/ThemedText';
import { usePetFormulario } from '../control/usePetFormulario';
import { mensagemErroApi } from '../services/api';
import { useTema, type Cores } from '../Theme/themeContext';

type ChaveTexto = 'nome' | 'idade' | 'especie' | 'raca' | 'sexo' | 'dataNascimento' | 'peso';

export default function PetScreen() {
  const { cores } = useTema();
  const styles = criarEstilos(cores);
  const {
    admin, pets, tutores, form, setForm, editandoId,
    erro, pendente, limpar, editar, salvar, confirmarExclusao,
  } = usePetFormulario();

  function campo(chave: ChaveTexto, placeholder: string, numeric = false) {
    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={cores.textoSecundario}
        value={form[chave]}
        keyboardType={numeric ? 'decimal-pad' : 'default'}
        onChangeText={(valor) => setForm((atual) => ({ ...atual, [chave]: valor }))}
      />
    );
  }

  const formulario = admin ? (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>{editandoId !== null ? 'Editar pet' : 'Cadastrar pet'}</Text>
      {campo('nome', 'Nome')}
      {campo('especie', 'Espécie')}
      {campo('raca', 'Raça (opcional)')}
      {campo('sexo', 'Sexo')}
      {campo('idade', 'Idade', true)}
      {campo('peso', 'Peso', true)}
      {campo('dataNascimento', 'Nascimento AAAA-MM-DD (opcional)')}
      <Text style={styles.rotulo}>Tutor responsável</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tutores}>
        {(tutores.data ?? []).map((tutor) => (
          <TouchableOpacity
            key={tutor.id}
            style={[styles.chip, form.responsavelId === tutor.id && styles.chipAtivo]}
            onPress={() => setForm((atual) => ({ ...atual, responsavelId: tutor.id }))}
          >
            <Text style={form.responsavelId === tutor.id ? styles.chipTextoAtivo : undefined}>
              {tutor.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {tutores.isError && <Text style={styles.erro}>Não foi possível carregar os tutores.</Text>}
      {!!erro && <Text style={styles.erro}>{erro}</Text>}
      <TouchableOpacity style={styles.primario} onPress={salvar} disabled={pendente}>
        <Text style={styles.botaoTexto}>
          {pendente ? 'Salvando...' : editandoId !== null ? 'Salvar alteração' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>
      {editandoId !== null && (
        <TouchableOpacity style={styles.botaoSecundario} onPress={limpar}>
          <Text>Cancelar edição</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : null;

  return (
    <FlatList
      style={styles.pagina}
      contentContainerStyle={styles.conteudo}
      data={pets.data ?? []}
      keyExtractor={(item) => String(item.id)}
      refreshing={pets.isFetching}
      onRefresh={() => { void pets.refetch(); void tutores.refetch(); }}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulo}>Pets</Text>
          {formulario}
          {(pets.isLoading || tutores.isLoading) && <ActivityIndicator color={cores.primaria} />}
          {pets.isError && <Text style={styles.erro}>{mensagemErroApi(pets.error)}</Text>}
        </View>
      }
      ListEmptyComponent={!pets.isLoading && !pets.isError ? <Text style={styles.vazio}>Nenhum pet cadastrado.</Text> : null}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text>{item.especie} • {item.sexo}</Text>
          <Text>Raça: {item.raca || 'Não informada'}</Text>
          <Text>Tutor: {item.responsavelNome}</Text>
          {admin && (
            <View style={styles.acoes}>
              <TouchableOpacity style={styles.bordaBotao} disabled={pendente} onPress={() => editar(item)}>
                <Text style={styles.editar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.perigo} disabled={pendente} onPress={() => confirmarExclusao(item.id)}>
                <Text style={styles.botaoTexto}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    />
  );
}

const criarEstilos = (cores: Cores) => StyleSheet.create({
  pagina: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16, paddingBottom: 36 },
  titulo: { fontSize: 26, fontWeight: 'bold', marginBottom: 14 },
  subtitulo: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  card: {
    padding: 14,
    marginBottom: 12,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
  },
  input: {
    color: cores.texto,
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  rotulo: { marginBottom: 8, fontWeight: 'bold' },
  tutores: { maxHeight: 44, marginBottom: 12 },
  chip: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  chipAtivo: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
  primario: { backgroundColor: '#2563eb', padding: 13, borderRadius: 8 },
  botaoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  botaoSecundario: { padding: 12, alignItems: 'center' },
  erro: { color: cores.perigo, marginBottom: 9 },
  nome: { fontWeight: 'bold', fontSize: 18, marginBottom: 5 },
  acoes: { flexDirection: 'row', gap: 10, marginTop: 10 },
  bordaBotao: { flex: 1, borderWidth: 1, borderColor: cores.primaria, padding: 10, borderRadius: 8 },
  editar: { textAlign: 'center', color: cores.primaria, fontWeight: 'bold' },
  perigo: { flex: 1, backgroundColor: '#dc2626', padding: 10, borderRadius: 8 },
  vazio: { textAlign: 'center', color: cores.textoSecundario, marginTop: 15 },
});
