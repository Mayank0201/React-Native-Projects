import { View, Text, Pressable, StyleSheet } from 'react-native'
import { ReactNode } from 'react';

type PrimaryButtonProps = {
    children: ReactNode;
    onPress: () => void
};

function PrimaryButton({ children, onPress }: PrimaryButtonProps) {
    return (
        <View style={styles.bOuterContainer}>
            <Pressable style={styles.bInnerContainer}
                android_ripple={{ color: '#73003aff' }}
                //for ios we hvae to custom do so using opacity and using && and use function along with styles
                onPress={onPress}>
                <Text style={styles.bText}>
                    {children}
                </Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    bOuterContainer: {
        borderRadius: 20,
        margin: 4,
        overflow: 'hidden'
    },
    bInnerContainer: {
        backgroundColor: '#f01080ff',
        paddingVertical: 10,
        paddingHorizontal: 50,
        elevation: 4,
    },
    bText: {
        color: 'white',
        textAlign: 'center'
    }
    //we created the inner and outer container since if we only have one container , it overflows outside the original pressable block
    //so we have to wrap in outside container and then use the overflow hidden so that it doesnt go outside the container and we 
    //can see the correct ripple effect
})