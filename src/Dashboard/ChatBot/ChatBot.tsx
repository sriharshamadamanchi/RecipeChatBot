import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
// @ts-ignore
import { PrimaryView } from '../../common/components/PrimaryView/PrimaryView';
import { searchRecipeAction, searchRecipeByIdAction } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingIndicator, Search } from '../../common/components';
import { ChatBotLoadRecipies } from './ChatBotLoadRecipies';
import { ChatBotRecipeInformation } from './ChatBotRecipeInformation';
import { recipeType, storeType } from '../../common/store/types';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search: {
    justifyContent: 'flex-end'
  }
});

export const ChatBot = () => {
  const dispatch = useDispatch();

  const loading = useSelector((store: storeType) => store.loader.loading);
  const [value, onChangeValue] = React.useState('');
  const [selectedRecipe, setSelectedRecipe] = React.useState<recipeType | null>(
    null
  );

  return (
    <PrimaryView>
      <ScrollView contentContainerStyle={styles.container}>
        <LoadingIndicator loading={loading} />
        <KeyboardAvoidingView
          style={styles.container}
          keyboardVerticalOffset={Platform.select({
            ios: moderateScale(50),
            android: 0
          })}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.container}>
            <ChatBotLoadRecipies // Displays list of recipies based on the query
              selectedRecipe={selectedRecipe}
              onRecipeSelect={(recipe: recipeType) => {
                setSelectedRecipe(recipe);
                dispatch(
                  searchRecipeByIdAction({
                    id: recipe.id,
                    chat: true
                  })
                );
              }}
            />

            <ChatBotRecipeInformation />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={styles.search}>
        <Search // Search bar with voice and submit button
          value={value}
          onChangeValue={onChangeValue}
          onSubmit={(val: string) => {
            Keyboard.dismiss();
            setSelectedRecipe(null);
            dispatch(searchRecipeAction({ query: val, chat: true }));
          }}
        />
      </View>
    </PrimaryView>
  );
};
