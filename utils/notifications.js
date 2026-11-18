import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export async function requestNotificationPermission() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('task-reminders', {
      name: 'Task reminders',
      importance: Notifications.AndroidImportance.DEFAULT
    });
  }

  const current = await Notifications.getPermissionsAsync();
  let status = current.status;

  if (status !== 'granted') {
    const requested = await Notifications.requestPermissionsAsync();
    status = requested.status;
  }

  return status === 'granted';
}

export async function sendTaskCompletedNotification(taskTitle) {
  const permitted = await requestNotificationPermission();
  if (!permitted) return false;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Task completed!',
      body: `"${taskTitle}" has been marked as completed.`,
      sound: false
    },
    trigger: null
  });

  return true;
}