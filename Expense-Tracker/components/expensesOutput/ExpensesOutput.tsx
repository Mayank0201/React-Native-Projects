import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../data/expenses";
import { dummyExpenses } from "../../data/dummy";
import { GlobalStyles } from "../../constants/styles";

type ExpensesProp = {
  expenses?: Expense[];
  expensesPeriod: string;
  fallBackText: string;
};

function ExpensesOutput({
  expenses = dummyExpenses,
  expensesPeriod,
  fallBackText,
}: ExpensesProp) {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;
  if (expenses.length > 0) {
    return (
      <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodDate={expensesPeriod} />
        <ExpensesList expenses={expenses} />
      </View>
    );
  } else {
    return <View style={styles.container}>{content}</View>;
  }
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
