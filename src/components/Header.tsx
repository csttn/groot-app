import React from "react";

import grootImage from "../assets/groot.jpg";

import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>User</Text>
      </View>
      <Image source={grootImage} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  image: {
    height: Dimensions.get("window").width * 0.3,
    width: Dimensions.get("window").width * 0.3,
    borderRadius: 100,
    marginBottom: 13,
  },
  greeting: {
    fontSize: 32,
    fontFamily: fonts.light,
    lineHeight: 36,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
});

export { Header };
