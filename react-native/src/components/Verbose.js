import React from 'react';
import {Modal,Text, View,Image,ScrollView,StyleSheet,ImageBackground, Dimensions} from 'react-native';
import Pattern from '../../assets/pattern.jpg';

export const Verbose = ({data: {pages,image,desc,author,name,date},more,close}) => {
    return (
        <Modal visible={more} animationType='fade'>
            <View style={styles.area}>
                <Text onPress={() => close(false)} style={styles.close}>X</Text>
                <ImageBackground source={Pattern} imageStyle={{height:'100%'}} style={styles.main}>
                    <Image source={{uri: image}} style={styles.photo} />
                    <Text style={styles.txt}>{name}</Text>
                    <Text style={styles.anotherTxt}>{author}</Text>
                </ImageBackground>
                <View style={styles.basic}>
                    {
                        [{key: 'Page count',val: pages},{key: 'Published',val: date}]
                        .map(({key,val},i) => <Text style={styles.info} key={i}>{`${key}: ${val}`}</Text>)
                    }
                    <ScrollView>
                        <Text style={styles.info}>{desc}</Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    main: {
        height: '50%',
        justifyContent:'center',
        alignItems: 'center',
        position:'relative',
        bottom: 35
    },
    shadow: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        height: Dimensions.get('window').height / 2 - 10,
        width : Dimensions.get('window').width,
        position: 'absolute',
        top: 37,
        zIndex: 1
    },
    photo: {
        width: 100,
        height: 150
    },
    area: {
        flex:1
    },
    txt: {
        color: 'white',
        fontFamily: 'Montserrat-Medium',
        width: '80%',
        textAlign: 'center',
        marginVertical: 16
    },
    anotherTxt: {
        color: 'white',
        fontFamily: 'Montserrat-Medium'
    },
    close: {
        alignSelf: 'flex-end',
        marginRight: 10,
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
        zIndex: 10,
        position: 'relative',
        top: 18
    },
    basic: {
        minHeight: Dimensions.get('window').height / 2,
        backgroundColor: 'white',
        position: 'relative',
        bottom: 35
    },
    info: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        marginHorizontal: 16,
        marginTop: 16,
        width: '90%'
    }
});