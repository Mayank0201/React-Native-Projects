import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { FormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

// type for the props each expense item receives
type ItemProp = {
  id: string;
  amount: number;
  description: string;
  date: Date;
};

function ExpenseItem({ ...props }: ItemProp) {
  const navigation = useNavigation<any>(); // navigation hook to navigate to ManageExpense screen

  // handler called when an expense item is pressed
  function expensePressHandler() {
    // navigate to ManageExpense screen with the expense id
    navigation.navigate("ManageExpense", {
      expenseId: props.id,
    });
  }

  return (
    // Pressable provides a visual feedback when pressed
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed} // reduces opacity when pressed
    >
      <View style={styles.expenseItem}>
        {/* left side: description and date */}
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {props.description}
          </Text>
          <Text style={styles.textBase}>{FormattedDate(props.date)}</Text>
        </View>

        {/* right side: amount */}
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>₹{props.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

// styles for the component
const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500, // card background color
    flexDirection: "row", // display description and amount side by side
    justifyContent: "space-between", // space between description and amount
    borderRadius: 6, // rounded corners
    elevation: 3, // shadow for android
  },
  textBase: {
    color: GlobalStyles.colors.primary50, // default text color
  },
  description: {
    fontWeight: "bold",
    fontSize: 16,
    margin: 4,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 12,
    margin: 4,
    color: GlobalStyles.colors.primary500, // amount text color
  },
  amountContainer: {
    backgroundColor: GlobalStyles.colors.primary50, // background for amount
    padding: 8,
    borderRadius: 4,
    minWidth: 80,
    alignItems: "center", // center text horizontally
  },
  pressed: {
    opacity: 0.75, // pressed feedback
  },
});
