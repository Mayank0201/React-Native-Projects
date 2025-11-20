# Meals App – React Native (Expo)

A simple meals browsing app built with React Native, Expo, TypeScript, React Navigation, and Redux Toolkit.

---

## Setup and Running the Project

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd meals-app
Install dependencies


npm install
Start the project


npx expo start
If you encounter the Reanimated “worklet” issue, ensure your babel.config.js includes:


plugins: ["react-native-reanimated/plugin"]
Then clear Metro cache:


npx expo start -c
Wireless Debugging (Recommended)
Drawer navigation in Expo Go may stop responding on some devices.
Wireless debugging provides a stable connection.

Steps:

Enable Wireless Debugging in Developer Options.

Pair device:


adb pair <ip:port>
Connect:


adb connect <ip:port>
Navigation
The app uses:

Stack Navigator

Drawer Navigator

Nested navigation patterns

This enables smooth navigation from categories → meal lists → detailed meal screens.

Features
Browse meals by category

View ingredients and preparation steps

Mark and unmark meals as favorites

Favorites available directly from the drawer

Smooth screen transitions with React Navigation

State Management
The project uses both:

Context API

Redux Toolkit

Redux Toolkit felt more predictable and scalable, especially for managing favorites.
Context API was still useful but less convenient as the logic grew.

Additional Notes
Built using TypeScript and Expo.

Wireless debugging improves drawer gesture reliability on some devices.

React Native Reanimated requires proper plugin configuration for navigation animations.

Copy code
