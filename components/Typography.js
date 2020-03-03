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
    fontFamily: 'open-sans',
    fontSize: 23,
    fontWeight: '900'
  },
  titleNoBold: {    
    fontFamily: 'open-sans',
    fontSize: 23,
    fontWeight: '300'
  },
  content: {
    fontFamily: 'open-sans',
    fontSize: 47,
    fontWeight: '400'
  },
  primary: {
    color: Colors.primary,
  },
  secondary: {
    color: Colors.secondary
  }
});

export default Typography
