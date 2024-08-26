import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
// @ts-ignore
import { PrimaryView } from '../../common/components/PrimaryView/PrimaryView';
import { searchRecipeAction, searchRecipeByIdAction } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingIndicator, Search } from '../../common/components';
import { LoadRecipies } from './LoadRecipies';
import { recipeType, storeType } from '../../common/store/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export const Recipe = () => {
  const dispatch = useDispatch();

  const loading = useSelector((store: storeType) => store.loader.loading);
  const [value, onChangeValue] = React.useState('');

  return (
    <PrimaryView>
      <LoadingIndicator loading={loading} />
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.select({
          ios: moderateScale(50),
          android: 0
        })}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          <Search // Search bar with voice and submit button
            value={value}
            onChangeValue={onChangeValue}
            onSubmit={(val: string) => {
              Keyboard.dismiss();
              dispatch(searchRecipeAction({ query: val, chat: false }));
            }}
          />

          <LoadRecipies // Displays list of recipies based on the query
            onRecipeSelect={(recipe: recipeType) => {
              dispatch(searchRecipeByIdAction({ id: recipe.id, chat: false }));
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </PrimaryView>
  );
};
