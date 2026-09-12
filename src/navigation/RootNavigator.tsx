import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import type { PublicStackParamList, RootDrawerParamList } from './navigation';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import HomeScreen from '../screen/HomeScreen';
import TutorScreen from '../screen/TutorScreen';
import PetScreen from '../screen/PetScreen';
import VetScreen from '../screen/VetScreen';
import CuidadosScreen from '../screen/CuidadosScreen';
import TriagemScreen from '../screen/TriagemScreen';
import AssistenteIAScreen from '../screen/AssistenteIAScreen';
import HistoricoScreen from '../screen/HistoricoScreen';
import PerfilScreen from '../screen/PerfilScreen';

const PublicStack = createNativeStackNavigator<PublicStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function PublicNavigator() {
  return <PublicStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#2563eb' }, headerTintColor: '#fff' }}><PublicStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /><PublicStack.Screen name="Cadastro" component={RegisterScreen} options={{ title: 'Criar conta' }} /></PublicStack.Navigator>;
}

function PrivateNavigator() {
  return <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: '#2563eb' }, headerTintColor: '#fff', drawerActiveTintColor: '#2563eb' }}>
    <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
    <Drawer.Screen name="Tutores" component={TutorScreen} options={{ title: 'Tutores' }} />
    <Drawer.Screen name="Pets" component={PetScreen} options={{ title: 'Pets' }} />
    <Drawer.Screen name="Veterinario" component={VetScreen} options={{ title: 'Painel Veterinário' }} />
    <Drawer.Screen name="Cuidados" component={CuidadosScreen} options={{ title: 'Jornada de Cuidados' }} />
    <Drawer.Screen name="Triagem" component={TriagemScreen} options={{ title: 'Triagem de Risco' }} />
    <Drawer.Screen name="AssistenteIA" component={AssistenteIAScreen} options={{ title: 'Assistente IA' }} />
    <Drawer.Screen name="Historico" component={HistoricoScreen} options={{ title: 'Histórico' }} />
    <Drawer.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Meu Perfil' }} />
  </Drawer.Navigator>;
}

export default function RootNavigator() {
  const { usuario, carregandoSessao } = useAuth();
  if (carregandoSessao) return <View style={styles.loading}><ActivityIndicator size="large" color="#2563eb" /></View>;
  return usuario ? <PrivateNavigator /> : <PublicNavigator />;
}
const styles = StyleSheet.create({ loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' } });
