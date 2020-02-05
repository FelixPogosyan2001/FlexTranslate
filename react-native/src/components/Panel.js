import React from 'react';
import { View,StyleSheet,Text,Dimensions } from 'react-native'
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

export default withNavigation((props) => {
    const {navigate,state} = props.navigation;
    const route = state.routeName; 
    
    return(
        <View style={styles.main}>
             <Icon name="home" onPress={() => navigate('Home')} style={{fontSize: 25,color: route == 'Home' ? '#080793' : 'silver'}} />
             <Icon name="star" onPress={() => navigate('Favorite')} style={{fontSize: 25,color: route == 'Favorite' ? '#080793' : 'silver'}} />
             <IconAwesome name="book" onPress={() => navigate('Education')} style={{fontSize: 25,color: route == 'Education' ? '#080793' : 'silver'}} />
        </View>
    )
})

const styles = StyleSheet.create({
    main: {
        height: 50,
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
})