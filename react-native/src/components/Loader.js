import React from 'react';
import { StyleSheet,ActivityIndicator,Dimensions } from 'react-native';

export default ({exist}) => {
    return (
        <ActivityIndicator 
            style={styles.loader} 
            size='large' 
            color='#080793' 
            animating={exist} />
    )
}

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        top: Dimensions.get('window').height / 2 - 50,
        left: '45%',
        right: '45%'
    }
})