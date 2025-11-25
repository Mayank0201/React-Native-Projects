import { StyleSheet, View, Text, Alert, Platform } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../../ui/Button";
import { Expense } from "../../data/expenses";
import { FormattedDate } from "../../util/date";

// type for new expense without id
type NewExpense = Omit<Expense, "id">;

type ExpenseProps = {
  onCancel: () => void;
  onSubmit: (expense: NewExpense) => void;
  submitButtonLabel: string;
  defaultValues?: NewExpense; // optional default values for editing
};

function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}: ExpenseProps) {
  type InputIdentifiers = "amount" | "description" | "date";

  type InputField = {
    value: string;
    isValid: boolean;
  };

  type InputsState = {
    amount: InputField;
    description: InputField;
    date: InputField;
  };

  const [inputs, setInputs] = useState<InputsState>({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: !!defaultValues,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: !!defaultValues,
    },
    date: {
      value: defaultValues ? FormattedDate(defaultValues.date) : "",
      isValid: !!defaultValues,
    },
  });

  function inputChangeHandler(
    identifier: InputIdentifiers,
    enteredValue: string
  ) {
    setInputs((curState) => ({
      ...curState,
      [identifier]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData: NewExpense = {
      amount: +inputs.amount.value,
      description: inputs.description.value,
      date: new Date(inputs.date.value),
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDescValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescValid) {
      setInputs((curInputs) => ({
        amount: { value: curInputs.amount.value, isValid: isAmountValid },
        date: { value: curInputs.date.value, isValid: isDateValid },
        description: {
          value: curInputs.description.value,
          isValid: isDescValid,
        },
      }));

      if (Platform.OS === "web") {
        alert("Invalid input \nPlease check your input values");
      } else {
        Alert.alert("Invalid input", "Please check your input values");
      }
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Your Expense</Text>

      {/* Row inputs */}
      <View style={styles.inputsRow}>
        <Input
          vStyle={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(null, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          vStyle={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(null, "date"),
            value: inputs.date.value,
          }}
        />
      </View>

      {/* Description */}
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          autoCorrect: true,
          autoCapitalize: "sentences",
          multiline: true,
          numberOfLines: 5,
          onChangeText: inputChangeHandler.bind(null, "description"),
          value: inputs.description.value,
        }}
        vStyle={styles.descriptionInput}
      />

      {/* Error text */}
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values, please check your entered data.
        </Text>
      )}

      {/* Buttons at bottom */}
      <View style={styles.buttons}>
        <Button vStyle={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button vStyle={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1, // full height
    justifyContent: "flex-start",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "white",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rowInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  descriptionInput: {
    marginBottom: 4, // reduced spacing before error text
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 4, // smaller spacing
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "auto", // push buttons to bottom
    paddingVertical: 12,
  },
  button: {
    minWidth: 120,
  },
});
