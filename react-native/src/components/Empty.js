import React from 'react';
import { View,Image,Dimensions,StyleSheet,Text } from 'react-native';
import NotFoundPhoto from '../../assets/not-found.png';

export default ({title}) => {
    return(
        <View style={styles.containerOf404}>
            <Image source={NotFoundPhoto} style={{width:37,height: 37}} />
            <Text style={styles.txt}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerOf404: {
        position: 'absolute',
        top: Dimensions.get('window').height / 2 ,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    txt: {
        fontSize: 25,
        marginHorizontal: 10
    }
})