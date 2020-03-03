import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import NetInfo from "@react-native-community/netinfo"
import { ScrollView } from 'react-native-gesture-handler';
import { RepoContext } from '../context/RepoContext';
import ButtonRightBottom from '../components/ButtonRightBottom';
import Typography from '../components/Typography';
import Colors from '../constants/Colors';
import { serviceApi } from '../utils';

const MessageRepoUserError = () => 
  <Typography variant='titleNoBold'>
    Check your <Typography>username </Typography>{`\n`} 
    or your <Typography>repository</Typography> name
  </Typography>

const MessageOffline = () => 
  <Typography variant='titleNoBold'>
    Check your
    <Typography variant='title'> internet connection</Typography>
  </Typography>  

const HomeScreen = ({ navigation }) => {
  const { repo, user, existRepoUser, setExistRepoUser } = React.useContext(RepoContext)
  const [isConnected, setIsConnected] = React.useState(null)
  const [isFetching, setIsFetching] = React.useState(false)

  let containerColor = 'normalColor'
  if(existRepoUser === 'not_exist' || isConnected === false){
    containerColor = 'errorColor'
  }

  if(existRepoUser === 'exist') {
    containerColor = 'successColor'
  }

  React.useEffect(() => {
    setIsFetching(true)
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected)
      setIsFetching(false)
    });
  }, [])

  React.useEffect(() => {
    if(isConnected && repo !== 'repo' && user !== 'user') {
      (async () => {
        setIsFetching(true)
        const res = await serviceApi(`https://api.github.com/repos/${user}/${repo}`, [], 'GET')
        setIsFetching(false)
        const objectRes = JSON.parse(res)
        if(objectRes.message !== 'Not Found'){
          setExistRepoUser('exist')
        }else{
          setExistRepoUser('not_exist')
        }
      })()
    }
  }, [repo, user, isConnected])

  const sendMessage = async () => {
   const result = await serviceApi('https://pushmore.marc.io/webhook/8iEDhzvRQgJFm5xZVfHZ1eNb', { repoUrl: repo, sender: user })
   if(result === 'OK'){
    navigation.navigate('Success')
   }else{

   }
  }

  return <View style={[styles.container, styles[containerColor]]}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.getStartedContainer}>
        <Typography>Set the repository address</Typography>
        <View style={styles.content}>

          <Typography variant='content'>github.com</Typography>

          <Typography variant='content'>/
                <Typography color='secondary' variant='content'>
              {user}
            </Typography>
          </Typography>

          <Typography variant='content'>/
                <Typography color='secondary' variant='content'>
              {repo}
            </Typography>
          </Typography>

          {isFetching &&  <Typography variant='titleNoBold'>Loading...</Typography>}

          {!isConnected && <MessageOffline />}
          {isConnected && existRepoUser === 'not_exist' && <MessageRepoUserError />}
        </View>
      </View>
      
    </ScrollView>
      {
      existRepoUser === 'exist'
      ? <ButtonRightBottom diabled={!isConnected || isFetching} label='SEND' onPress={sendMessage} /> 
      : <ButtonRightBottom diabled={!isConnected || isFetching} label='CHECK' onPress={() => navigation.navigate('CheckUser')} /> 
      }
  </View>
}

export default HomeScreen

const styles = StyleSheet.create({
  normalColor: {
    backgroundColor: '#fff',
  },
  errorColor: {
    backgroundColor: Colors.error
  },
  successColor: {
    backgroundColor: Colors.success
  },
  container: {
    flex: 1,
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
