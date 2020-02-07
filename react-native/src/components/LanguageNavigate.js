import React,{Fragment,useState, useContext} from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { ListLanguages } from './ListLanguages'
import ContextLans from '../context/ProviderLans';
import Icon from 'react-native-vector-icons/MaterialIcons'

const LanguageNavigate = (props) => {
    const [modalLans,setModalList] = useState(false);
    const [selected,select] = useState(null);
    const {lans,setLans} = useContext(ContextLans);

    const handlerPress = (num) => {
        select(num);
        setModalList(true);
    }

    return (
        <View style={styles.nav} >
            {modalLans ? <ListLanguages selected={selected} setModalList={setModalList}/> :  
            <Fragment>
                <Text onPress={() => handlerPress(0)} style={styles.lan}>{lans[0].value}</Text>
                <Icon name='compare-arrows' onPress={() => setLans([...lans.reverse()])} style={styles.swc}/>
                <Text onPress={() => handlerPress(1)} style={styles.lan}>{lans[1].value}</Text>
            </Fragment>}
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: 'white',
        width: '100%',
        height: 35,
        flexDirection: 'row'
    },
    lan: {
        flex: 2,
        backgroundColor: '#930776',
        textAlign: 'center',
        paddingVertical: 8,
        color: '#070689',
        fontFamily: 'Montserrat-Medium',
        fontWeight: '700',
        fontSize: 15,
        color: 'white'
    },
    swc: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: '#3e9307',
        color: 'white',
        fontSize: 30,
        paddingVertical: 3
    }
})

export default LanguageNavigate;