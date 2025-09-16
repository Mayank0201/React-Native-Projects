import { ReactNode } from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import Colors from "../../utils/colors";
type Props = {
    children: ReactNode
    style: TextStyle | TextStyle[]//need to leave a line
}
//can also do ViewStyle
//cascading styles , can have multiple styles
function Instruction({ children, style }: Props) {
    return <Text style={[styles.boxText, style]}>{children}</Text>


}

export default Instruction

const styles = StyleSheet.create({
    boxText: {
        color: Colors.primary1,
        fontSize: 20,
        textAlign: 'center',       // center instructions
        lineHeight: 28,            // improve readability
        marginBottom: 12,          // padding below text
    }
});