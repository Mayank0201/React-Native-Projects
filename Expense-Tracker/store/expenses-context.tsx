import { createContext, ReactNode, useReducer } from "react";
import { Expense } from "../data/expenses";
import { dummyExpenses } from "../data/dummy";

// types for state and actions
type ExpensesState = Expense[];

type ExpensesAction =
  | { type: "ADD"; payload: Omit<Expense, "id"> } // payload for add doesn't require id
  | { type: "UPDATE"; payload: Expense }
  | { type: "DELETE"; payload: { id: string } };

// type for new expense (without id)
type NewExpense = Omit<Expense, "id">;

// type for context object
type ExpensesContextType = {
  expenses: ExpensesState;
  addExpense: (expense: NewExpense) => void; // add doesn't require id
  updateExpense: (expense: Expense) => void; // update requires full expense with id
  deleteExpense: (id: string) => void;
};

// type for provider props
type ProviderProps = {
  children: ReactNode;
};

// create context with default empty values
export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
});

// reducer function handles add, update, delete actions
function expensesReducer(
  state: ExpensesState,
  action: ExpensesAction
): ExpensesState {
  switch (action.type) {
    case "ADD":
      // auto-generate id for new expense
      const id = (Date.now() + Math.floor(Math.random() * 1000)).toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}

// initial expenses from dummy data
let expenses = dummyExpenses;

// provider component wraps app and provides context
function ExpenseContextProvider({ children }: ProviderProps) {
  const [expensesState, dispatch] = useReducer(expensesReducer, expenses);

  // adds a new expense, id will be auto-generated in reducer
  function addExpense(expense: NewExpense) {
    dispatch({ type: "ADD", payload: expense });
  }

  // updates an existing expense
  function updateExpense(expense: Expense) {
    dispatch({ type: "UPDATE", payload: expense });
  }

  // deletes an expense by id
  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: { id } });
  }

  // context value to provide
  const value: ExpensesContextType = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpenseContextProvider;
