import React, { useContext,useState,useEffect } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContextLans from '../context/ProviderLans';

export const Card = ({data}) => {
    const {savedItems,updateItems} = useContext(ContextLans);
    const [isActive,setMode] = useState(false);

    useEffect(() => {
        if (savedItems.findIndex(el => el.id === data.id) != -1) {
            setMode(true);
        } else {
            setMode(false);
        }
    },[savedItems]);

    const addToFavorite = () => {
        let index = savedItems.findIndex(el => el.id === data.id);

        if (index == -1) {
            updateItems([...savedItems,data]);
        } else {
            let newItems = [...savedItems];
            newItems.splice(index,1)
            updateItems(newItems);
        } 
    }

    const split = (str) => {
        let short = null;

        if (str.length > 30) {
            short = `${str.slice(0,29)}...`;
            return short 
        } else {
            return str;
        }
    }

    return (
        <View style={styles.li}>
             <View style={{width:'90%'}}>
                <Text style={{fontWeight: 'bold'}}>{split(data.text)}</Text>
                <Text style={styles.translatedText}>{split(data.translatedText)}</Text>
             </View>
             <Icon onPress={() => addToFavorite()} name="star" style={{fontSize: 20,color: isActive ? '#e4e400' : 'black'}} />
        </View>
    )
}

const styles = StyleSheet.create({
    li: {
        backgroundColor: 'white',
        minHeight: 60,
        width: '80%',
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOpacity: 0.4,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: 'silver',
        borderBottomWidth: 1,
        marginBottom: 16,
        flexDirection: 'row'
    },
    translatedText: {
        color: '#737373',
        fontWeight: 'bold',
        marginTop: 5
    }
})