import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import React from "react";
import Game from "./src/components/Game";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Game />
    </GestureHandlerRootView>
  );
};

export default App;
