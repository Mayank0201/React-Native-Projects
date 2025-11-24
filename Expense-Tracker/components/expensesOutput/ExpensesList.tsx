import { FlatList, Text } from "react-native";
import { Expense } from "../../data/expenses";
import ExpenseItem from "./ExpenseItem";

type ListProp = {
  expenses: Expense[];
};

function renderExpenseItem({ item }: { item: Expense }) {
  return (
    <ExpenseItem
      id={item.id}
      amount={item.amount}
      description={item.description}
      date={item.date}
    />
  );
}

function ExpensesList({ expenses }: ListProp) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default ExpensesList;
