import { recipeDetailsType, recipeType } from '../../common/store/types';
import { createReducer, resetState } from '../../common/store/typeSafe';
import {
  resetAction,
  storeRecipeAction,
  storeRecipeActionType,
  storeRecipeDetailsAction,
  storeRecipeDetailsActionType
} from './actions';

const initialState = {
  recipies: [],
  recipe: null,
  chatRecipies: [],
  chatRecipe: null
};

export interface dashboardReducerStateType {
  recipies: recipeType[];
  recipe?: recipeDetailsType;
  chatRecipies: recipeType[];
  chatRecipe?: recipeDetailsType;
}

export const dashboardReducer = createReducer(initialState)
  .handleAction(
    storeRecipeAction,
    (
      state: dashboardReducerStateType,
      action: { payload: storeRecipeActionType }
    ) => {
      if (action.payload.chat) {
        state.chatRecipies = action.payload.recipies;
      } else {
        state.recipies = action.payload.recipies;
      }
    }
  )
  .handleAction(
    storeRecipeDetailsAction,
    (
      state: dashboardReducerStateType,
      action: { payload: storeRecipeDetailsActionType }
    ) => {
      if (action.payload.chat) {
        state.chatRecipe = action.payload.recipe;
      } else {
        state.recipe = action.payload.recipe;
      }
    }
  )
  .handleAction(resetAction, resetState(initialState));
