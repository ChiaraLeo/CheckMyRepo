import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Typography from '../components/Typography';
import ButtonRightBottom from '../components/ButtonRightBottom';
import { RepoContext } from '../context/RepoContext';

const SuccessScreen = ({ navigation }) => {
  const { setExistRepoUser, setRepo, setUser } = React.useContext(RepoContext)
  const onCool = () => {
    setExistRepoUser('initial')
    setRepo('repo')
    setUser('user')
    navigation.navigate('Root')
  }
  return <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.getStartedContainer}>
        <Typography type='successful'>All Done!</Typography>
        <Typography type='successful'>Repository sent.</Typography>
      </View>
      
    </ScrollView>
    <ButtonRightBottom onPress={onCool} label='COOL' />
  </View>
}

export default SuccessScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 50,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  content: {
    marginTop: 30
  }
});
