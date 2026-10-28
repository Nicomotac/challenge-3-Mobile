import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import Text from '../components/ThemedText';
import { useAuth } from '../context/AuthContext';
import { useTema, type Cores } from '../theme/ThemeContext';
import type { RootDrawerParamList } from '../navigation/navigation';

const acoes: Array<{ rota: keyof RootDrawerParamList; titulo: string; descricao: string }> = [
  { rota: 'Tutores', titulo: 'Tutores', descricao: 'Consulte os responsáveis cadastrados.' },
  { rota: 'Pets', titulo: 'Pets', descricao: 'Visualize e gerencie os animais.' },
  { rota: 'Triagem', titulo: 'Triagem de risco', descricao: 'Registre sintomas e consulte a avaliação.' },
  { rota: 'Historico', titulo: 'Histórico', descricao: 'Acompanhe os resultados registrados.' },
];

export default function HomeScreen() {
  const { usuario } = useAuth();
  const { cores } = useTema();
  const styles = criarEstilos(cores);
  const navegacao = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <ScrollView style={styles.pagina} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Clyvo PetCare</Text>
      <Text style={styles.subtitulo}>Cuidado contínuo para pets.</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Olá, {usuario?.nome ?? 'usuário'}!</Text>
        <Text>Perfil de acesso: {usuario?.role === 'ADMIN' ? 'Administrador' : 'Consulta'}</Text>
      </View>
      <Text style={styles.secao}>Acesso rápido</Text>
      {acoes.map((acao) => (
        <TouchableOpacity
          key={acao.rota}
          style={styles.card}
          onPress={() => navegacao.navigate(acao.rota)}
          accessibilityRole="button"
          accessibilityLabel={`Abrir ${acao.titulo}`}
        >
          <Text style={styles.cardTitulo}>{acao.titulo}</Text>
          <Text>{acao.descricao}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const criarEstilos = (cores: Cores) => StyleSheet.create({
  pagina: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 20, paddingBottom: 36 },
  titulo: { fontWeight: 'bold', fontSize: 30 },
  subtitulo: { color: cores.textoSecundario, marginTop: 5, marginBottom: 20 },
  secao: { fontWeight: 'bold', fontSize: 19, marginBottom: 12 },
  card: {
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitulo: { fontWeight: 'bold', fontSize: 18, color: cores.primaria, marginBottom: 7 },
});
