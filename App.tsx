import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import type { NotificationResponse } from 'expo-notifications';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { navigationRef } from './src/navigation/navigation';
import RootNavigator from './src/navigation/RootNavigator';
import { Notifications } from './src/notifications/notificationService';
import { TemaProvider, useTema } from './src/theme/ThemeContext';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

function Navegacao() {
  const { usuario } = useAuth();
  const { modoEfetivo } = useTema();
  const autenticado = useRef(false);
  const abrirTriagem = useRef(false);
  autenticado.current = Boolean(usuario);

  function encaminharNotificacao() {
    if (!autenticado.current || !abrirTriagem.current || !navigationRef.isReady()) {
      return;
    }
    const rotas = navigationRef.getRootState()?.routeNames ?? [];
    if (!rotas.includes('Triagem')) return;
    abrirTriagem.current = false;
    navigationRef.navigate('Triagem');
    void Notifications.clearLastNotificationResponseAsync().catch(() => {});
  }

  useEffect(() => {
    function receberResposta(resposta: NotificationResponse) {
      if (resposta.notification.request.content.data?.screen === 'Triagem') {
        abrirTriagem.current = true;
        encaminharNotificacao();
      }
    }

    const assinatura = Notifications.addNotificationResponseReceivedListener(receberResposta);
    void Notifications.getLastNotificationResponseAsync()
      .then((resposta) => { if (resposta) receberResposta(resposta); })
      .catch(() => {});
    return () => assinatura.remove();
  }, []);

  useEffect(() => {
    encaminharNotificacao();
  }, [usuario]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={encaminharNotificacao}
      onStateChange={encaminharNotificacao}
    >
      <StatusBar style={modoEfetivo === 'escuro' ? 'light' : 'dark'} />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TemaProvider>
        <AuthProvider>
          <Navegacao />
        </AuthProvider>
      </TemaProvider>
    </QueryClientProvider>
  );
}
