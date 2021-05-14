import React from "react";

import { StyleSheet, Text, Image } from "react-native";

import { SvgFromUri } from "react-native-svg";

import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

const PlantCardPrimary: React.FC<PlantProps> = ({
  data: { name, photo },
  ...rest
}) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={photo} width={73} height={89} />
      <Text style={styles.name}>{name}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 154,
    width: 148,
    backgroundColor: colors.shape,
    borderRadius: 20,
    alignItems: "center",
    margin: 10,
  },
  name: {
    fontSize: 13,
    fontFamily: fonts.heading,
  },
});
export { PlantCardPrimary };
