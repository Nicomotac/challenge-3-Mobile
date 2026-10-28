import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import Text from '../components/ThemedText';
import { useAuth } from '../context/AuthContext';
import { useHistoricoTriagem } from '../control/useHistoricoTriagem';
import { usePets } from '../control/usePetControl';
import { useTutores } from '../control/useTutorControl';
import { useTema, type Cores } from '../theme/ThemeContext';

export default function HistoricoScreen() {
  const { cores } = useTema();
  const { usuario } = useAuth();
  const styles = criarEstilos(cores);
  const pets = usePets();
  const tutores = useTutores();
  const triagens = useHistoricoTriagem(usuario?.username ?? '');

  return (
    <ScrollView style={styles.pagina} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Histórico</Text>
      <Text style={styles.subtitulo}>Dados cadastrais da API e triagens deste dispositivo.</Text>
      {(pets.isLoading || tutores.isLoading || triagens.isLoading) && (
        <ActivityIndicator color={cores.primaria} />
      )}
      {(pets.isError || tutores.isError || triagens.isError) && (
        <Text style={styles.erro}>Alguns dados não puderam ser carregados.</Text>
      )}
      <View style={styles.card}>
        <Text style={styles.nome}>Triagens ({triagens.data?.length ?? 0})</Text>
        {(triagens.data ?? []).map((item) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.destaque}>{item.petNome}: {item.resultado.nivel}</Text>
            <Text>{new Date(item.criadoEm).toLocaleString('pt-BR')}</Text>
            <Text>{item.resultado.mensagem}</Text>
          </View>
        ))}
        {!triagens.isLoading && !triagens.data?.length && <Text>Nenhuma triagem registrada.</Text>}
      </View>
      <View style={styles.card}>
        <Text style={styles.nome}>Tutores cadastrados ({tutores.data?.length ?? 0})</Text>
        {(tutores.data ?? []).map((tutor) => <Text key={tutor.id}>• {tutor.nome}</Text>)}
      </View>
      <View style={styles.card}>
        <Text style={styles.nome}>Pets cadastrados ({pets.data?.length ?? 0})</Text>
        {(pets.data ?? []).map((pet) => (
          <Text key={pet.id}>• {pet.nome} — {pet.especie} — tutor: {pet.responsavelNome}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const criarEstilos = (cores: Cores) => StyleSheet.create({
  pagina: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 18, paddingBottom: 30 },
  titulo: { fontSize: 26, fontWeight: 'bold' },
  subtitulo: { color: cores.textoSecundario, marginVertical: 12 },
  card: {
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  nome: { fontSize: 17, fontWeight: 'bold', color: cores.primaria, marginBottom: 8 },
  item: { marginBottom: 12, borderBottomColor: cores.borda, borderBottomWidth: 1, paddingBottom: 9 },
  destaque: { fontWeight: 'bold', marginBottom: 4 },
  erro: { color: cores.perigo },
});
