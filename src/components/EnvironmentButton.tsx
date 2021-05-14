import React from "react";
import { Text, StyleSheet } from "react-native";

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
    <RectButton style={active ? styles.buttonActive : styles.button} {...rest}>
      <Text style={active ? styles.textActive : styles.text}>{title}</Text>
    </RectButton>
  );
};

export { EnvironmentButton };

const styles = StyleSheet.create({
  button: {
    width: 76,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
    borderRadius: 12,
    marginRight: 5,
  },

  buttonActive: {
    width: 76,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green_light,
    borderRadius: 12,
    marginRight: 5,
  },
  text: {
    fontSize: 13,
    fontFamily: fonts.text,
    color: colors.heading,
  },
  textActive: {
    fontSize: 13,
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
});
