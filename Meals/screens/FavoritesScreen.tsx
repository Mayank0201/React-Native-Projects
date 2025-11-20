//import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
//import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";
import { useSelector } from "react-redux";

function FavoritesScreen() {
  //const favoriteMealsContext = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state: any) => state.favoriteMeals.ids);

  const favoriteMeals = MEALS.filter((meal) =>
    //favoriteMealsContext.ids.includes(meal.id)
    favoriteMealIds.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>Press the star to favorite some meals</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
