import { dashboardReducerStateType } from '../../Dashboard/redux/reducer';

export type recipeType = {
  id: number;
  title: string;
  image: string;
};

export interface extendedIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

export interface recipeDetailsType {
  aggregateLikes: number;
  cheap: boolean;
  cookingMinutes: number;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  dishTypes: string[];
  extendedIngredients: extendedIngredient[];
  gaps: string;
  glutenFree: boolean;
  healthScore: number;
  id: number;
  image: string;
  imageType: string;
  instructions: string;
  lowFodmap: boolean;
  occasions?: string[];
  originalId: number | null;
  preparationMinutes: number;
  pricePerServing: number;
  readyInMinutes: number;
  servings: number;
  sourceName: string;
  sourceUrl: string;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
  summary: string;
  sustainable: boolean;
  title: string;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  weightWatcherSmartPoints?: number;
}

export interface storeType {
  loader: any;
  dashboard: dashboardReducerStateType;
}
