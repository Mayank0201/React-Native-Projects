import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartScreen from './ui/StartScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameScreen from './ui/GameScreen';
import { StatusBar } from 'expo-status-bar'
import Colors from './utils/colors';
import GameOver from './ui/GameOver';
import { useFonts } from 'expo-font';
//npx expo install expo-font

import AppLoading from 'expo-app-loading';

//can change background color of the app using app.json but better inside this using a view as multiple screens
export default function App() {

  const [userNum, setUserNum] = useState<number | null>();
  const [isGameOver, setGameOver] = useState(false)
  const [guessNumber, setGuessNumber] = useState(0)


  //CHECK DOCS
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),

  })
  //download ttf and put inside assets/fonts

  if (!fontsLoaded) {
    return <AppLoading />
  }

  function numberHandler(pickedNumber: number) {
    setUserNum(pickedNumber)
    setGameOver(false)
  }


  function gameOverHandler(roundNum: number) {
    setGameOver(true)
    setGuessNumber(roundNum)
  }

  function startNewGameHandler() {
    setUserNum(null) //kept it null so it doesnt become truthy
    setGuessNumber(0)

  }

  let screen = <StartScreen onClicked={numberHandler} /> // it will set the number which will be checked by the function insude startscreen and action taken accordingly

  if (userNum) {
    screen = <GameScreen userNum={userNum} onGameOver={gameOverHandler} />
  }

  if (isGameOver && userNum) {
    screen = <GameOver roundNum={guessNumber} Number={userNum} onGameRestart={startNewGameHandler} />
  }


  return (
    <>
      <StatusBar style='light' />
      <LinearGradient colors={[Colors.primary2, Colors.primary1]} style={styles.container}>
        <ImageBackground source={require('./assets/images/background.png')} resizeMode='cover'
          style={styles.container}
          imageStyle={styles.bgImage}>
          <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
          {/* To get padding */}
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    opacity: 0.2
  }
});
