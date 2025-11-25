import {
  Text,
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

// props for input component
type InputProps = {
  label: string; // label text
  textInputConfig?: TextInputProps; // config for TextInput (keyboardType, onChangeText, value etc)
  vStyle?: ViewStyle; // additional style for container
  invalid?: boolean; // whether this input is invalid
};

function Input({
  label,
  textInputConfig,
  vStyle,
  invalid = false,
}: InputProps) {
  // inputStyles stores styles for the TextInput
  // start with base input style
  const inputStyles: StyleProp<TextStyle>[] = [styles.input];

  // if multiline, apply extra styles
  if (textInputConfig?.multiline) {
    inputStyles.push(styles.inputMultiline);
  } else {
    inputStyles.push(styles.inputSingleLine); // ensure row inputs are consistent height
  }

  // if invalid, apply invalid style (red border or background)
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, vStyle]}>
      {/* label for input, can also be highlighted if invalid */}
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>

      {/* actual text input */}
      <TextInput
        style={inputStyles} // apply combined styles
        placeholderTextColor={GlobalStyles.colors.primary200} // make placeholder visible
        {...textInputConfig} // spread all other TextInput props
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    flex: 1, // allows row inputs to share space
  },
  label: {
    fontSize: 14,
    color: "white",
    marginBottom: 4,
    fontWeight: "bold",
    flexShrink: 0, // ensures label is visible in row
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary500,
    color: "white",
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
  },
  inputSingleLine: {
    minHeight: 48, // ensures single-line inputs in rows have similar height
    textAlignVertical: "center", // center text for single-line
  },
  inputMultiline: {
    minHeight: 80, // taller box for multiline input
    textAlignVertical: "top", // align text to top
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.error500,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
});
