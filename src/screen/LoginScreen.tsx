import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import cuteLogin from '../assets/cuteLogin.jpg';
import { useAuth } from '../context/AuthContext';
import type { PublicStackParamList } from '../navigation/navigation';
import { mensagemErroApi } from '../services/api';
import { loginSchema, primeiraMensagemYup } from '../validation/schemas';

type Props = NativeStackScreenProps<PublicStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { entrar, entrando } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  async function realizarLogin() {
    setErro('');
    try {
      await loginSchema.validate({ username, password });
      await entrar({ username: username.trim(), password });
    } catch (error) {
      if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
        setErro(primeiraMensagemYup(error));
      } else {
        setErro(mensagemErroApi(error));
      }
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.card}>
        <Image source={cuteLogin} style={styles.logo} />
        <Text style={styles.title}>Clyvo PetCare</Text>
        <Text style={styles.subtitle}>Acesso ao acompanhamento veterinário contínuo.</Text>

        <Text style={styles.label}>Usuário</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" placeholder="admin ou user" />
        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="senha" />

        {!!erro && <Text style={styles.error}>{erro}</Text>}

        <TouchableOpacity style={styles.button} onPress={realizarLogin} disabled={entrando}>
          <Text style={styles.buttonText}>{entrando ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>Demonstração: admin / 123 ou user / 123</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2563eb', justifyContent: 'center', padding: 22 },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 20, maxWidth: 440, width: '100%', alignSelf: 'center' },
  logo: { width: '100%', height: 170, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#1e293b' },
  subtitle: { textAlign: 'center', color: '#64748b', marginTop: 6, marginBottom: 20 },
  label: { fontWeight: 'bold', color: '#334155', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 9, padding: 12, marginBottom: 12 },
  error: { color: '#dc2626', fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#2563eb', textAlign: 'center', fontWeight: 'bold', marginTop: 16 },
  hint: { color: '#64748b', textAlign: 'center', fontSize: 12, marginTop: 14 },
});
