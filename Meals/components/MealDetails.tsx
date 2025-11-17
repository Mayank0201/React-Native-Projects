import { View, Text, StyleSheet } from "react-native";

type MealProps = {
  duration?: number;
  complexity?: string;
  affordability?: string;
};

function MealDetails({ duration, complexity, affordability }: MealProps) {
  return (
    <View style={styles.details}>
      <Text style={styles.detailItem}>Duration: {duration}</Text>
      <Text style={styles.detailItem}>Complexity: {complexity}</Text>
      <Text style={styles.detailItem}>Affordability: {affordability}</Text>
    </View>
  );
}

export default MealDetails;

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    justifyContent: "center",
  },
  detailItem: {
    marginHorizontal: 8,
    fontSize: 12,
  },
});
