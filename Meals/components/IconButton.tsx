import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
//npx expo install @expo/vector-icons and also add into dependencies "@expo/vector-icons": "^13.0.0",

type IconButtonProps = {
  icon: any;
  color: string;
  onPress: () => void;
};

function IconButton({ icon, color, onPress }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      {/* applies styles.pressed only when the button is being pressed (touch feedback). */}
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
