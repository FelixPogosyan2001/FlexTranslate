import React,{useEffect,useState} from 'react';
import { View,Text,StyleSheet,ScrollView,Dimensions,Image,Button } from 'react-native';
import * as Font from 'expo-font';
import firstIcon from '../../assets/translating.png';
import secondIcon from '../../assets/smartphone.png';

export const InitialTemplate = ({setStart}) => {
    const [fontLoaded,setFont] = useState(false);

    useEffect(() => {
        Font.loadAsync({
            'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf')
        }).then(res => {
            setFont(true);
        })
    },[])

    return (
         <ScrollView horizontal={true} pagingEnabled={true}>
                <View style={styles.page}>
                    <Image style={styles.icon} source={firstIcon} />
                    {fontLoaded && <Text style={styles.info}>
                        Welcome to the FlexTranslate! 
                        This is an application that helps you translate any unfamiliar words to you, also whole sentences.
                    </Text>}
                </View>
                <View style={styles.page}>
                    <Image source={secondIcon} style={styles.icon} />
                    {fontLoaded && <Text style={styles.info}>
                        FlexTranslate differs from all other translators in that it also allows
                        you to build grammatically correct sentences.
                    </Text>}
                    <Button onPress={() => setStart(true)} color='#9c16db' title='Start' />
                </View>
         </ScrollView>
    )
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fdf9fe',
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 30,
        marginVertical: 30,
        color: '#190622',
        paddingHorizontal: 16
    },
    icon: {
        width: 128,
        height: 128
    }
})
