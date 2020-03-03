import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Typography from '../components/Typography';

const SuccessScreen = ({ navigation }) => {
  return <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.getStartedContainer}>
        <Typography>{`All Done! \nRepository sent!`}</Typography>
      </View>
      
    </ScrollView>
  </View>
}

export default SuccessScreen

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
