import React from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Text from '../components/ThemedText';
import { useCadastroFormulario } from '../control/useCadastroFormulario';
import type { PublicStackParamList } from '../navigation/navigation';
import { useTema, type Cores } from '../Theme/themeContext';

type Props = NativeStackScreenProps<PublicStackParamList, 'Cadastro'>;

export default function RegisterScreen({ navigation }: Props) {
  const {
    nome, setNome, email, setEmail, username, setUsername,
    password, setPassword, erro, cadastrando, enviar,
  } = useCadastroFormulario();
  const { cores } = useTema();
  const styles = criarEstilos(cores);

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>Criar conta</Text>
      <Text style={styles.subtitulo}>O cadastro cria um usuário USER na API Java.</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor={cores.textoSecundario}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={cores.textoSecundario}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor={cores.textoSecundario}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={cores.textoSecundario}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {!!erro && <Text style={styles.erro}>{erro}</Text>}
      <TouchableOpacity style={styles.botao} onPress={() => { void enviar(); }} disabled={cadastrando}>
        <Text style={styles.botaoTexto}>{cadastrando ? 'Cadastrando...' : 'Cadastrar e entrar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>Voltar ao login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const criarEstilos = (cores: Cores) => StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: cores.fundo },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 6 },
  subtitulo: { color: cores.textoSecundario, marginBottom: 18 },
  input: {
    color: cores.texto,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 9,
    padding: 12,
    marginBottom: 10,
  },
  erro: { color: cores.perigo, fontWeight: 'bold', marginBottom: 10 },
  botao: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10 },
  botaoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  voltar: { color: cores.primaria, textAlign: 'center', fontWeight: 'bold', marginTop: 16 },
});
