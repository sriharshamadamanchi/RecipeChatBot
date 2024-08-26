import { call, put, takeLatest } from 'redux-saga/effects';
import { getActionType } from '../../common/store/typeSafe';
import {
  searchRecipeAction,
  searchRecipeActionType,
  searchRecipeByIdAction,
  searchRecipeByIdActionType,
  storeRecipeAction,
  storeRecipeDetailsAction
} from './actions';
import { searchRecipeAPI, searchRecipeByIdAPI } from './apis';
import {
  hideLoaderAction,
  showLoaderAction
} from '../../common/loaderRedux/actions';
import { navigate } from '../../common/navigation/navigationService';
import { Alert } from 'react-native';

export function* searchRecipeSaga(action: {
  payload: searchRecipeActionType;
}): any {
  try {
    yield put(showLoaderAction());
    yield put(
      storeRecipeDetailsAction({ recipe: undefined, chat: action.payload.chat })
    );
    const response = yield call(searchRecipeAPI, action.payload);
    yield put(
      storeRecipeAction({
        recipies: response?.results ?? [],
        chat: action.payload.chat
      })
    );
  } catch (error: any) {
    console.log('error in searchRecipeSaga', error);
    if (error.message) {
      Alert.alert('Error', error.message);
    }
  } finally {
    yield put(hideLoaderAction());
  }
}

export function* searchRecipeByIdSaga(action: {
  payload: searchRecipeByIdActionType;
}): any {
  try {
    yield put(showLoaderAction());
    const response = yield call(searchRecipeByIdAPI, action.payload);
    yield put(
      storeRecipeDetailsAction({ recipe: response, chat: action.payload.chat })
    );
    if (!action.payload.chat) {
      navigate('RecipeInformation');
    }
  } catch (error: any) {
    console.log('error in searchRecipeByIdSaga', error);
    if (error.message) {
      Alert.alert('Error', error.message);
    }
  } finally {
    yield put(hideLoaderAction());
  }
}

export const dashboardSagas = [
  takeLatest(getActionType(searchRecipeAction), searchRecipeSaga),
  takeLatest(getActionType(searchRecipeByIdAction), searchRecipeByIdSaga)
];
