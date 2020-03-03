import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { RepoContext } from '../context/RepoContext';
import ButtonRightBottom from '../components/ButtonRightBottom';
import Link from '../components/Link';
import Input from '../components/Input';
import { BackIcon } from '../components/Icons';

const CheckRepoScreen = ({ navigation }) => {
  const { setRepo } = React.useContext(RepoContext)
  const [localRepo, setLocalRepo] = React.useState('')

  const onDone = () => {
    navigation.navigate('Root')
    setRepo(localRepo)
  }
  return <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.getStartedContainer}>
        <Link label='REPO' onPress={() => navigation.goBack()} Icon={BackIcon} />
        <View style={styles.content}>

          <Input onChange={(text) => {
            setLocalRepo(text)
            }} placeholder='Type your repository name' />

        </View>
      </View>
    </ScrollView>
    <ButtonRightBottom label='DONE' onPress={onDone} />
  </View>
}


CheckRepoScreen.navigationOptions = {
  header: null
};

export default CheckRepoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 50,
  },
  getStartedContainer: {
    marginHorizontal: 50,
  },
  content: {
    marginTop: 30
  }
});
