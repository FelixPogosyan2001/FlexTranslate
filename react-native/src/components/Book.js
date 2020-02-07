import React,{ useEffect, useState } from 'react';
import { View,Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import { Verbose } from './Verbose';

export const Book = ({image,name,author,pages,desc,date}) => {
    const [correctlyName,setCorrect] = useState(null);
    const [moreInfo,setMoreInfo] = useState(false);

    useEffect(() => {
        if (name.length > 50) {
            setCorrect(name.slice(0,60) + ' ...');
        }
    })

    return (
        <View style={styles.bookItem}>
            <Image source={{uri: image}} style={styles.preview} />
            <View style={styles.info}>
                <Text style={{fontWeight: 'bold'}}>{correctlyName ? correctlyName : name}</Text>
                <Text style={{marginTop: 5,opacity: 0.6}}>{author}</Text>
            </View>
            <TouchableOpacity onPress={() => setMoreInfo(true)} style={styles.btnMore}>
                <Text style={styles.textBtn}>Learn More</Text>
            </TouchableOpacity>
            {moreInfo && <Verbose data={{image,author,pages,name,desc,date}} close={setMoreInfo} />}
        </View>
    )
}

const styles = StyleSheet.create({
    bookItem: {
        flexDirection: 'row',
        minHeight: 80,
        marginVertical: 16,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        paddingHorizontal: 8,
        paddingVertical: 8,
        width: '90%',
        alignSelf: 'center'
    },
    preview: {
        width: 60,
        height: '100%',
        alignSelf: 'center',
        marginRight: 10
    },
    info: {
        flex: 2,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    btnMore: {
        backgroundColor: '#080793',
        justifyContent: 'center',
        height: 35,
        paddingHorizontal: 8,
        borderRadius: 4,
        shadowColor: '#080793',
        shadowOpacity: 0.6,
        shadowRadius: 5,
        alignSelf: 'flex-end'
    },
    wrapped: {
        backgroundColor: '#080793',
        justifyContent: 'center',
        height: 35,
        paddingHorizontal: 8,
        borderRadius: 4,
        shadowColor: '#080793',
        shadowOpacity: 0.6,
        shadowRadius: 5
    },
    textBtn: {
        color: 'white',
        fontWeight: 'bold'
    }
});