import React from "react";
import { View, StyleSheet, Text, Platform, StatusBar } from "react-native";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/core";

function Confirmation() {
  const navigation = useNavigation();

  function handleInit() {
    navigation.navigate("PlantSelect");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😁</Text>

      <View style={styles.textContent}>
        <Text style={styles.title}>Ready</Text>
        <Text style={styles.text}>
          Agora vamos começar a cuidar das suas{"\n"}
          plantinhas com muito cuidado.
        </Text>
      </View>

      <Button title="Começar" onPress={handleInit} />
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
  },
});
