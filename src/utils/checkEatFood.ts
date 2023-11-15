import { Coordinate } from "../types/types";

export const checkEatFood = (
  head: Coordinate,
  food: Coordinate,
  area: number
): boolean => {
  const distanceBetweenFoodandSnakeX: number = Math.abs(head.x - food.x);
  const distanceBetweenFoodAndSnakeY: number = Math.abs(head.y - food.y);

  return (
    distanceBetweenFoodandSnakeX < area && distanceBetweenFoodAndSnakeY < area
  );
};
