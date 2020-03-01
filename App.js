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

import useLinking from './navigation/useLinking';
import { RepoContextProvider } from './context/RepoContext';

const Stack = createStackNavigator();
const optionsScreen = { headerShown: false }

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [user, setUser] = React.useState('User');
  const [repo, setRepo] = React.useState('Repo');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const valueContext = { user, setUser, repo, setRepo, message, setMessage, error, setError };
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/OpenSans-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
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
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator>
              <Stack.Screen name="Root" options={optionsScreen} component={HomeScreen} />
              <Stack.Screen name="CheckUser" component={CheckUserScreen} />
              <Stack.Screen name="CheckRepo" component={CheckRepoScreen} />
              <Stack.Screen name="Success" component={SuccessScreen} />
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
