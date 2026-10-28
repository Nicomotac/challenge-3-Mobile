import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const CANAL = 'alertas-triagem';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function prepararNotificacoes(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CANAL, {
      name: 'Alertas de triagem',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
  const atual = await Notifications.getPermissionsAsync();
  if (atual.granted) return true;
  if (!atual.canAskAgain) return false;
  const solicitada = await Notifications.requestPermissionsAsync();
  return solicitada.granted;
}

export async function notificarRiscoTriagem(
  nomePet: string,
  nivel: string,
  mensagem: string,
): Promise<boolean> {
  if (nivel !== 'ALTO' && nivel !== 'EMERGÊNCIA') return false;
  if (!(await prepararNotificacoes())) return false;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Atenção à saúde de ${nomePet}`,
      body: `${nivel}: ${mensagem}`,
      sound: 'default',
      data: { screen: 'Triagem' },
    },
    trigger: null,
  });
  return true;
}

export { Notifications };
