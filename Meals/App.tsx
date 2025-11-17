import "react-native-gesture-handler";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import CategoryScreen from "./screens/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//can also use normal stack rather than native-stack
//but native-stack uses the native platform elements for animations , therefore it is more performant as stack tries to emulate
//such behaviour but if any issues with native-stack , we can easily fall back to @react-navigation/stack
import MealsOverview from "./screens/MealsOverview";
import MealDetailScreen from "./screens/MealDetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoritesScreen from "./screens/FavoritesScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// ---------------------------
// Drawer Navigator
// ---------------------------
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true, // show header so hamburger menu appears
        drawerPosition: "left",
        drawerType: "front",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoryScreen}
        options={{ title: "All Categories" }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Your Favorites" }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        {/*Adds a safe pad between top of screen */}
        {/*Also Stack navigator has its own bg all that , so basic white for name which is like a title and component which is our tiles */}
        <Stack.Navigator
          initialRouteName="Drawer"
          screenOptions={{
            headerStyle: { backgroundColor: "#da9c9cff" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#ffaaaa" },
          }}
        >
          {/* we can do initial route or we can just do the stack part And also for the options , the parameter is options={{}} for Stack.screen and screenOptions inside Navigator does it for all the screens inside it */}
          {/* FIXED: Drawer is first screen, headerShown handled inside Drawer */}
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{ headerShown: false }} // hide stack header so drawer header shows
          />

          <Stack.Screen
            name="Meal Categories"
            component={CategoryScreen}
            options={{
              title: "All Categories",
            }}
          />
          {/* check docs for all this and also {{}} means it takes an obj*/}
          <Stack.Screen
            name="Meals Overview"
            component={MealsOverview}
            /* options={({route,navigation})=>{
          const categoryId = (route.params as any)?.categoryId; // ✅ cast to any 
          return {
            title:categoryId
          };
        }} one method of doing this ; another method is to use navigation in the main mealsoverviewscreen*/
          />
          <Stack.Screen
            name="Meal Detail"
            component={MealDetailScreen}
            /* options={{
              //headerRight and the other header take a component only
              headerRight: () => {
                return <Button title="Press me"/>;
              },
            }} */
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeb2b2ff",
    alignItems: "center",
    justifyContent: "center",
  },
});
