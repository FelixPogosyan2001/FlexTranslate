import React,{ Fragment, useContext } from 'react';
import { FlatList,Text,StyleSheet } from 'react-native';
import ContextLans from '../context/ProviderLans';
import { Card } from './Card';
import Panel from './Panel';

export default (props) => {
    const {savedItems} = useContext(ContextLans);

    return (
        <Fragment>
            <Text style={styles.txtCollection}>Collection: {savedItems.length} entries</Text>
            <FlatList 
                style={{paddingTop:50}}
                data={savedItems}
                keyExtractor={(_el,index) => index.toString()}
                renderItem={({item}) => <Card text={item} />} />
            <Panel screen={props.navigation.navigate}/>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    txtCollection: {
        fontFamily:'Montserrat-Medium',
        fontSize:22,
        textAlign: 'left',
        paddingHorizontal: 10,
        paddingTop: 20
    }
})