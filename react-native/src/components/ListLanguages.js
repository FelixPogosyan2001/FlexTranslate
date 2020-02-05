import React, { useContext,useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Modal,
    FlatList,
    SafeAreaView,
    TextInput 
} from 'react-native';
import lans from '../languages';
import ContextLans from '../context/ProviderLans';
import Icon from 'react-native-vector-icons/FontAwesome';
import Empty from './Empty';

export const ListLanguages = ({setModalList,selected}) => {
    const options = useContext(ContextLans);
    const [listLans,setList] = useState(lans);
    const [empty,changeEmpty] = useState(false);
    const obj = Object.setPrototypeOf({},{
        clear(){
            for (let key in this){
                delete this[key]
            }
        }
    });
    const newList = new Proxy(obj,{ 
        get(target,prop){
            if (prop == 'length') {
                return Object.entries(target).length;
            } else {
                return target[prop];
            }
        }
    });

    const changeLan = ([key,value]) => {
        let updatedLans = [...options.lans];
        updatedLans[selected] = { key,value }
        options.setLans(updatedLans);
        setModalList(false);
    }
    
    const findLanguage = (txt) => {
        if (txt.trim().length == 0) setList(lans);
        if (newList.length) newList.clear();
        
        for (let key in lans) {
            if (lans[key].slice(0,txt.length) == txt) {
                newList[key] = lans[key];
            }
        }
        
        if (newList.length > 0) {
            setList(newList);
            changeEmpty(false);
        } else {
            changeEmpty(true)
        }
    }

    return(
        <Modal visible={true} animationType='fade'>
            <SafeAreaView style={{flex: 1}}>
                <Text onPress={() => setModalList(false)} style={styles.close}>X</Text>
                <View style={styles.containerSearch}>
                    <Icon name='search' style={{color:'white',fontSize: 20,marginVertical: 8,marginRight: 9}} />
                    <TextInput 
                        placeholder='Enter language'
                        onChangeText={(text) => findLanguage(text)}
                        autoCapitalize='sentences'
                        style={styles.inputSearch} />
                </View>
                {empty ? <Empty title='This language is not listed' /> : 
                <FlatList 
                    data={Object.entries(listLans)}
                    keyExtractor={(el,index) => index.toString()}
                    renderItem={({item}) => (
                        <View style={styles.listItem}>
                            <Text onPress={() => changeLan(item)} style={styles.language}>{item[1]}</Text>
                        </View>
                )} />}
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#fff',
        borderBottomColor: 'rgba(225, 225, 225,0.8)',
        borderBottomWidth: 2,
        padding: 18
    },
    language: {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
    },
    close: {
        color:'black',
        zIndex: 4,
        fontSize: 20,
        alignSelf: 'flex-end',
        marginRight: 10
    },
    inputSearch: {
        borderColor: 'black',
        borderWidth: 2,
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 5
    },
    containerSearch: {
        backgroundColor: '#2a2a2a',
        flexDirection: 'row',
        paddingLeft: 10,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 3,
        overflow: 'hidden'
    }
})