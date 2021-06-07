import React, { useState, useEffect } from "react";

import grootImage from "../assets/groot.jpg";

import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

import fonts from "../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Header() {
  const [user, setUser] = useState("");

  useEffect(() => {
    async function handleLoadUser() {
      const name = await AsyncStorage.getItem("@groot-app:user");
      if (name) {
        setUser(name);
      } else {
        setUser("User");
      }
    }
    handleLoadUser();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{user}</Text>
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
    height: Dimensions.get("window").width * 0.2,
    width: Dimensions.get("window").width * 0.2,
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
