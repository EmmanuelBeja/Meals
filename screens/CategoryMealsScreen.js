import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';
import CustomText from '../components/CustomText';

const CategoryMealsScreen = props => {
  const category = props.navigation.getParam('category');
  const meals = useSelector(state => state.mealsReducer.meals);
  const displayedMeals = meals.filter(
    meal => meal.categoryIds.indexOf(category.id) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
        <View style={styles.content}>
         <CustomText>Ooops!</CustomText>
         <CustomText>No meals to show. might be your filters.</CustomText>
         <CustomText style={{fontSize: 25}}>🤷🏽</CustomText>
        </View>
    )
  }

  return (
    <MealList displayedMeals={displayedMeals} navigation={props.navigation} />
  )
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const seletedCategory = navigationData.navigation.getParam('category');
    return {
      headerTitle: seletedCategory.title
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoryMealsScreen;
