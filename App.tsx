import React from "react";

import { Routes } from "./src/routes";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
  Jost_300Light,
} from "@expo-google-fonts/jost";

import { GeneralStatusBarColor } from "./src/components/StatusBar/GeralStatusBar";
import colors from "./src/styles/colors";

export default function App() {
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
      <GeneralStatusBarColor
        backgroundColor={colors.white}
        barStyle="dark-content"
      />
      <Routes />
    </>
  );
}

//  3 =  32:56
