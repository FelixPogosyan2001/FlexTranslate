import React, { useContext,useState,useEffect } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContextLans from '../context/ProviderLans';

export const Card = ({text}) => {
    const {savedItems,updateItems} = useContext(ContextLans);
    const [isActive,setMode] = useState(false);

    useEffect(() => {
        if (savedItems.includes(text)) {
            setMode(true);
        }
    },[]);

    const addToFavorite = () => {
        if (!savedItems.includes(text)) {
            updateItems([...savedItems,text]);
            setMode(true);
        } else {
            let newItems = [...savedItems];
            newItems.splice(savedItems.indexOf(text),1)
            updateItems(newItems);
            setMode(false);
        }
    }

    return (
        <View style={styles.li}>
             <Text style={styles.translatedText}>{text}</Text>
             <Icon onPress={() => addToFavorite()} name="star" style={{fontSize: 20,color: isActive ? '#e4e400' : 'black'}} />
        </View>
    )
}

const styles = StyleSheet.create({
    li: {
        backgroundColor: 'white',
        height: 60,
        width: '80%',
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOpacity: 0.4,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 10,
        borderColor: 'silver',
        borderBottomWidth: 1,
        marginBottom: 16,
        flexDirection: 'row'
    },
    translatedText: {
        fontWeight: 'bold'
    }
})