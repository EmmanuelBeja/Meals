import React from 'react';
import { Text, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';


const defaultStackNavOptions = {
  headerStyle: {
     backgroundColor: Platform.OS  === 'android' && Colors.primary
  },
  headerTintColor: Platform.OS  === 'android' ? 'white' : Colors.primary,
  headerTitle: 'A Screen',
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  }
};

// NOTE: default navigation options are always overwritten
const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen
  },
  MealDetail: MealDetailScreen
}, {
  mode: 'modal', // transition mode
  // initialRouteName: 'CategoriesScreen', overides default screen
  defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  mealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons
          name='ios-restaurant'
          size={28}
          color={tabInfo.tintColor}
        />
      },
      tabBarColor: Colors.primary,
      tabBarLabel: Platform.OS  === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons
          name='ios-star'
          size={28}
          color={tabInfo.tintColor}
        />
      },
      tabBarColor: Colors.secondary,
      tabBarLabel: Platform.OS  === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
    }
  }
};

// NOTE: root navigator nesting other navigator
const MealsFavTabNavigator = Platform.OS  === 'android'
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeTintColor: 'white',
    shifting: true
    // barStyle: {
    //   backgroundColor: Colors.primary
    // }
  })
  : createBottomTabNavigator(tabScreenConfig, {
     tabBarOptions: {
       labelStyle: {
         fontFamily: 'open-sans-bold'
       },
       activeTintColor: Colors.secondary
     }
   });

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.secondary,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});

export default createAppContainer(MainNavigator);
