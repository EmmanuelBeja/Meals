import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/CustomHeaderButton';
import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/mock-data';

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        onPressFn={() => {
          props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              category: itemData.item
            }
          })
        }
        }
        title={itemData.item.title}
        color={itemData.item.color}
        />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  )
};

CategoriesScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Meal Categories',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default CategoriesScreen;
