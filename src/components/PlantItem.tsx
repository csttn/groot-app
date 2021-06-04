import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgFromUri } from "react-native-svg";

import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import colors from "../styles/colors";

interface PlantProps extends RectButtonProps {
  item: {
    photo: string;
    name: string;
    hour: string;
  };
}

const PlantItem: React.FC<PlantProps> = ({ item: { photo, name, hour } }) => {
  return (
    <RectButton style={styles.container}>
      <SvgFromUri uri={photo} width={50} height={50} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.containerText}>
        <Text style={styles.dateTime}>Regar às</Text>
        <Text style={styles.hour}>{hour}</Text>
      </View>
    </RectButton>
  );
};

export { PlantItem };

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    padding: 30,
    backgroundColor: colors.shape,
    borderRadius: 20,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {},
  name: {
    textAlign: "center",
  },
  containerText: {
    width: 57,
    alignItems: "center",
    justifyContent: "center",
  },

  hour: {},
  dateTime: {},
});
