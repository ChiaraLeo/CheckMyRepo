import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import CheckRepoScreen from './screens/CheckRepoScreen';
import CheckUserScreen from './screens/CheckUserScreen';
import SuccessScreen from './screens/SuccessScreen';

import { RepoContextProvider } from './context/RepoContext';

const Stack = createStackNavigator();
const optionsScreen = { headerShown: false }

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false)
  const [user, setUser] = React.useState('user')
  const [repo, setRepo] = React.useState('repo')
  const [existRepoUser, setExistRepoUser] = React.useState('initial')
  const valueContext = { user, setUser, repo, setRepo, existRepoUser, setExistRepoUser }

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        await Font.loadAsync({
          ...Ionicons.font,
          'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <RepoContextProvider value={valueContext}>
        <View style={styles.container}>
          <NavigationContainer initialRouteName="Root">
            <Stack.Navigator>
              <Stack.Screen name="Root" options={optionsScreen} component={HomeScreen} />
              <Stack.Screen name="CheckUser" options={optionsScreen} component={CheckUserScreen} />
              <Stack.Screen name="CheckRepo" options={optionsScreen} component={CheckRepoScreen} />
              <Stack.Screen name="Success" options={optionsScreen} component={SuccessScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </RepoContextProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
