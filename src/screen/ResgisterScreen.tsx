import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import type { PublicStackParamList } from '../navigation/navigation';
import { mensagemErroApi } from '../services/api';
import { cadastroSchema, primeiraMensagemYup } from '../validation/schemas';

type Props = NativeStackScreenProps<PublicStackParamList, 'Cadastro'>;

export default function RegisterScreen({ navigation }: Props) {
  const { cadastrar, cadastrando } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  async function salvar() {
    setErro('');
    const dados = { nome: nome.trim(), email: email.trim(), username: username.trim(), password };
    try {
      await cadastroSchema.validate(dados);
      await cadastrar(dados);
    } catch (error) {
      if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') setErro(primeiraMensagemYup(error));
      else setErro(mensagemErroApi(error));
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>O cadastro cria um usuário USER na API Java.</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Usuário" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      {!!erro && <Text style={styles.error}>{erro}</Text>}
      <TouchableOpacity style={styles.button} onPress={salvar} disabled={cadastrando}><Text style={styles.buttonText}>{cadastrando ? 'Cadastrando...' : 'Cadastrar e entrar'}</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.link}>Voltar ao login</Text></TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({ container: { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f8fafc' }, title: { fontSize: 28, fontWeight: 'bold', color: '#1e293b', marginBottom: 6 }, subtitle: { color: '#64748b', marginBottom: 18 }, input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 9, padding: 12, marginBottom: 10 }, error: { color: '#dc2626', fontWeight: 'bold', marginBottom: 10 }, button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10 }, buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }, link: { color: '#2563eb', textAlign: 'center', fontWeight: 'bold', marginTop: 16 } });
