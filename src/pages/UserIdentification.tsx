import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  TextInput,
  Alert,
} from "react-native";

import fonts from "../styles/fonts";
import colors from "../styles/colors";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

function UserIdentification() {
  const [name, setName] = useState<string>();

  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [inputIsFiled, setInputIsField] = useState(false);

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function handleGetUserInfo() {
      const user = await AsyncStorage.getItem("@groot-app:user");
      if (user) {
        navigation.navigate("PlantSelect");
      }
    }
    handleGetUserInfo();
    setLoading(false);
  }, []);

  async function handleSubmit() {
    if (!name) {
      return Alert.alert("Me diz como chamar você 😥");
    }

    navigation.navigate("Confirmation", {
      title: "Prontinho",
      subTitle:
        "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
      buttonTitle: "Começar",
      icon: "smile",
      nextScreen: "PlantSelect",
    });

    try {
      await AsyncStorage.setItem("@groot-app:user", name);
    } catch (error) {
      Alert.alert("Ocorreu um erro ao salvar o seu nome 😥");
    }
  }

  function handleInputBlur() {
    setInputIsFocused(false);
    setInputIsField(!!name);
  }

  function handleInputFocus() {
    setInputIsFocused(true);
  }

  function handleInputChange(value: string) {
    setInputIsField(!!value);
    setName(value);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <View style={styles.form}>
              {!name ? (
                <Text style={styles.emoji}>😃</Text>
              ) : name === "Sabrina" ? (
                <Text style={styles.emoji}>😍</Text>
              ) : name === "Sabrina " ? (
                <Text style={styles.emoji}>😍</Text>
              ) : name === "Sabrina Martins" ? (
                <Text style={styles.emoji}>😍</Text>
              ) : name === "Sabrina Martins " ? (
                <Text style={styles.emoji}>😍</Text>
              ) : name === "Amor" ? (
                <Text style={styles.emoji}>😍</Text>
              ) : name.length > 20 ? (
                <Text style={styles.emoji}>😲</Text>
              ) : (
                <Text style={styles.emoji}>😄</Text>
              )}

              <Text style={styles.title}>
                Como podemos {"\n"}
                chamar você?
              </Text>
              <TextInput
                style={[
                  styles.input,
                  (inputIsFocused || inputIsFiled) && {
                    borderColor: colors.green,
                  },
                ]}
                onBlur={() => handleInputBlur}
                onFocus={() => handleInputFocus}
                placeholder="Digite um nome"
                value={name}
                onChangeText={handleInputChange}
              />
              <Button title="Confirmar" onPress={handleSubmit} />
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

export { UserIdentification };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  header: {},
  emoji: {
    fontSize: 36,
    marginBottom: 24,
  },
  title: {
    textAlign: "center",
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
  },
  input: {
    width: "100%",
    borderBottomWidth: 2,
    borderColor: colors.gray,
    padding: 10,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 40,
    fontSize: 18,
    fontFamily: fonts.text,
    color: colors.heading,
  },
});
