import React, { useState, useEffect } from "react";
import { Touchable, View } from "react-native";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  Alert,
  Dimensions,
} from "react-native";

import DateTimerPicker, { Event } from "@react-native-community/datetimepicker";

import { useNavigation, useRoute } from "@react-navigation/core";

import { useStatusBar } from "../context/StatusBarColorContext";

import { Button } from "../components/Button";

import { SvgFromUri } from "react-native-svg";
import { EvilIcons } from "@expo/vector-icons";

import { PlantProps, savePlant } from "../libs/storage";

import waterdrop from "../assets/waterdrop.png";

import fonts from "../styles/fonts";
import colors from "../styles/colors";

import { format, isBefore } from "date-fns";
import { useIsFocused } from "@react-navigation/native";

interface Params {
  plant: PlantProps;
}

const PlantSave: React.FC = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const route = useRoute();
  const navigation = useNavigation();
  const { plant } = route.params as Params;

  const { color, handleAlterColor } = useStatusBar();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (color !== colors.shape) {
        handleAlterColor(colors.shape);
      }
    }
  }, [isFocused]);

  function handleNavigateToPlantSelect() {
    navigation.navigate("PlantSelect");
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker((value) => !value);
  }

  function handleChangeTime(event: Event, datetime: Date | undefined) {
    if (Platform.OS === "android") {
      setShowDatePicker((value) => !value);
    }

    if (datetime && isBefore(datetime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma horário no futuro! ⏰");
    }

    if (datetime) {
      setSelectedDateTime(datetime);
    }
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subtitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.",
        buttonTitle: "Muito Obrigado :D",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch {
      Alert.alert("Não foi possível salvar. 😢");
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.plantInfo}>
        <TouchableOpacity
          style={styles.navigateBack}
          onPress={handleNavigateToPlantSelect}
        >
          <EvilIcons
            name="chevron-left"
            style={styles.navigateBackIcon}
            color={"black"}
          />
        </TouchableOpacity>
        <SvgFromUri
          uri={plant.photo}
          height={styles.image.height}
          width={styles.image.width}
        />

        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.controllers}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>
        <Text style={styles.alertLabel}>
          Escolha o melhor horario para ser lembrado
        </Text>

        {Platform.OS === "android" && (
          <TouchableOpacity
            onPress={handleOpenDateTimePickerForAndroid}
            style={styles.dateTimePickerButton}
          >
            <Text style={styles.dateTimerPickerText}>
              {`Mudar : ${format(selectedDateTime, "HH:mm")}`}
            </Text>
          </TouchableOpacity>
        )}

        {showDatePicker && (
          <DateTimerPicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
            is24Hour={true}
            locale="pt-BR"
          />
        )}

        <Button title="Cadastrar" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

export { PlantSave };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigateBack: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  navigateBackIcon: {
    fontSize: 40,
  },
  plantInfo: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
    height: "55%",
    paddingBottom: 77,
  },
  image: {
    height: Dimensions.get("window").width * 0.5,
    width: Dimensions.get("window").width * 0.5,
  },
  plantName: {
    fontSize: 24,
    fontFamily: fonts.heading,
    marginTop: 32,
  },
  plantAbout: {
    fontSize: 17,
    fontFamily: fonts.text,
    width: 311,
    marginTop: 16,
  },
  controllers: {
    alignItems: "center",
    justifyContent: "center",
  },
  tipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 311,
    height: 88,
    marginTop: -44,
    padding: 16,
    backgroundColor: "#EBF6FF",
    borderRadius: 20,
  },
  tipImage: {},
  tipText: {
    width: 200,
    fontSize: 15,
    fontFamily: fonts.text,
    color: colors.blue,
  },
  alertLabel: {
    marginTop: 30,
    fontSize: 14,
    fontFamily: fonts.light,
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
  },
  dateTimerPickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    borderColor: colors.gray,
  },
});

// 26 min 4 video
