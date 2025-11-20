import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
//import { FavoritesContext } from "../store/context/favorites-context";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

function MealDetailScreen({ route, navigation }: any) {
  //const favoriteMealsContext = useContext(FavoritesContext);
  //standard react

  const FavoriteMealIds = useSelector((state: any) => state.favoriteMeals.ids);

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  // always recompute from context — no let variable
  //const mealIsFavorite = favoriteMealsContext.ids.includes(mealId);

  const dispatch = useDispatch();

  function favoriteHandler() {
    // get fresh value directly from context
    //const currentlyFavorite = favoriteMealsContext.ids.includes(mealId);
    const currentlyFavorite = FavoriteMealIds.includes(mealId);

    if (currentlyFavorite) {
      //favoriteMealsContext.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      //favoriteMealsContext.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  }

  // useLayoutEffect is used to update navigation options synchronously before the screen is painted
  // unlike useEffect, it prevents flickering when setting header titles or buttons
  // This ensures the UI updates immediately with the correct header or layout, avoiding visual glitches.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        //const isFav = favoriteMealsContext.ids.includes(mealId);
        const isFav = FavoriteMealIds.includes(mealId);
        return (
          <IconButton
            icon={isFav ? "star" : "star-outline"}
            color="white"
            onPress={favoriteHandler}
          />
        );
      },
    });
  }, [navigation, FavoriteMealIds, mealId]);

  return (
    <ScrollView style={styles.root}>
      <Image style={styles.image} source={{ uri: selectedMeal?.imageUrl }} />
      {/* we use {{}} since uri takes an image from the web using the imageurl */}
      <Text style={styles.title}>{selectedMeal?.title}</Text>

      <MealDetails
        duration={selectedMeal?.duration}
        complexity={selectedMeal?.complexity}
        affordability={selectedMeal?.complexity}
      />

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Ingredients</Text>
        {selectedMeal?.ingredients.map((ingredient) => (
          <View style={styles.card} key={ingredient}>
            <Text style={styles.cardText}>
              {"\u2022"} {ingredient}
            </Text>
          </View>
        ))}
      </View>

      {/* You cannot nest <View> inside <Text>, but <Text> inside <Text> is valid. */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Steps</Text>
        {selectedMeal?.steps.map((step, index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.cardText}>
              {"\u2022"} {step}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  image: {
    width: "100%",
    height: 300,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
    paddingHorizontal: 16,
  },

  section: {
    marginVertical: 14,
    marginHorizontal: 20,
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cardText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
});
