import { recipeDetailsType, recipeType } from '../../common/store/types';
import { action } from '../../common/store/typeSafe';

export type searchRecipeActionType = {
  query: string;
  chat: boolean;
};

export const searchRecipeAction = (payload: searchRecipeActionType) =>
  action('src/Dashboard/redux/searchRecipeAction', payload);

export type storeRecipeActionType = {
  recipies: recipeType[];
  chat: boolean;
};

export const storeRecipeAction = (payload: storeRecipeActionType) =>
  action('src/Dashboard/redux/storeRecipeAction', payload);

export type searchRecipeByIdActionType = {
  id: number;
  chat: boolean;
};

export const searchRecipeByIdAction = (payload: searchRecipeByIdActionType) =>
  action('src/Dashboard/redux/searchRecipeByIdAction', payload);

export type storeRecipeDetailsActionType = {
  recipe?: recipeDetailsType;
  chat: boolean;
};

export const storeRecipeDetailsAction = (
  payload: storeRecipeDetailsActionType
) => action('src/Dashboard/redux/searchRecipeDetailsAction', payload);

export const resetAction = (): any => action('src/Dashboard/redux/resetAction');
