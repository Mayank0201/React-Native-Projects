import { ReactNode } from "react"
import { Text, StyleSheet, Platform } from "react-native"

type Props = {
    children: ReactNode
}
function Title({ children }: Props) {
    return <Text style={styles.title}>{children}</Text>
}

export default Title;

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        //borderWidth: Platform.OS==='android' ? 3 : 2,
        //or
        borderWidth: Platform.select({ 'ios': 2, 'android': 3 }),
        borderColor: 'white',
        borderRadius: 12,           // rounded border
        paddingVertical: 12,
        paddingHorizontal: 24,
        fontSize: 30,
        textAlign: 'center',        // center text
        marginVertical: 24,
        width: 200,
        maxWidth: "80%" //dynamically set it
        //80 percent of the parent container
    }
});