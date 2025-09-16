import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native"
import PrimaryButton from "../components/custom/PrimaryButton"
import { useState } from "react"
import Colors from "../utils/colors"
import Title from "../components/custom/Title"
import Card from "../components/custom/Card"
import Instruction from "../components/custom/InstructionText"
//check docs for keyboard types which ar e exclusive for each os
//auto-capitalize prop also exists along with autocorrect

type SwitchProp = {
    onClicked: (num: number) => void
}

function StartScreen({ onClicked }: SwitchProp) {
    const [number, setNumber] = useState("");

    function numberInputHandler(num: string) {
        setNumber(num);
    }

    const { width, height } = useWindowDimensions();
    //after rotation, the function gets called again and updates accordingly
    //this is a react hook
    //dimensions not always best practice as they only get executed once 
    //so we can use useWindowDimensions

    function confirmHandler() {
        const chosenNumber = parseInt(number);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            //if not a number
            //not a component but is an object to show an alert
            Alert.alert(
                "Invalid Number",
                "Number has to be a number between 1 and 99.",
                [{ text: "Okay", style: "destructive", onPress: resetHandler }]
            );
            return;
        }
        onClicked(chosenNumber); // if num valid, this will be called
    }

    function resetHandler() {
        setNumber("");
    }

    const marginTopD = height < 400 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <View style={[styles.rootContainer, { marginTop: marginTopD }]}>
                    <Title>Guess my number</Title>

                    {/* card container */}
                    <Card style={styles.card}>
                        <Instruction style={[styles.iStyle, { marginTop: 8 }]}>
                            Enter a number
                        </Instruction>

                        <TextInput
                            style={styles.numInput}
                            maxLength={2}
                            keyboardType="number-pad"
                            value={number}
                            onChangeText={numberInputHandler}
                        />

                        {/* buttons container */}
                        <View style={styles.buttonsContainer}>
                            <PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
                            <PrimaryButton onPress={confirmHandler}>Guess</PrimaryButton>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default StartScreen;

// styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        paddingHorizontal: 16, // horizontal padding for better spacing
        alignItems: "center", // center everything horizontally
    },
    card: {
        width: "100%",
        maxWidth: 400,
        alignItems: "center",
        padding: 20,
        borderRadius: 12,
        backgroundColor: "white",
        elevation: 8, // Android shadow
        shadowColor: "black", // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        marginVertical: 16,
    },
    numInput: {
        height: 60,
        width: 60,
        fontSize: 24,
        paddingBottom: 8,
        borderBottomColor: Colors.primary1,
        borderBottomWidth: 3,
        color: Colors.primary1,
        marginVertical: 12,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "transparent",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
    },
    iStyle: {
        marginBottom: 12,
    },
});