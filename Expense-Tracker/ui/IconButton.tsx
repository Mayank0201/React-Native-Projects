import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type IconProps = {
  name: any;
  size: number;
  color?: string;
  onPress: () => void;
};

function IconButton({ ...props }: IconProps) {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={props.name} size={props.size} color={props.color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
