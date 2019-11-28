import React, { useEffect, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/CustomHeaderButton';
import CustomText from '../components/CustomText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
  return <View style={styles.ListItem}>
    <CustomText>{props.children}</CustomText>
  </View>
};

const MealDetailScreen = props => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const selectedMeal = props.navigation.getParam('meal');
  const isFavorited = useSelector(state =>
    state.mealsReducer.favoriteMeals.some(meal => meal.id === selectedMeal.id)
  );

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(selectedMeal.id));
  }, [dispatch, selectedMeal]);

  useEffect(() => {
    navigation.setParams({toggleFav: toggleFavoriteHandler})
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({isFav: isFavorited})
  }, [isFavorited]);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <View style={styles.details}>
        <CustomText>{selectedMeal.duration}m</CustomText>
        <CustomText>{selectedMeal.complexity.toUpperCase()}</CustomText>
        <CustomText>{selectedMeal.affordability.toUpperCase()}</CustomText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient, index) => <ListItem key={index}>- {ingredient}</ListItem>)}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step, index) => <ListItem key={index}>- {step}</ListItem>)}
    </ScrollView>
  )
};

MealDetailScreen.navigationOptions = navigationData => {
    const mealTitle = navigationData.navigation.getParam('meal').title;
    const toggleFav = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');

    return {
      headerTitle: mealTitle,
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Favorite'
            iconName={isFav ? 'ios-star' : 'ios-star-outline'}
            onPress={() => { toggleFav() }}
          />
        </HeaderButtons>
      )
    }
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  image: {
    width: '100%',
    height: 200
  },
  ListItem: {
    marginVertical: 2.5,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  }
});

export default MealDetailScreen;
