import { MEALS } from '../../data/mock-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
}

const mealsReducer = (state=initialState, actions) => {
  switch (actions.type) {
    case TOGGLE_FAVORITE:
      const favoritedMealIndex = state.favoriteMeals.findIndex(
        meal => meal.id === actions.mealId
      );
      if (favoritedMealIndex >= 0) {
        let updatedFavoriteMeals = [...state.favoriteMeals];
        updatedFavoriteMeals.splice(favoritedMealIndex, 1);
        return { ...state, favoriteMeals: updatedFavoriteMeals}
      } else {
        let meal = state.meals.find(meal => meal.id === actions.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal)}
      }
    case SET_FILTERS:
      // TODO: reduce lines of code
      const appliedFilters = actions.filters;
      const updatedFilteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegeterian && !meal.isVegeterian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return {...state, filteredMeals: updatedFilteredMeals, meals: updatedFilteredMeals};
    default:
      return state;
  }

}

export default mealsReducer;
