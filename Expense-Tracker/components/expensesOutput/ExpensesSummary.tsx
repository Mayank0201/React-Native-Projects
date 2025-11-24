import { View, Text, StyleSheet } from "react-native";
import { Expense } from "../../data/expenses";
import { GlobalStyles } from "../../constants/styles";

type SummaryProps = {
  expenses: Expense[];
  periodDate: string;
};

function ExpensesSummary({ periodDate, expenses }: SummaryProps) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  //0 basically says to ts that sum is number since default val is 0
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodDate}</Text>
      <Text style={styles.sum}>₹{expensesSum.toFixed(2)}</Text>
    </View>
  );
}
export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 10,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontWeight: "bold",
    fontSize: 12,
    color: GlobalStyles.colors.primary500,
  },
});
