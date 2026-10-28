import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/ThemedText';
import { useTutorFormulario } from '../control/useTutorFormulario';
import { mensagemErroApi } from '../services/api';
import { useTema, type Cores } from '../theme/ThemeContext';

export default function TutorScreen() {
  const { cores } = useTema();
  const styles = criarEstilos(cores);
  const {
    admin, tutores, form, setForm, editandoId, erro, pendente,
    limpar, editar, salvar, confirmarExclusao,
  } = useTutorFormulario();

  function campo(chave: keyof typeof form, titulo: string, tipo: 'default' | 'email-address' | 'phone-pad' = 'default') {
    return (
      <TextInput
        style={styles.input}
        placeholder={titulo}
        placeholderTextColor={cores.textoSecundario}
        keyboardType={tipo}
        autoCapitalize={tipo === 'email-address' ? 'none' : 'sentences'}
        value={form[chave]}
        onChangeText={(valor) => setForm((anterior) => ({ ...anterior, [chave]: valor }))}
      />
    );
  }

  const formulario = admin ? (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>{editandoId !== null ? 'Editar tutor' : 'Cadastrar tutor'}</Text>
      {campo('nome', 'Nome')}
      {campo('email', 'E-mail', 'email-address')}
      {campo('celular', 'Celular', 'phone-pad')}
      {campo('cpf', 'CPF (opcional)')}
      {campo('dataNascimento', 'Nascimento AAAA-MM-DD (opcional)')}
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
      data={tutores.data ?? []}
      keyExtractor={(item) => String(item.id)}
      refreshing={tutores.isFetching}
      onRefresh={() => { void tutores.refetch(); }}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulo}>Tutores</Text>
          {formulario}
          {tutores.isLoading && <ActivityIndicator color={cores.primaria} />}
          {tutores.isError && <Text style={styles.erro}>{mensagemErroApi(tutores.error)}</Text>}
        </View>
      }
      ListEmptyComponent={!tutores.isLoading && !tutores.isError ? (
        <Text style={styles.vazio}>Nenhum tutor cadastrado.</Text>
      ) : null}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text>{item.email}</Text>
          <Text>{item.celular}</Text>
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
