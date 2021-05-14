import React from "react";
import { View, Text, StyleSheet } from "react-native";
import EnvironmentButton from "../components/EnvironmentButton";
import { Header } from "../components/Header";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

function PlantSelect() {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Em qual ambiente</Text>
          <Text style={styles.subTitle}>Você quer colocar a sua planta?</Text>
        </View>
        <EnvironmentButton title="Cozinha" />
      </View>
    </>
  );
}

export { PlantSelect };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginLeft: 32,
    marginTop: 15,
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    lineHeight: 23,
  },
  subTitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 23,
  },
});
