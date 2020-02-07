import React,{ useState,useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet,View,Modal,AsyncStorage,SafeAreaView } from 'react-native';
import { InitialTemplate } from './src/components/InitialTemplate'
import ContextLans from './src/context/ProviderLans';
import { Home } from './src/components/Home';
import Favorite from './src/components/Favorite';
import Education from './src/components/Education';

const Navigator = createStackNavigator(
  {
    Home: { screen: Home },
    Favorite: { screen: Favorite },
    Education: { screen: Education }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#080793'
      },
      headerTitle: 'FlexTranslate',
      headerShown: true,
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'Montserrat-Medium'
      },
      headerLeftContainerStyle: {
        display: 'none' 
      }
    }
});

const AppContainer = createAppContainer(Navigator);

const App = (props) => {
  const [started,setStart] = useState(false);
  const [savedItems,updateItems] = useState([]);
  const [lans,setLans] = useState([{key: 'en',value: 'English'},{key: 'ru',value: 'Russian'}]);

  useEffect(() => {
    (async () => {
      let result = await AsyncStorage.getItem('collection');
      let isLogged = await AsyncStorage.getItem('start');

      if (result !== null) updateItems(JSON.parse(result));
      if (!JSON.parse(isLogged)) AsyncStorage.setItem('start',JSON.stringify(true))
      else if (JSON.parse(isLogged)) setStart(true);
    })()
  },[]);

  useEffect(() => {
    if (savedItems.length > 0) {
      AsyncStorage.setItem('collection',JSON.stringify(savedItems));
    }
  },[savedItems]);

  return (
    <SafeAreaView style={styles.container}>
      {started ? (
        <ContextLans.Provider value={{lans,setLans,savedItems,updateItems}}>
            <Modal visible={started} animationType='slide'>
                  <AppContainer />
            </Modal>
        </ContextLans.Provider>
      ): <InitialTemplate setStart={setStart} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf9fe'
  },
  textarea: {
    width: '100%',
    height: 150,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1, 
    borderColor: '#9c16db',
    position: 'relative',
    top: 85,
    paddingHorizontal: 5,
    backgroundColor: 'white'
  }
});

export default App;

