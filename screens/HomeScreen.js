import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import NetInfo from "@react-native-community/netinfo"
import { ScrollView } from 'react-native-gesture-handler';
import { RepoContext } from '../context/RepoContext';
import ButtonRightBottom from '../components/ButtonRightBottom';
import Typography from '../components/Typography';
import Colors from '../constants/Colors';
import { serviceApi } from '../utils';

const MessageOffline = () => 
  <Typography variant='titleNoBold'>
    Check your <Typography>username </Typography>{`\n`} 
    or your <Typography>repository</Typography> name
  </Typography>

const MessageRepoUserError = () => 
  <Typography variant='titleNoBold'>{`Check your\n`} 
     <Typography> internet connection</Typography>
  </Typography>  

const HomeScreen = ({ navigation }) => {
  const { repo, user } = React.useContext(RepoContext)
  const [existRepoUser, setExistRepoUser] = React.useState('initial')
  const [isConnect, setIsConnect] = React.useState(false)

  let containerColor = 'normalColor'
  if(existRepoUser === 'not_exist'){
    containerColor = 'errorColor'
  }

  if(existRepoUser === 'exist') {
    containerColor = 'successColor'
  }

  onChange = (newState) => {
    console.log(newState, 'stato')
    setIsConnect(newState)
  }

  // useEffect hook calls only once like componentDidMount()
  React.useEffect(() => {
    // To get current network connection status
    NetInfo.fetch().then((connectionInfo) => {
      setNetInfo(connectionInfo)
    })
    // Whenever connection status changes below event fires
    NetInfo.addEventListener('connectionChange', onChange)

    // Our event cleanup function
    return () => {
      NetInfo.removeEventListener('connectionChange', onChange)
    }
  }, [])

  React.useEffect(() => {
    if(navigation.onLine && repo !== 'repo' && user !== 'user') {
      (async () => {
        const res = await serviceApi(`https://api.github.com/repos/${user}/${repo}`, [], 'GET')
        console.log(repo, user, res, 'risultato')
        const objectRes = JSON.parse(res)
        if(objectRes.message !== 'Not Found'){
          setExistRepoUser('exist')
        }else{
          setExistRepoUser('not_exist')
        }
      })()
    }
  }, [repo, user, navigation.onLine])

  const sendMessage = async () => {
   const result = await serviceApi('https://pushmore.marc.io/webhook/8iEDhzvRQgJFm5xZVfHZ1eNb', { repoUrl: repo, sender: user })
   if(result === 'OK'){
    navigation.navigate('Success')
   }else{

   }
   console.log(result, 'RISULTATO')
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

          {!navigation.onLine && <MessageOffline />}
          {navigation.onLine && existRepoUser === 'not_exist' && <MessageRepoUserError />}
        </View>
      </View>
      
    </ScrollView>
      {
      existRepoUser === 'exist'
      ? <ButtonRightBottom diabled={!navigator.onLine} label='SEND' onPress={sendMessage} /> 
      : <ButtonRightBottom diabled={!navigator.onLine} label='CHECK' onPress={() => navigation.navigate('CheckUser')} /> 
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
    paddingTop: 30,
  },
  getStartedContainer: {
    marginHorizontal: 50,
  },
  content: {
    marginTop: 30
  }
});
