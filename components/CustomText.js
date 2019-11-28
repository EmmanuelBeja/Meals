import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomText = props => {
  return <Text style={{...styles.container, ...props.style}}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'open-sans'
  }
});

export default CustomText;
