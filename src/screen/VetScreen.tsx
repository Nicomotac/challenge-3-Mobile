import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import Text from '../components/ThemedText';
import { usePets } from '../control/usePetControl';
import { useTutores } from '../control/useTutorControl';
import { useTema, type Cores } from '../Theme/themeContext';
import type { RootDrawerParamList } from '../navigation/navigation';

export default function VetScreen() {
  const { cores } = useTema();
  const styles = criarEstilos(cores);
  const pets = usePets();
  const tutores = useTutores();
  const navegacao = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <ScrollView style={styles.pagina} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Painel Veterinário</Text>
      <Text style={styles.subtitulo}>Visão dos cadastros disponíveis na API.</Text>
      {(pets.isLoading || tutores.isLoading) && <ActivityIndicator color={cores.primaria} />}
      {(pets.isError || tutores.isError) && <Text style={styles.erro}>Não foi possível atualizar os indicadores.</Text>}
      <View style={styles.linha}>
        <TouchableOpacity style={styles.card} onPress={() => navegacao.navigate('Pets')}>
          <Text style={styles.numero}>{pets.data?.length ?? 0}</Text>
          <Text>Pets cadastrados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navegacao.navigate('Tutores')}>
          <Text style={styles.numero}>{tutores.data?.length ?? 0}</Text>
          <Text>Tutores</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.destaque} onPress={() => navegacao.navigate('Triagem')}>
        <Text style={styles.cardTitulo}>Realizar triagem</Text>
        <Text>Registre sintomas de um pet e acompanhe o nível de atenção recomendado.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.destaque} onPress={() => navegacao.navigate('Historico')}>
        <Text style={styles.cardTitulo}>Consultar histórico</Text>
        <Text>Veja as triagens registradas neste dispositivo.</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const criarEstilos = (cores: Cores) => StyleSheet.create({
  pagina: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 20 },
  titulo: { fontSize: 28, fontWeight: 'bold' },
  subtitulo: { color: cores.textoSecundario, marginBottom: 18 },
  linha: { flexDirection: 'row', gap: 10 },
  card: {
    flex: 1,
    alignItems: 'center',
    padding: 18,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
    backgroundColor: cores.superficie,
  },
  numero: { fontSize: 30, fontWeight: 'bold', color: cores.primaria },
  destaque: {
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 12,
    padding: 16,
    marginTop: 14,
  },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: cores.primaria, marginBottom: 7 },
  erro: { color: cores.perigo, marginBottom: 10 },
});
