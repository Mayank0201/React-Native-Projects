import { View, Pressable, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; //used for any component while route and navigation are only for screen comps
import MealDetails from "./MealDetails";

// Destructuring props allows us to directly access values like 'title'
// instead of writing props.title each time
//reminder you should know about the parameter name of the prop in this case title
function MealItem({
  id,
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
}: {
  id: string;
  title: string;
  imageUrl: string;
  duration: number;
  complexity: string;
  affordability: string;
}) {
  const navigation: any = useNavigation();
  function selectMealItemHandler() {
    navigation.navigate("Meal Detail", {
      mealId: id,
    });
  }

  return (
    <View style={styles.itemCard}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        onPress={selectMealItemHandler}
        style={({ pressed }) => [
          styles.buttonStyle,
          pressed && styles.buttonPressed, // ✅ apply this style only when pressed
        ]}
      >
        <View>
          {/* Usually we will use requires if we have it inside the file path , but since we have links here , use source*/}
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <MealDetails
          duration={duration}
          complexity={complexity}
          affordability={affordability}
        />
      </Pressable>
    </View>
  );
}

export default MealItem;
//for local images , react can set default height and width , but for web images , it obv cant do that so we use styles
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    margin: 16,
  },
  itemCard: {
    margin: 16,
    padding: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 2,
  },

  buttonStyle: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.6,
  },
});
