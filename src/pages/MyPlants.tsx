import React, { useState, useEffect } from "react";

import { View, StyleSheet, Text, Image, FlatList, Alert } from "react-native";

import { Header } from "../components/Header";

import waterdrop from "../assets/waterdrop.png";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { loadPlant, PlantProps, removePlant } from "../libs/storage";

import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { Loading } from "../components/Loading";
import { PlantCardSecondary } from "../components/PlantCardSecondary";

const MyPlants: React.FC = () => {
  const [myPlants, setMyPlants] = useState<PlantProps[]>();

  const [loading, setLoading] = useState(true);

  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStorage() {
      const plantsStorage = await loadPlant();

      setMyPlants(plantsStorage);

      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );
      setNextWatered(
        `Não esqueça de regar a ${plantsStorage[0].name} à ${nextTime}`
      );
    }

    loadStorage();

    setLoading(false);
  }, []);

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", ` Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim 😥",
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldPlants) =>
              oldPlants?.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possível remover");
          }
        },
      },
    ]);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Header />
          <View style={styles.spotlight}>
            <Image source={waterdrop} style={styles.spotlightImage} />
            <Text style={styles.spotlighText}>
              {nextWatered
                ? nextWatered
                : "Salve uma plantinha que te ajudamos a lembrar de cuidar dela."}
            </Text>
          </View>

          <View style={styles.plantsContainer}>
            <Text style={styles.plantsTitle}> Próximas regadas</Text>

            {myPlants ? (
              <FlatList
                data={myPlants}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <PlantCardSecondary
                    data={item}
                    handleRemove={() => {
                      handleRemove(item);
                    }}
                  />
                )}
              />
            ) : (
              <Text>Salva uma plantinha</Text>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
  },

  spotlight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 311,
    height: 88,
    marginTop: 20,
    padding: 16,
    backgroundColor: "#EBF6FF",
    borderRadius: 20,
  },
  spotlightImage: {},
  spotlighText: {
    width: 200,
    fontSize: 15,
    fontFamily: fonts.text,
    color: colors.blue,
  },
  plantsContainer: {
    flex: 1,
    width: 311,
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
});

export { MyPlants };
