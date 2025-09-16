import { StyleSheet, Text, View } from "react-native"
import Colors from "../../utils/colors"

type Props = {
    rounds: number,
    guess: number
}

function Guesses({ rounds, guess }: Props) {
    return (
        <View>
            <Text style={styles.item}>#{rounds} Opponent's guess: {guess}</Text>
        </View>
    )
}

export default Guesses

const styles = StyleSheet.create({
    item: {
        borderColor: Colors.primary2,
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 8,
        padding: 8,
        backgroundColor: Colors.primary1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 4,
        width: '100%',
        fontFamily: 'open-sans'
    }
})