import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./stack.routes";
import { GeneralStatusBarColor } from "../components/StatusBar/GeralStatusBar";
import colors from "../styles/colors";
import { useStatusBar } from "../context/StatusBarColorContext";

const Routes = () => {
  const { color } = useStatusBar();

  return (
    <>
      <GeneralStatusBarColor
        backgroundColor={`${color}`}
        barStyle="dark-content"
      />
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </>
  );
};

export { Routes };
