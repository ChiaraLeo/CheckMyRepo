import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/Colors';

const Input = ({ placeholder, name, onChange }) =>  
  <TextInput 
  placeholder={placeholder}
  name={name}
  focusable={false}
  focusvisible-polyfill={false}
  onChangeText={onChange}
  style={styles.input}
  underlineColorAndroid={Colors.primary}
  selectionColor={Colors.primary}
  />  

const styles = StyleSheet.create({
  input: {
    fontFamily: 'open-sans',
    height: 40
  }
});

export default Input
