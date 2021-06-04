import React, { useEffect } from "react";

import { Routes } from "./src/routes";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
  Jost_300Light,
} from "@expo-google-fonts/jost";

import { StatusBarColorProvider } from "./src/context/StatusBarColorContext";

import * as Notifications from "expo-notifications";
import { PlantProps } from "./src/libs/storage";

export default function App() {
  useEffect(() => {
    // Notifications.setNotificationHandler({
    //   handleNotification: async () => ({
    //     shouldShowAlert: true,
    //     shouldPlaySound: false,
    //     shouldSetBadge: false,
    //   }),
    // });

    // MOstrar notificações em tempo real
    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      }
    );

    return () => subscription.remove();

    // todas as notificações agendadas
    // async function notifications() {
    //   await Notifications.cancelAllScheduledNotificationsAsync();

    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log("######## NOTIFICAÇÕES AGENDAS ########");
    //   console.log(data);

    //   // Cancelar todas as notificações agendadas
    //   // await Notifications.cancelAllScheduledNotificationsAsync();
    // }

    // notifications();
  }, []);

  // Load Fonts

  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
    Jost_300Light,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBarColorProvider>
        <Routes />
      </StatusBarColorProvider>
    </>
  );
}
