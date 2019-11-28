import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  ImageBackground
} from 'react-native';

import CustomText from './CustomText';


const MealItem = props => {
  let TouchableCmp = TouchableOpacity;

   if (Platform.OS === 'android' && Platform.version >= 21) {
     TouchableCmp = TouchableNativeFeedback;
   }

  return (
    <View style={styles.gridItem}>
      <TouchableCmp
        onPress={props.onPressFn} >
        <View>
          <View style={styles.mealRow}>
            <ImageBackground source={{uri: props.imageUrl}} style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    height: 200,
    width: '95%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10
  },
  mealRow: {
    flexDirection: 'row'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 0},
    textShadowRadius: 1
  }
});

export default MealItem;
