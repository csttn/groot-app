import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  StatusBarProps,
} from "react-native";

interface GeneralStatusBarColorProps extends StatusBarProps {
  backgroundColor: string;
}

const GeneralStatusBarColor = ({
  backgroundColor,
  ...props
}: GeneralStatusBarColorProps) => {
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};
export { GeneralStatusBarColor };

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
  },
});
