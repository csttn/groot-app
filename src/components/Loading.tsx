import React from "react";

import { View, StyleSheet } from "react-native";

import LottieView from "lottie-react-native";

import loadingAnimation from "../assets/load.json";

const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={loadingAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export { Loading };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: { backgroundColor: "transparent", width: 200 },
});
