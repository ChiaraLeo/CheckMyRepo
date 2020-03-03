import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { RepoContext } from '../context/RepoContext';
import ButtonRightBottom from '../components/ButtonRightBottom';
import Link from '../components/Link';
import Input from '../components/Input';

const CheckUserScreen = ({ navigation }) => {
  const { setUser } = React.useContext(RepoContext)
  const [localUser, setLocalUser] = React.useState('')

  const onDone = () => {
    navigation.navigate('Root')
    setUser(localUser)
  }
  return <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.getStartedContainer}>
        <Link label='USER' onPress={() => navigation.goBack()} />
        <View style={styles.content}>

          <Input onChange={(text) => setLocalUser(text)} placeholder='Type your username' />

        </View>
      </View>
    </ScrollView>
    <ButtonRightBottom label='DONE' onPress={onDone} />
  </View>
}


CheckUserScreen.navigationOptions = {
  header: null
};

export default CheckUserScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    marginHorizontal: 50,
  },
  content: {
    marginTop: 30
  }
});
