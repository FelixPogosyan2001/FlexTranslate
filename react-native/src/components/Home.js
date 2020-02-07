import React,{ Fragment,useContext,useState,useEffect } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    FlatList,
    AsyncStorage
} from 'react-native';
import Switch from './LanguageNavigate'
import {Card} from './Card';
import ContextLans from '../context/ProviderLans';
import Empty from './Empty';
import Panel from './Panel';
import Loader from './Loader';
import {Translation} from '../constructor-translate';

export const Home = (props) => {
    const [value,setValue] = useState('');
    const [addedItems,updateAddedItems] = useState([]);
    const [loading,changeLoading] = useState(false);
    const {lans} = useContext(ContextLans);
    
    useEffect(() => {
        (async () => {
            let result = await AsyncStorage.getItem('history');
            if (result !== null) updateAddedItems(JSON.parse(result));
        })()
    },[]);

    useEffect(() => {
        if (addedItems.length > 0) {
            AsyncStorage.setItem('history',JSON.stringify(addedItems));
        }
    },[addedItems]);

    const translateText = async () => {
        try {
            changeLoading(true);
            const response = await fetch(`https://f56ac03c.ngrok.io/translate`,{
              headers: { 'Content-Type': 'application/json' },
              method: 'POST',
              body: JSON.stringify({
                text: value,
                from: lans[0].key,
                to: lans[1].key
              })
            });
            const text = await response.text();
            const item = new Translation(value,text);
            changeLoading(false);
            updateAddedItems([...addedItems,item]);
            setValue('');
        } catch(e){
            throw new Error(e);
        }
    }

    return (
        <Fragment>
            <Switch />
            <TextInput 
                onChangeText={text => setValue(text)}
                autoCorrect={true} 
                autoCapitalize='sentences'
                placeholder='Enter a text'
                value={value} 
                style={styles.textarea} />
            <TouchableHighlight onPress={translateText}>
                <View style={styles.btn}>
                  <Text style={styles.btnTitle}>Translate</Text>
                </View>
            </TouchableHighlight>
            <Loader exist={loading} />
            {(!addedItems.length && !loading) && <Empty title='Not found' />}
            {!loading && <FlatList 
                style={styles.flatList}
                data={addedItems} 
                extraData={addedItems}
                keyExtractor={(_item,index) => index.toString()}
                renderItem={({item}) => <Card data={item} />}/>}
            <Panel screen={props.navigation.navigate}/>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    textarea: {
      width: '100%',
      height: 150,
      borderBottomWidth: 2,
      borderTopWidth: 2,
      borderLeftWidth: 1,
      borderRightWidth: 1, 
      borderColor: '#080793',
      paddingHorizontal: 10,
      backgroundColor: 'white',
      paddingBottom: 100,
      fontSize: 20
    },
    btn: {
        backgroundColor: '#080793',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 100,
        height: 35,
        alignItems: 'center',
        position: 'absolute',
        right: 0
    },
    btnTitle: {
        color:'white',
        fontFamily: 'Montserrat-Medium',
        fontWeight: 'bold'
    },
    flatList: {
        position:'relative',
        top:55,
        paddingVertical: 16
    }
  });
  