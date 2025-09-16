import { Text, View, StyleSheet, Alert, FlatList, ImageBackground, useWindowDimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Title from "../components/custom/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/custom/PrimaryButton";
import Colors from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import Guesses from "../components/game/Guesses";
import Instruction from "../components/custom/InstructionText";
//firstly npx expo install @expo/vector-icons

function generateRandomBetween(min: number, max: number, exclude: number) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude); //if rndNum is equal to exclude at the start , again generate
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

type Props = {
    userNum: number;
    onGameOver: (rounds: number) => void;
};

function GameScreen({ userNum, onGameOver }: Props) {
    const initialGuess = generateRandomBetween(1, 100, userNum); //hardcode 1 and 100 this is done so that it doesnt get executed before useEffect
    const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
    const [guessRounds, setGuessRounds] = useState([0]);
    const { width, height } = useWindowDimensions()

    useEffect(() => {
        if (currentGuess === userNum) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNum, onGameOver]); //this efffect triggered if any of these values change

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(direction: string) {
        if (
            (direction === "down" && currentGuess < userNum) ||
            (direction === "up" && currentGuess > userNum)
        ) {
            Alert.alert("Wrong", "Try again", [{ text: "Choose the other option", style: "cancel" }]);
            return;
        } else if (direction === "up") {
            minBoundary = currentGuess + 1;
        } else {
            maxBoundary = currentGuess;
        }
        const newNum = generateRandomBetween(minBoundary, maxBoundary, 0);
        setCurrentGuess(newNum);
        setGuessRounds((prevGuessRounds) => [newNum, ...prevGuessRounds]);
    }

    const roundNumbers = guessRounds.length;

    let content =
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Text style={styles.textLabel}>Higher or Lower</Text>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={() => nextGuessHandler("up")}>
                    <Ionicons name="add" size={24} color="white" />
                </PrimaryButton>
                <PrimaryButton onPress={() => nextGuessHandler("down")}>
                    <Ionicons name="remove" size={24} color="white" />
                </PrimaryButton>
            </View>

        </>

    if (width > 500) {
        content =
            <>
                <Instruction style={styles.instruction}>Higher or Lower</Instruction>
                <View style={styles.buttonContainersWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler("up")}>
                            <Ionicons name="add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler("down")}>
                            <Ionicons name="remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </>
    }

    return (
        <LinearGradient colors={[Colors.primary2, Colors.primary1]} style={styles.gradient}>
            <ImageBackground
                source={require("../assets/images/background.png")}
                resizeMode="cover"
                style={styles.imageBackground}
                imageStyle={{ opacity: 0.15 }} // subtle background image opacity
            >
                <View style={styles.screen}>
                    <Title>Opponent's Guess</Title>
                    {content}
                    <View style={styles.listContainer}>
                        {/* {guessRounds.map((guessRound, index) => (<Text key={index}>{guessRound}</Text>))} */}
                        <FlatList
                            data={guessRounds}
                            renderItem={(itemData) => (
                                <Guesses rounds={roundNumbers} guess={itemData.item} />
                            )}
                        />
                    </View>
                </View>
            </ImageBackground>
        </LinearGradient>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
    },
    screen: {
        flex: 1,
        marginTop: 20,
        flexDirection: "column",
        alignItems: "center",
        padding: 24, // Added padding around to avoid edges
        backgroundColor: "transparent", // transparent so gradient shows through
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: 150,
        marginTop: 20,
    },
    textLabel: {
        fontSize: 18,
        color: Colors.primary1,
        marginTop: 10,
    },
    listContainer: {
        flex: 1,
        padding: 16
    },
    instruction: {
        fontWeight: "bold"
    },
    buttonContainersWide: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});