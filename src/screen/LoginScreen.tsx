import React from 'react';
import {
  Image, KeyboardAvoidingView, Platform, StyleSheet,
  TextInput, TouchableOpacity, View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import cuteLogin from '../assets/cuteLogin.jpg';
import Text from '../components/ThemedText';
import { useLoginFormulario } from '../control/useLoginFormulario';
import type { PublicStackParamList } from '../navigation/navigation';
import { useTema, type Cores } from '../theme/ThemeContext';

type Props = NativeStackScreenProps<PublicStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const {
    username, setUsername, password, setPassword,
    erro, entrando, enviar,
  } = useLoginFormulario();
  const { cores } = useTema();
  const styles = criarEstilos(cores);

  return (
    <KeyboardAvoidingView
      style={styles.pagina}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Image source={cuteLogin} style={styles.imagem} />
        <Text style={styles.titulo}>Clyvo PetCare</Text>
        <Text style={styles.subtitulo}>Acesso ao acompanhamento veterinário contínuo.</Text>
        <Text style={styles.rotulo}>Usuário</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholder="Usuário"
          placeholderTextColor={cores.textoSecundario}
        />
        <Text style={styles.rotulo}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Senha"
          placeholderTextColor={cores.textoSecundario}
        />
        {!!erro && <Text style={styles.erro}>{erro}</Text>}
        <TouchableOpacity style={styles.botao} onPress={() => { void enviar(); }} disabled={entrando}>
          <Text style={styles.botaoTexto}>{entrando ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const criarEstilos = (cores: Cores) => StyleSheet.create({
  pagina: { flex: 1, backgroundColor: '#2563eb', justifyContent: 'center', padding: 22 },
  card: {
    backgroundColor: cores.superficie,
    borderRadius: 18,
    padding: 20,
    maxWidth: 440,
    width: '100%',
    alignSelf: 'center',
  },
  imagem: { width: '100%', height: 170, borderRadius: 12, marginBottom: 16 },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitulo: { color: cores.textoSecundario, marginTop: 6, marginBottom: 20, textAlign: 'center' },
  rotulo: { fontWeight: 'bold', marginBottom: 5 },
  input: {
    color: cores.texto,
    borderColor: cores.borda,
    borderWidth: 1,
    borderRadius: 9,
    padding: 12,
    marginBottom: 12,
  },
  erro: { color: cores.perigo, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  botao: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10 },
  botaoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  link: { color: cores.primaria, textAlign: 'center', fontWeight: 'bold', marginTop: 16 },
});
