import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import wateringImg from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { useNavigation } from "@react-navigation/core";

function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("UserIdentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie{"\n"}
        suas plantas de{"\n"}
        forma fácil
      </Text>

      <Image source={wateringImg} style={styles.image} resizeMode="contain" />

      <Text style={styles.subTitle}>
        Não esqueça mais de regar suas {"\n"}
        plantas. Nós cuidamos de lembrar você {"\n"}
        sempre que precisar.
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleStart}
      >
        <Feather name="chevron-right" style={styles.buttonIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "space-around",
  },

  title: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 38,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    lineHeight: 38,
  },

  image: {
    height: Dimensions.get("window").width * 0.7,
  },
  subTitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 25,
    alignItems: "center",
    textAlign: "center",
    color: colors.body_dark,
  },
  button: {
    width: 56,
    height: 56,
    backgroundColor: colors.green,
    marginBottom: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },
});
export { Welcome };
