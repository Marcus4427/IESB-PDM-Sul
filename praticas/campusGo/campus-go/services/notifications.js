import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: false }) });

export const scheduleReminder = async (title, seconds) => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status === 'granted') {
    await Notifications.scheduleNotificationAsync({ content: { title }, trigger: { seconds } });
  }
};