import { CATEGORIES } from "../data/dummy-data";
import { FlatList } from "react-native";
import Category from "../models/category";
import CategoryGridTile from "../components/CategoryGridTile";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// FlatList's renderItem receives an object with { item, index, separators },
// not just the item directly. We destructure { item } to get the Category object.

// Using :any for now to keep it simple and avoid TypeScript type errors and mimic basic jsx
// Later, replace with proper navigation prop type for better type safety
function CategoryScreen({ navigation }: any) {
  function renderCategoryItem({ item }: { item: Category }) {
    function pressHandler() {
      //put inside one class so that they can have access to the navigation object and so that press handler can access the nav obj
      navigation.navigate("Meals Overview", {
        categoryId: item.id,
      });
    }

    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoryScreen;
