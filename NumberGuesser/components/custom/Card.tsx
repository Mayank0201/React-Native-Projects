import { ReactNode } from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import Colors from "../../utils/colors"

type Props = {
    children: ReactNode
    style: ViewStyle
}

function Card({ children, style }: Props) {
    return <View style={[styles.inputContainer, style]}>{children}</View>
}

export default Card

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 24,             // Increased padding
        marginHorizontal: 24,
        marginTop: 60,
        backgroundColor: "#f5f5f5",
        borderRadius: 16,
        elevation: 4,             //android only property
        //to add shadow in ios , we can use the four props given (radius,offset...) to create a shadow for ios box
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,

    },
})

