import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

export const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>FlexTranslate </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: '#9c16db',
        paddingTop: 25,
        zIndex: 0
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: "600"
    }
})