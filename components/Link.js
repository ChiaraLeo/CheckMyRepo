import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Typography from './Typography';

const Link = ({ onPress, label, Icon }) => {
  return   <TouchableOpacity onPress={onPress} style={styles.helpLink}>
    {Icon && <Icon />}
  <Typography>{label}</Typography>
</TouchableOpacity>
}

const styles = StyleSheet.create({
  helpLink: {
    paddingVertical: 20,
  }
});

export default Link
