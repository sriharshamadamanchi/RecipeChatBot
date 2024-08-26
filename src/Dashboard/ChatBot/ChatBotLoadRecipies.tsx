import { FlatList, Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import { Card, Label } from '../../common/components';
import { theme } from '../../common/theme';
import { recipeType, storeType } from '../../common/store/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-end'
  },
  recipeContainer: {
    width: moderateScale(120),
    height: moderateScale(180),
    alignSelf: 'flex-end',
    marginRight: moderateScale(5),
    marginLeft: moderateScale(5)
  },
  imageStyle: {
    backgroundColor: '#D3D3D3',
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(5)
  },
  listHeaderComponentStyle: {
    paddingLeft: moderateScale(10),
    paddingBottom: moderateScale(5)
  },
  labelStyle: {
    paddingTop: moderateScale(5),
    width: moderateScale(100)
  },
  selectedStyle: {
    borderColor: theme.colors.background.base,
    borderWidth: 2
  }
});

const Recipe = ({
  selectedRecipe,
  recipe,
  onRecipeSelect
}: {
  selectedRecipe: recipeType | null;
  recipe: recipeType;
  onRecipeSelect: (recipe: recipeType) => void;
}) => {
  // Check if this recipe is the selected recipe by user
  const selected = selectedRecipe && selectedRecipe?.id === recipe?.id;
  return (
    <Card
      style={[styles.recipeContainer, selected ? styles.selectedStyle : {}]}
      onPress={() => onRecipeSelect(recipe)}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: recipe.image
        }}
      />
      <Label
        center
        primary
        title={recipe.title}
        style={styles.labelStyle}
        ellipsizeMode="end"
        numberOfLines={3}
      />
    </Card>
  );
};

export const ChatBotLoadRecipies = ({
  selectedRecipe,
  onRecipeSelect
}: {
  selectedRecipe: recipeType | null;
  onRecipeSelect: (recipe: recipeType) => void;
}) => {
  const recipies = useSelector(
    (store: storeType) => store.dashboard.chatRecipies ?? []
  );

  // Load recipe image and name
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={recipies}
        renderItem={({ item }) => (
          <Recipe
            recipe={item}
            selectedRecipe={selectedRecipe}
            onRecipeSelect={onRecipeSelect}
          />
        )}
      />
    </View>
  );
};
