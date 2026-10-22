import { Alert, Platform } from "react-native";

let Notifications = null;

try {
  Notifications = require("expo-notifications");
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
} catch (error) {
  console.warn("expo-notifications unavailable:", error.message);
}

export const scheduleReminder = async (title, seconds) => {
  if (!Notifications) {
    Alert.alert("Aviso", "Notificações não estão disponíveis neste ambiente.");
    return;
  }
  await Notifications.scheduleNotificationAsync({
    content: { title, body: "Está na hora de voltar aos estudos!" },
    trigger: { seconds },
  });
};