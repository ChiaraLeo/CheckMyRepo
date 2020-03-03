import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Typography from './Typography';

const ButtonRightBottom = ({ disabled = false, onPress, label }) => {
  return <View style={styles.tabBarInfoContainer}>
  <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.helpLink}>
    <Typography>{label}</Typography>
  </TouchableOpacity>
</View>
}

const styles = StyleSheet.create({
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'flex-end'
  },
  helpLink: {
    paddingVertical: 20,
  }
});

export default ButtonRightBottom
