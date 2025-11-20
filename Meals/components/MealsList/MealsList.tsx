import { View, Text, FlatList, StyleSheet } from "react-native";
import Meal from "../../models/meal";
import MealItem from "./MealItem";

type MealListProps = {
  items: Meal[];
};

function MealsList({ items }: MealListProps) {
  function renderMealItem({ item }: { item: Meal }) {
    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
    };

    return (
      //<MealItem title={item.title} imageUrl={item.imageUrl} duration={item.duration} complexity={item.complexity} affordability={item.affordability}/>
      <MealItem {...mealItemProps} /> //props will be assigned
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
