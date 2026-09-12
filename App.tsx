import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import type { RootDrawerParamList } from "./src/navigation/navigation";
import LoginScreen from "./src/screen/LoginScreen";
import HomeScreen from "./src/screen/HomeScreen";
import CadastroPetScreen from "./src/screen/CadastroPetScreen";
import VetScreen from "./src/screen/VetScreen";
import CuidadosScreen from "./src/screen/CuidadosScreen";
import TriagemScreen from "./src/screen/TriagemScreen";
import HistoricoScreen from "./src/screen/HistoricoScreen";
import LogOutScreen from "./src/screen/LogoutScreen";

const { Navigator, Screen } = createDrawerNavigator<RootDrawerParamList>();

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarToken();
  }, []);

  async function carregarToken() {
    const tokenSalvo = await AsyncStorage.getItem("@token");

    if (tokenSalvo) {
      setToken(tokenSalvo);
    }

    setCarregando(false);
  }

  async function realizarLogin(tokenRecebido: string) {
    await AsyncStorage.setItem("@token", tokenRecebido);
    setToken(tokenRecebido);
  }

  async function sair() {
    await AsyncStorage.removeItem("@token");
    setToken(null);
  }

  if (carregando) {
    return (
      <View style={styles.carregando}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!token) {
    return <LoginScreen onLogin={realizarLogin} />;
  }

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2563eb",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerActiveTintColor: "#2563eb",
          drawerLabelStyle: {
            fontSize: 15,
          },
        }}
      >
        <Screen name="Home" options={{ title: "Início" }}>
          {(props) => (
            <HomeScreen
              {...props}
              token={token}
              onLogout={sair}
            />
          )}
        </Screen>

        <Screen name="CadastroPet" options={{ title: "Cadastro do Pet" }}>
          {(props) => (
            <CadastroPetScreen
              {...props}
              token={token}
            />
          )}
        </Screen>

        <Screen name="Vet" options={{ title: "Veterinário" }}>
          {(props) => (
            <VetScreen
              {...props}
              token={token}
            />
          )}
        </Screen>

        <Screen name="Cuidados" options={{ title: "Jornada de Cuidados" }}>
          {(props) => (
            <CuidadosScreen
              {...props}
              token={token}
            />
          )}
        </Screen>

        <Screen name="Triagem" options={{ title: "Triagem de Risco" }}>
          {(props) => (
            <TriagemScreen
              {...props}
              token={token}
            />
          )}
        </Screen>

        <Screen name="Historico" options={{ title: "Histórico" }}>
          {(props) => (
            <HistoricoScreen
              {...props}
              token={token}
            />
          )}
        </Screen>

        <Screen name="LogOut" options={{ title: "Sair da conta" }}>
          {(props) => (
            <LogOutScreen
              {...props}
              onLogout={sair}
            />
          )}
        </Screen>
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});