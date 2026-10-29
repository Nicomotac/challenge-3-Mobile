import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { RootDrawerParamList } from '../navigation/navigation';
import Text from '../components/ThemedText';
import { usePets } from '../control/usePetControl';
import { recomendacaoDeCuidados } from '../services/cuidadosService';
import { useTema, type Cores } from '../Theme/themeContext';

export default function CuidadosScreen() {
  const pets = usePets();
  const { cores } = useTema();
  const styles = criarEstilos(cores);
  const navegacao = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <View style={styles.pagina}>
      <Text style={styles.titulo}>Jornada de Cuidados</Text>
      <Text style={styles.subtitulo}>
        Orientações gerais calculadas a partir dos pets retornados pela API.
      </Text>
      {pets.isLoading && <ActivityIndicator color={cores.primaria} />}
      {pets.isError && <Text style={styles.erro}>Não foi possível consultar os pets.</Text>}
      <FlatList
        data={pets.data ?? []}
        keyExtractor={(pet) => String(pet.id)}
        refreshing={pets.isFetching}
        onRefresh={() => { void pets.refetch(); }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{recomendacaoDeCuidados(item)}</Text>
            <TouchableOpacity style={styles.botao} onPress={() => navegacao.navigate('Triagem')}>
              <Text style={styles.botaoTexto}>Realizar triagem</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={!pets.isLoading && !pets.isError ? (
          <Text style={styles.vazio}>Cadastre um pet para receber orientações.</Text>
        ) : null}
      />
    </View>
  );
}

const criarEstilos = (cores: Cores) => StyleSheet.create({
  pagina: { flex: 1, backgroundColor: cores.fundo, padding: 16 },
  titulo: { fontSize: 26, fontWeight: 'bold' },
  subtitulo: { color: cores.textoSecundario, marginTop: 5, marginBottom: 14 },
  card: {
    backgroundColor: cores.superficie,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: 10,
  },
  nome: { fontWeight: 'bold', fontSize: 17, color: cores.primaria, marginBottom: 5 },
  vazio: { color: cores.textoSecundario, textAlign: 'center', marginTop: 20 },
  erro: { color: cores.perigo, marginBottom: 8 },
  botao: { backgroundColor: '#2563eb', padding: 10, borderRadius: 8, marginTop: 12 },
  botaoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
