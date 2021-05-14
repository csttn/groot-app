import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";

import { EnvironmentButton } from "../components/EnvironmentButton";
import { Header } from "../components/Header";
import { PlantCardPrimary } from "../components/PlantCardPrimary";

import { api } from "../services/api";

import { WebView } from "react-native-webview";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>(plants);

  const [environmentSelected, setEnvironmentSelected] = useState("all");

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === "all") return setFilteredPlants(plants);

    const filtered = plants?.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }
  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get(
        "/plants_environments?_sort=title&_order=asc"
      );

      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }

    fetchEnvironment();
  }, []);

  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api.get("plants?_sort=name&_order=asc");
      setPlants(data);
      setFilteredPlants(data);
    }
    fetchPlants();
  }, []);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Em qual ambiente</Text>
          <Text style={styles.subTitle}>Você quer colocar a sua planta?</Text>
        </View>

        <View>
          {/* Listando filtros do ambintes para exibixção das plantas */}
          <FlatList
            data={environments}
            renderItem={({ item }) => (
              <EnvironmentButton
                title={item.title}
                active={item.key === environmentSelected}
                onPress={() => handleEnvironmentSelected(item.key)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.environmentList}
          />
        </View>

        <View style={styles.lisPlantsView}>
          {/* Listando Plantas */}
          <FlatList
            data={filteredPlants}
            renderItem={({ item }) => <PlantCardPrimary data={item} />}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
          />
        </View>
      </View>
    </>
  );
}

// 1:21

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
  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginVertical: 32,
  },
  lisPlantsView: {
    flex: 1,
  },
});
