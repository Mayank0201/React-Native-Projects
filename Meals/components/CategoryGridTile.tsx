import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
//import { useNavigation } from "@react-navigation/native";to directly give a hook from gridtile

type CategoryProp = {
  title: string;
  color: string;
  onPress(): void;
};

//this works too title:string,color:string
function CategoryGridTile({ title, color, onPress }: CategoryProp) {
  //const navigation=useNavigation()
  return (
    // Outer container with elevation and background color
    <View style={[styles.gridItem, { backgroundColor: color }]}>
      {/* ✅ Pressable changes style when pressed */}
      <Pressable
        android_ripple={{ color: "#ccc", borderless: false }}
        style={({ pressed }) => [
          styles.buttonStyle,
          pressed && styles.buttonPressed, // ✅ apply this style only when pressed
        ]}
        onPress={onPress}
      >
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 12,
    height: 100,
    borderRadius: 8,
    elevation: 3,
    //shadow color opacity offset radius to create elevation for ios and add background color
    overflow: Platform.OS === "android" ? "visible" : "visible",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    flex: 1,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    // normal style
  },
  buttonPressed: {
    opacity: 0.6, // ✅ simple visual feedback
    // you can also change backgroundColor or other styles
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    //fontFamily:'Times New Roman'
  },
});

export default CategoryGridTile;
