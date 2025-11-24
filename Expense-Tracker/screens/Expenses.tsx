import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function Expenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={expensesCtx.expenses}
        expensesPeriod="All Time"
        fallBackText="No Expenses Yet"
      />
    </View>
  );
}

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1, //imp since otherwise flatlist will not work
    //will still work on web , but not on android
  },
});
