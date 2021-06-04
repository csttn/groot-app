import React from "react";
import { View, StyleSheet, Text, Platform, StatusBar } from "react-native";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation, useRoute } from "@react-navigation/core";

export interface Params {
  title: string;
  subTitle: string;
  buttonTitle: string;
  icon: "smile" | "hug";
  nextScreen: string;
}

const emojis = {
  hug: "🤗",
  smile: "😁",
};

function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const { title, subTitle, buttonTitle, icon, nextScreen } =
    routes.params as Params;

  function handleInit() {
    navigation.navigate(nextScreen);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emojis[icon]}</Text>

      <View style={styles.textContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{subTitle}</Text>
      </View>

      <Button title={buttonTitle} onPress={handleInit} />
    </View>
  );
}

export { Confirmation };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 96,
    marginBottom: 64,
  },
  textContent: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.heading,
    color: colors.heading,
  },
  text: {
    textAlign: "center",
    fontFamily: fonts.text,
    fontSize: 18,
    paddingHorizontal: 25,
  },
});
