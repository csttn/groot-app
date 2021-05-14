import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface IEnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

const EnvironmentButton: React.FC<IEnvironmentButtonProps> = ({
  title,
  active = false,
  ...rest
}) => {
  return (
    <RectButton style={styles.button} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </RectButton>
  );
};

export default EnvironmentButton;

const styles = StyleSheet.create({
  button: {
    width: 76,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
    borderRadius: 12,
  },
  text: {
    fontSize: 13,
    fontFamily: fonts.text,
    color: colors.heading,
  },
});
