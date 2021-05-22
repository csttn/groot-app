import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { EnvironmentButton } from "../components/EnvironmentButton";
import { Header } from "../components/Header";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Loading } from "../components/Loading";

import { useNavigation } from "@react-navigation/core";
import { api } from "../services/api";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { PlantProps } from "../libs/storage";

interface EnvironmentProps {
  key: string;
  title: string;
}

function PlantSelect() {
  //estados de dados a serem exibidos
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);

  //estados de paginação
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(true);

  //  estado de carregamento
  const [loading, setLoading] = useState(true);

  // estado para marcar o filtro selecioando
  const [environmentSelected, setEnvironmentSelected] = useState("all");

  const navigation = useNavigation();

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate("PlantSave", { plant });
  }

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === "all") return setFilteredPlants(plants);

    const filtered = plants?.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  async function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  }

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) return setLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
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
    fetchPlants();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Em qual ambiente</Text>
              <Text style={styles.subTitle}>
                Você quer colocar a sua planta?
              </Text>
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
                keyExtractor={(item) => String(item.key)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.environmentList}
              />
            </View>

            <View style={styles.lisPlantsView}>
              {/* Listando Plantas */}
              <FlatList
                data={filteredPlants}
                renderItem={({ item }) => (
                  <PlantCardPrimary
                    data={item}
                    onPress={() => handlePlantSelect(item)}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                // Verificando se o usuario chegou em 10% da página parte inferior
                onEndReachedThreshold={0.1}
                // chamando função passando o posicioanamento do usuario, caso tenha chegado no 10% da pagina na parte inferior
                onEndReached={({ distanceFromEnd }) =>
                  handleFetchMore(distanceFromEnd)
                }
                ListFooterComponent={
                  loadingMore ? (
                    <ActivityIndicator color={colors.green} />
                  ) : (
                    <></>
                  )
                }
              />
            </View>
          </View>
        </>
      )}
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
