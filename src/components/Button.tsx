import React from "react";

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface IButtonProps extends TouchableOpacityProps {
  title: string;
}

function Button({ title, ...rest }: IButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.5} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    width: 231,
    textAlign: "center",
    backgroundColor: colors.green,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: colors.white,
    fontFamily: fonts.text,
    fontSize: 18,
  },
});

export { Button };
