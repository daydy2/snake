import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../styles/colors";
import {
  GestureDetector,
  Gesture,
  PanGestureHandlerEventPayload,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
} from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import Snake from "./Snake";
import { SafeAreaView } from "react-native-safe-area-context";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { checkEatFood } from "../utils/checkEatFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 36, yMin: 0, yMax: 70 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Game = (): JSX.Element => {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const pan = Gesture.Pan().onChange((event) => {
    const { translationX, translationY } = event;
    console.log(translationX);
    console.log(translationY);

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        // moving right
        setDirection(Direction.Right);
      } else {
        // moving left
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        // moving down
        setDirection(Direction.Down);
      } else {
        // moving up
        setDirection(Direction.Up);
      }
    }
  });

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      const intervalId = setInterval(() => {
        moveSnake();
      }, MOVE_INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead };

    // check game over
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver((prev) => !prev);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }
    //eats food
    if (checkEatFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setScore(score + SCORE_INCREMENT);
      setSnake([newHead, ...snake]);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION), setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsPaused(false);
  };

  return (
    <GestureDetector gesture={pan}>
      <SafeAreaView style={styles.container}>
        <Header
          isPaused={isPaused}
          pauseGame={pauseGame}
          reloadGame={reloadGame}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: Colors.primary,
            }}
          >
           {score}
          </Text>
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </GestureDetector>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  boundaries: {
    flex: 1,
    // position: 'relative',
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
});
