import React from "react";

import { StyleSheet, Text, View, Animated } from "react-native";

import { SvgFromUri } from "react-native-svg";

import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Feather } from "@expo/vector-icons";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

const PlantCardSecondary: React.FC<PlantProps> = ({
  data: { name, hour, photo },
  handleRemove,
}) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton style={styles.buttonRemove} onPress={handleRemove}>
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container}>
        <SvgFromUri uri={photo} width={50} height={50} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <View style={styles.containerText}>
          <Text style={styles.timeText}>Regar às</Text>
          <Text style={styles.hour}>{hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
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
    fontFamily: fonts.heading,
    fontSize: 16,
    marginRight: 20,
  },
  containerText: {
    width: 57,
    alignItems: "center",
    justifyContent: "center",
  },

  timeText: {
    fontSize: 14,
    fontFamily: fonts.light,
    color: colors.body_light,
  },
  hour: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.heading,
  },
  buttonRemove: {
    // flex: 1,
    width: 80,
    height: 75,
    backgroundColor: colors.red,
    marginTop: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 15,
    paddingLeft: 5,
  },
});
export { PlantCardSecondary };

// 15 min
