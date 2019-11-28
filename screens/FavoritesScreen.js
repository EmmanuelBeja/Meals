import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/CustomHeaderButton';
import CustomText from '../components/CustomText';
import MealList from '../components/MealList';

const FavoritesScreen = props => {
  const favoritedMeals = useSelector(state => state.mealsReducer.favoriteMeals);
  if (favoritedMeals.length === 0) {
    return (
        <View style={styles.content}>
         <CustomText>Ooops!</CustomText>
         <CustomText>No favorite meals added. You could add some.</CustomText>
        </View>
    )
  }
  return <MealList displayedMeals={favoritedMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = navigationData => {
  return {
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navigationData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    )
  }
};

FavoritesScreen.navigationOptions = {
    headerTitle: 'Favorites'
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavoritesScreen;
