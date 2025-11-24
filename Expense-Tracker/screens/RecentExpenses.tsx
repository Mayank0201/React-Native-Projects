import { View, StyleSheet } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import { CheckRecent } from "../util/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const today = new Date();
  const date7DaysAgo = CheckRecent(today, 7);

  const recentExpenses = expensesCtx.expenses.filter(
    (expense) => expense.date >= date7DaysAgo // include the date exactly 7 days ago
  );

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 days"
        fallBackText="No expenses in the last 7 days"
      />
    </View>
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
