import { Text, View, StyleSheet, Dimensions } from "react-native";
import { ReactNode } from "react";
import Colors from "../../utils/colors";

type Props = {
    children: ReactNode
}

function NumberContainer(prop: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{prop.children}</Text>
        </View>
    )
}

export default NumberContainer;

const deviceDimen = Dimensions.get('window')
//no diff in ios for window and screen whereas in android , screen in android gives the width and height of the entire screen including the status bar
//while window excludes the width and heigth of the status bar
const deviceW = deviceDimen.width
const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: 'white',
        backgroundColor: Colors.primary1,   // make number container distinct
        padding: deviceW < 450 ? 12 : 24, //give 12 padding else 24
        borderRadius: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',              // shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,                     // shadow for Android
    },
    numberText: {
        color: 'white',
        fontSize: 36,
        fontFamily: 'open-sans-bold',
    }
});