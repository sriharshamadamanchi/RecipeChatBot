import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import { Card, Label } from '../../common/components';
import { theme } from '../../common/theme';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Ripple } from '../../common/components/Ripple/Ripple';
import { Utility } from '../../common/Utility';
import { extendedIngredient, storeType } from '../../common/store/types';

const styles = StyleSheet.create({
  container: {
    flex: 2
  },
  recipeContainer: {
    justifyContent: 'center',
    borderRadius: 100
  },
  imageStyle: {
    height: moderateScale(300),
    borderRadius: moderateScale(5)
  },
  selectionContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: moderateScale(300),
    height: moderateScale(50),
    backgroundColor: theme.colors.background.secondary,
    borderRadius: moderateScale(100),
    marginVertical: moderateScale(10)
  },
  selectionButtonStyle: {
    width: moderateScale(150),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(150)
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(10)
  },
  ingredientLabelStyle: {
    width: '80%'
  },
  instructionCardStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkBoxStyle: {
    flex: 1,
    alignItems: 'flex-end'
  }
});

const Ingredient = ({ item: ingredient }: { item: extendedIngredient }) => {
  return (
    <Card disabled style={styles.recipeContainer}>
      <Label
        center
        primary
        title={ingredient.original}
        style={styles.ingredientLabelStyle}
      />
    </Card>
  );
};

// Displays list of ingredients for the recipe
const Ingredients = ({
  ingredients
}: {
  ingredients: extendedIngredient[];
}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={ingredients}
      renderItem={Ingredient}
    />
  );
};

// Displays list of instructions for the recipe
const LoadInstructions = ({
  instructions,
  checked,
  setChecked
}: {
  instructions: string[];
  checked: boolean[];
  setChecked: (val: boolean[]) => void;
}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={instructions}
      renderItem={({ item: instruction, index }) => {
        return (
          <Card
            onPress={() => {
              checked[index] = !checked[index];
              setChecked([...checked]);
            }}
            style={styles.instructionCardStyle}>
            <Label primary title={`${index + 1}. `} />
            <Label
              primary
              title={instruction}
              style={styles.ingredientLabelStyle}
            />

            <View style={styles.checkBoxStyle}>
              <MaterialIcons
                name={checked[index] ? 'check-box' : 'check-box-outline-blank'}
                color={checked[index] ? theme.colors.background.base : 'black'}
                size={moderateScale(24)}
              />
            </View>
          </Card>
        );
      }}
    />
  );
};

// Custom tab bar for selecting steps and ingredients
const Selection = ({
  route,
  setRoute
}: {
  route: number;
  setRoute: (val: number) => void;
}) => {
  return (
    <View style={styles.selectionContainer}>
      <Ripple
        style={[
          styles.selectionButtonStyle,
          {
            backgroundColor:
              route === 0
                ? theme.colors.background.base
                : theme.colors.background.secondary
          }
        ]}
        onPress={() => setRoute(0)}>
        <Label white={route === 0} primary={route !== 0} title="Steps" />
      </Ripple>

      <Ripple
        style={[
          styles.selectionButtonStyle,
          {
            backgroundColor:
              route === 1
                ? theme.colors.background.base
                : theme.colors.background.secondary
          }
        ]}
        onPress={() => setRoute(1)}>
        <Label white={route === 1} primary={route !== 1} title="Ingredients" />
      </Ripple>
    </View>
  );
};

// Displays steps and ingredients of the recipe
export const ChatBotRecipeInformation = () => {
  const recipe = useSelector((store: storeType) => store.dashboard.chatRecipe);

  // Convert string to list of strings based on the pattern
  const instructions = Utility.formatInstructions(recipe?.instructions ?? '');

  // route: 0 => Steps, route: 1 => Ingredients
  const [route, setRoute] = React.useState(0);
  const [checked, setChecked] = React.useState(
    new Array(instructions.length).fill(false)
  );

  React.useEffect(() => {
    setChecked(new Array(instructions.length).fill(false));
  }, [setChecked, recipe?.id, instructions?.length]);

  if (!recipe) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={{ padding: moderateScale(10) }}>
        <Selection route={route} setRoute={setRoute} />
        {route === 0 ? (
          <LoadInstructions
            instructions={instructions}
            checked={checked}
            setChecked={setChecked}
          />
        ) : (
          <Ingredients ingredients={recipe.extendedIngredients} />
        )}
      </View>
    </View>
  );
};
