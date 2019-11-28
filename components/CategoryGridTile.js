import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback
} from 'react-native';


const CategoryGridTile = props => {
  let TouchableCmp = TouchableOpacity;

   if (Platform.OS === 'android' && Platform.version >= 21) {
     TouchableCmp = TouchableNativeFeedback;
   }

  return (
    <TouchableCmp
      style={styles.gridItem}
      onPress={props.onPressFn} >
      <View style={{...styles.textContainer, ...{backgroundColor: props.color}}}>
        <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
      </View>
    </TouchableCmp>
  );
};

// NOTE: shadow properties dont work on android and therefore one needs elevation
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow:
      Platform.OS === 'android'  && Platform.version >= 21
      ? 'hidden'
      : 'visible',
    elevation: 15,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10
  },
  textContainer: {
    flex: 1,
    height: 100,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    color: 'white',
    textAlign: 'right'
  }
});

export default CategoryGridTile;
