import { View, Image, Text, StyleSheet, ImageBackground, useWindowDimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Title from "../components/custom/Title";
import Colors from "../utils/colors";
import PrimaryButton from "../components/custom/PrimaryButton";

type Props = {
    roundNum: number;
    Number: number;
    onGameRestart: () => void;
};

function GameOver(props: Props) {
    // get device width and height
    const { width, height } = useWindowDimensions();

    // default image size
    let imageSize = 300;

    // adjust image size for smaller devices
    if (width < 400) {
        imageSize = 150;
    }
    if (height < 400) {
        imageSize = 80;
    }

    // style for the circular image container
    const imageStyle = {
        height: imageSize,
        width: imageSize,
        borderRadius: imageSize / 2,
    };

    return (
        <LinearGradient colors={[Colors.primary2, Colors.primary1]} style={styles.screen}>
            {/* ScrollView allows scrolling on small screens */}
            <ScrollView
                contentContainerStyle={styles.scrollContainer} // center content
            >
                <ImageBackground
                    source={require("../assets/images/background.png")}
                    resizeMode="cover"
                    style={styles.imageBackground} // fill full area
                    imageStyle={{ opacity: 0.15 }} // background image opacity
                >
                    <View style={styles.container}>
                        <Title>Game Over</Title>

                        {/* success image container */}
                        <View style={[styles.imgContainer, imageStyle]}>
                            <Image
                                style={styles.img}
                                source={require("../assets/images/success.png")} // make sure path & name are correct
                            />
                        </View>

                        {/* nested text style */}
                        <Text style={styles.summaryText}>
                            Your phone needed
                            <Text style={styles.summaryNum}> {props.roundNum} </Text> rounds to get the number
                            <Text style={styles.summaryNum}> {props.Number}</Text>
                        </Text>

                        <PrimaryButton onPress={props.onGameRestart}>Play Again</PrimaryButton>
                    </View>
                </ImageBackground>
            </ScrollView>
        </LinearGradient>
    );
}

export default GameOver;

// styles
const styles = StyleSheet.create({
    screen: {
        flex: 1, // fill screen
    },
    scrollContainer: {
        flexGrow: 1, // ensures ScrollView fills screen
        justifyContent: "center", // center content vertically
        alignItems: "center", // center content horizontally
    },
    imageBackground: {
        flex: 1, // keep full screen height
        width: "100%",
    },
    container: {
        width: "100%", // fill horizontal space
        alignItems: "center", // center content horizontally
        padding: 24,
    },
    imgContainer: {
        borderWidth: 3,
        borderColor: Colors.primary2,
        overflow: "hidden",
        marginVertical: 36,
        justifyContent: "center", // center the image inside container
        alignItems: "center", // center the image inside container
    },
    img: {
        height: "100%", // fill container
        width: "100%", // fill container
        resizeMode: "cover", // ensure image scales correctly
    },
    summaryText: {
        fontFamily: "open-sans-bold",
        fontSize: 24,
        padding: 12,
        textAlign: "center",
    },
    summaryNum: {
        fontWeight: "300",
        color: Colors.primary2,
    },
});