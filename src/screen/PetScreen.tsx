import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useAtualizarPet, useCriarPet, useExcluirPet, usePets } from '../control/usePetControl';
import { useTutores } from '../control/useTutorControl';
import { Pet } from '../model/Pet';
import { mensagemErroApi } from '../services/api';
import { petSchema, primeiraMensagemYup } from '../validation/schemas';

const vazio = { nome: '', idade: '', especie: '', raca: '', sexo: '', dataNascimento: '', peso: '', responsavelId: 0 };

export default function PetScreen() {
  const { usuario } = useAuth();
  const admin = usuario?.role === 'ADMIN';
  const pets = usePets();
  const tutores = useTutores();
  const criar = useCriarPet();
  const atualizar = useAtualizarPet();
  const excluir = useExcluirPet();
  const [form, setForm] = useState(vazio);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [erro, setErro] = useState('');

  function limpar() { setForm(vazio); setEditandoId(null); setErro(''); }
  function editar(pet: Pet) {
    setEditandoId(pet.id);
    setForm({ nome: pet.nome, idade: pet.idade?.toString() || '', especie: pet.especie, raca: pet.raca || '', sexo: pet.sexo, dataNascimento: pet.dataNascimento || '', peso: pet.peso?.toString() || '', responsavelId: pet.responsavelId });
  }
  async function salvar() {
    setErro('');
    const payload = { nome: form.nome.trim(), idade: form.idade ? Number(form.idade) : null, especie: form.especie.trim(), raca: form.raca.trim() || null, sexo: form.sexo.trim(), dataNascimento: form.dataNascimento.trim() || null, peso: form.peso ? Number(form.peso.replace(',', '.')) : null, responsavelId: form.responsavelId };
    try {
      await petSchema.validate(payload);
      if (editandoId) await atualizar.mutateAsync({ id: editandoId, dados: payload }); else await criar.mutateAsync(payload);
      limpar();
    } catch (error) {
      if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') setErro(primeiraMensagemYup(error)); else setErro(mensagemErroApi(error));
    }
  }
  function confirmarExcluir(id: number) { Alert.alert('Excluir pet?', 'Esta ação removerá o cadastro.', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: async () => { try { await excluir.mutateAsync(id); } catch (error) { Alert.alert('Erro', mensagemErroApi(error)); } } }]); }

  return (
    <View style={styles.container}>
      {admin && <View style={styles.form}>
        <Text style={styles.formTitle}>{editandoId ? 'Editar pet' : 'Cadastrar pet'}</Text>
        <TextInput style={styles.input} placeholder="Nome" value={form.nome} onChangeText={(v) => setForm({ ...form, nome: v })} />
        <TextInput style={styles.input} placeholder="Espécie" value={form.especie} onChangeText={(v) => setForm({ ...form, especie: v })} />
        <TextInput style={styles.input} placeholder="Raça (opcional)" value={form.raca} onChangeText={(v) => setForm({ ...form, raca: v })} />
        <TextInput style={styles.input} placeholder="Sexo" value={form.sexo} onChangeText={(v) => setForm({ ...form, sexo: v })} />
        <TextInput style={styles.input} placeholder="Idade" value={form.idade} onChangeText={(v) => setForm({ ...form, idade: v })} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Peso" value={form.peso} onChangeText={(v) => setForm({ ...form, peso: v })} keyboardType="decimal-pad" />
        <TextInput style={styles.input} placeholder="Nascimento AAAA-MM-DD (opcional)" value={form.dataNascimento} onChangeText={(v) => setForm({ ...form, dataNascimento: v })} />
        <Text style={styles.label}>Tutor responsável</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tutores}>{(tutores.data || []).map((t) => <TouchableOpacity key={t.id} style={[styles.tutor, form.responsavelId === t.id && styles.tutorSelected]} onPress={() => setForm({ ...form, responsavelId: t.id })}><Text style={form.responsavelId === t.id ? styles.tutorTextSelected : styles.tutorText}>{t.nome}</Text></TouchableOpacity>)}</ScrollView>
        {!!erro && <Text style={styles.error}>{erro}</Text>}
        <TouchableOpacity style={styles.primary} onPress={salvar}><Text style={styles.primaryText}>{editandoId ? 'Salvar alteração' : 'Cadastrar'}</Text></TouchableOpacity>
        {editandoId && <TouchableOpacity style={styles.cancel} onPress={limpar}><Text>Cancelar edição</Text></TouchableOpacity>}
      </View>}
      {(pets.isLoading || tutores.isLoading) && <ActivityIndicator color="#2563eb" />}
      {pets.isError && <Text style={styles.error}>{mensagemErroApi(pets.error)}</Text>}
      <FlatList data={pets.data || []} keyExtractor={(item) => String(item.id)} refreshing={pets.isFetching} onRefresh={pets.refetch} ListEmptyComponent={!pets.isLoading ? <Text style={styles.empty}>Nenhum pet cadastrado.</Text> : null} renderItem={({ item }) => <View style={styles.card}><Text style={styles.name}>{item.nome}</Text><Text>{item.especie} • {item.sexo}</Text><Text>Raça: {item.raca || '-'}</Text><Text>Tutor: {item.responsavelNome}</Text>{admin && <View style={styles.row}><TouchableOpacity style={styles.secondary} onPress={() => editar(item)}><Text style={styles.secondaryText}>Editar</Text></TouchableOpacity><TouchableOpacity style={styles.danger} onPress={() => confirmarExcluir(item.id)}><Text style={styles.dangerText}>Excluir</Text></TouchableOpacity></View>}</View>} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' }, form: { backgroundColor: '#fff', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 12 }, formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#1e293b' }, input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10, marginBottom: 8 }, label: { fontWeight: 'bold', color: '#334155', marginBottom: 6 }, tutores: { maxHeight: 45, marginBottom: 10 }, tutor: { borderWidth: 1, borderColor: '#cbd5e1', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18, marginRight: 7 }, tutorSelected: { backgroundColor: '#2563eb', borderColor: '#2563eb' }, tutorText: { color: '#334155' }, tutorTextSelected: { color: '#fff', fontWeight: 'bold' }, primary: { backgroundColor: '#2563eb', padding: 12, borderRadius: 8 }, primaryText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }, cancel: { padding: 10, alignItems: 'center', marginTop: 7 }, error: { color: '#dc2626', marginBottom: 8, fontWeight: 'bold' }, card: { backgroundColor: '#fff', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 10 }, name: { fontSize: 17, fontWeight: 'bold', color: '#1e293b' }, row: { flexDirection: 'row', gap: 8, marginTop: 10 }, secondary: { flex: 1, borderWidth: 1, borderColor: '#2563eb', padding: 10, borderRadius: 8, alignItems: 'center' }, secondaryText: { color: '#2563eb', fontWeight: 'bold' }, danger: { flex: 1, backgroundColor: '#dc2626', padding: 10, borderRadius: 8, alignItems: 'center' }, dangerText: { color: '#fff', fontWeight: 'bold' }, empty: { textAlign: 'center', color: '#64748b', marginTop: 20 } });
