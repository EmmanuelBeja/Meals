import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from '../components/MealItem';

const MealList = props => {
  const favoritedMeals = useSelector(state => state.mealsReducer.favoriteMeals);

  const renderMealItem = itemData => {
    const isFavorited = favoritedMeals.some(meal => meal.id === itemData.item.id)
    return (
      <MealItem
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        onPressFn={() => {
          props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
              meal: itemData.item,
              isFav: isFavorited
            }
          })
        }}
        />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{width: '100%'}}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MealList;
