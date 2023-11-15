import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../styles/colors";

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPaused: boolean;
}

const Header = ({
  children,
  reloadGame,
  pauseGame,
  isPaused,
}: HeaderProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Pressable onPress={reloadGame}>
        <Ionicons name="reload-circle" size={35} color={Colors.primary} />
      </Pressable>
      <Pressable onPress={pauseGame}>
        <FontAwesome
          name={isPaused ? "play-circle" : "pause-circle"}
          size={35}
          color={Colors.primary}
        />
      </Pressable>
      {children}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    padding: 15,
    backgroundColor: Colors.background,
  },
});
