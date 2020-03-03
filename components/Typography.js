import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const Typography = ({ variant = 'title', color = 'primary', children }) =>  
  <Text style={[styles.text, styles[variant], styles[color]]}>{children}</Text>

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
    display: 'flex'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20
  },
  titleNoBold: {    
    fontFamily: 'open-sans',
    fontSize: 20
  },
  content: {
    fontFamily: 'open-sans',
    fontSize: 44
  },
  successful: {
    fontFamily: 'open-sans-bold',
    fontSize: 50
  },
  primary: {
    color: Colors.primary,
  },
  secondary: {
    color: Colors.secondary
  }
});

export default Typography
