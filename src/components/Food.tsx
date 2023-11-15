import { StyleSheet, Text } from "react-native";
import React from "react";
import { Coordinate } from "../types/types";

const Food = ({ x, y }: Coordinate): JSX.Element => {
  const fruitEmojis = ["🍇", "🍈", "🍉", "🍈", "🍊", "", "🍋", "🍌", "🍑"];
  const randomIndex = Math.floor(Math.random() * fruitEmojis.length);

  return <Text style={[{ top: y * 10, left: x * 10 }, styles.fruit]}>{fruitEmojis[randomIndex]}</Text>;
};

export default Food;

const styles = StyleSheet.create({
  fruit: {
    width: 20,
    height: 20,
    borderRadius: 7,
    position: "absolute",
  },
});
