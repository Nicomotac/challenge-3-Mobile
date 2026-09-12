import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useAtualizarTutor, useCriarTutor, useExcluirTutor, useTutores } from '../control/useTutorControl';
import { Tutor } from '../model/Tutor';
import { mensagemErroApi } from '../services/api';
import { primeiraMensagemYup, tutorSchema } from '../validation/schemas';

const vazio = { nome: '', cpf: '', dataNascimento: '', email: '', celular: '' };

export default function TutorScreen() {
  const { usuario } = useAuth();
  const admin = usuario?.role === 'ADMIN';
  const tutores = useTutores();
  const criar = useCriarTutor();
  const atualizar = useAtualizarTutor();
  const excluir = useExcluirTutor();
  const [form, setForm] = useState(vazio);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [erro, setErro] = useState('');

  function limpar() { setForm(vazio); setEditandoId(null); setErro(''); }
  function editar(item: Tutor) {
    setEditandoId(item.id);
    setForm({ nome: item.nome, cpf: item.cpf || '', dataNascimento: item.dataNascimento || '', email: item.email, celular: item.celular });
  }
  async function salvar() {
    setErro('');
    const payload = { nome: form.nome.trim(), cpf: form.cpf.trim() || null, dataNascimento: form.dataNascimento.trim() || null, email: form.email.trim(), celular: form.celular.trim() };
    try {
      await tutorSchema.validate(payload);
      if (editandoId) await atualizar.mutateAsync({ id: editandoId, dados: payload });
      else await criar.mutateAsync(payload);
      limpar();
    } catch (error) {
      if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') setErro(primeiraMensagemYup(error));
      else setErro(mensagemErroApi(error));
    }
  }
  function confirmarExcluir(id: number) {
    Alert.alert('Excluir tutor?', 'Pets vinculados devem ser excluídos antes.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => { try { await excluir.mutateAsync(id); } catch (error) { Alert.alert('Erro', mensagemErroApi(error)); } } },
    ]);
  }

  return (
    <View style={styles.container}>
      {admin && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>{editandoId ? 'Editar tutor' : 'Cadastrar tutor'}</Text>
          <TextInput style={styles.input} placeholder="Nome" value={form.nome} onChangeText={(v) => setForm({ ...form, nome: v })} />
          <TextInput style={styles.input} placeholder="E-mail" value={form.email} onChangeText={(v) => setForm({ ...form, email: v })} autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Celular" value={form.celular} onChangeText={(v) => setForm({ ...form, celular: v })} keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="CPF (opcional)" value={form.cpf} onChangeText={(v) => setForm({ ...form, cpf: v })} />
          <TextInput style={styles.input} placeholder="Nascimento AAAA-MM-DD (opcional)" value={form.dataNascimento} onChangeText={(v) => setForm({ ...form, dataNascimento: v })} />
          {!!erro && <Text style={styles.error}>{erro}</Text>}
          <TouchableOpacity style={styles.primary} onPress={salvar} disabled={criar.isPending || atualizar.isPending}><Text style={styles.primaryText}>{editandoId ? 'Salvar alteração' : 'Cadastrar'}</Text></TouchableOpacity>
          {editandoId && <TouchableOpacity style={styles.cancel} onPress={limpar}><Text>Cancelar edição</Text></TouchableOpacity>}
        </View>
      )}
      {tutores.isLoading && <ActivityIndicator color="#2563eb" />}
      {tutores.isError && <Text style={styles.error}>{mensagemErroApi(tutores.error)}</Text>}
      <FlatList data={tutores.data || []} keyExtractor={(item) => String(item.id)} refreshing={tutores.isFetching} onRefresh={tutores.refetch} ListEmptyComponent={!tutores.isLoading ? <Text style={styles.empty}>Nenhum tutor cadastrado.</Text> : null} renderItem={({ item }) => (
        <View style={styles.card}><Text style={styles.name}>{item.nome}</Text><Text>{item.email}</Text><Text>{item.celular}</Text>{admin && <View style={styles.row}><TouchableOpacity style={styles.secondary} onPress={() => editar(item)}><Text style={styles.secondaryText}>Editar</Text></TouchableOpacity><TouchableOpacity style={styles.danger} onPress={() => confirmarExcluir(item.id)}><Text style={styles.dangerText}>Excluir</Text></TouchableOpacity></View>}</View>
      )} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' }, form: { backgroundColor: '#fff', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 12 }, formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#1e293b' }, input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10, marginBottom: 8 }, primary: { backgroundColor: '#2563eb', padding: 12, borderRadius: 8 }, primaryText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }, cancel: { padding: 10, alignItems: 'center', marginTop: 7 }, error: { color: '#dc2626', marginBottom: 8, fontWeight: 'bold' }, card: { backgroundColor: '#fff', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 10 }, name: { fontSize: 17, fontWeight: 'bold', color: '#1e293b' }, row: { flexDirection: 'row', gap: 8, marginTop: 10 }, secondary: { flex: 1, borderWidth: 1, borderColor: '#2563eb', padding: 10, borderRadius: 8, alignItems: 'center' }, secondaryText: { color: '#2563eb', fontWeight: 'bold' }, danger: { flex: 1, backgroundColor: '#dc2626', padding: 10, borderRadius: 8, alignItems: 'center' }, dangerText: { color: '#fff', fontWeight: 'bold' }, empty: { textAlign: 'center', color: '#64748b', marginTop: 20 } });
