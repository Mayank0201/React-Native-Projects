import { View, Text, StyleSheet, FlatList } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import Meal from "../models/meal";
import { useLayoutEffect } from "react";
import MealItem from "../components/MealsList/MealItem";
import MealsList from "../components/MealsList/MealsList";
//import { useRoute } from "@react-navigation/native" can use this hook for an alternative for this prop
//for some component that isnt registered as a screen

function MealsOverview({ route, navigation }: any) {
  //check docs to know about navigation and route props
  const id = route.params.categoryId;
  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(id) >= 0; //means we have a match
    //if it doesnt find a match , it will return -1
  });

  const categoryTitle = CATEGORIES.find((category) => category.id === id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryTitle ? categoryTitle.title : "Meals", // ✅ FIXED
    });
    /// ❌ Error: "Cannot update a component while rendering another component"
    // Happens when we call navigation.setOptions (or any state update) directly inside render.
    // React doesn't allow state changes during rendering.

    // ✅ Fix: Use useLayoutEffect instead of useEffect or direct calls.
    // useLayoutEffect runs before the screen is painted, ensuring navigation options update safely. */
  }, [navigation, id]);

  return <MealsList items={displayedMeals} />;
}

export default MealsOverview;
