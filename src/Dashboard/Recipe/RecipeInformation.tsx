import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import { Card, CurvedButton, Label } from '../../common/components';
import { theme } from '../../common/theme';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import { Utility } from '../../common/Utility';
import { Ripple } from '../../common/components/Ripple/Ripple';
import {
  extendedIngredient,
  recipeDetailsType,
  storeType
} from '../../common/store/types';
// @ts-ignore
import { PrimaryView } from '../../common/components/PrimaryView/PrimaryView';

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
  cookingDetailsContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
    marginVertical: moderateScale(20)
  },
  cookingDetailStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonStyle: {
    width: moderateScale(150),
    height: moderateScale(45),
    alignSelf: 'center'
  }
});

const Ingredient = ({ item: ingredient }: { item: extendedIngredient }) => {
  return (
    <Card disabled={true} style={styles.recipeContainer}>
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
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={ingredients}
        renderItem={Ingredient}
      />
    </View>
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

// Displays no of servings, cooking time, no of likes
const CookingDetails = ({ recipe }: { recipe: recipeDetailsType }) => {
  return (
    <View style={styles.cookingDetailsContainer}>
      <View style={styles.cookingDetailStyle}>
        <Ionicons name={'people'} size={moderateScale(20)} color={'black'} />
        <Label title={`  ${recipe.servings}`} />
      </View>

      <View style={styles.cookingDetailStyle}>
        <AntDesign
          name={'clockcircleo'}
          size={moderateScale(20)}
          color={'orange'}
        />
        <Label
          title={`  ${Utility.convertMinutesToReadableString(recipe.readyInMinutes)}`}
        />
      </View>

      <View style={styles.cookingDetailStyle}>
        <AntDesign name={'heart'} size={moderateScale(20)} color={'red'} />
        <Label title={`  ${recipe.aggregateLikes}`} />
      </View>
    </View>
  );
};

// Custon header
const Header = ({ title }: { title?: string }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <HeaderBackButton
        tintColor={theme.colors.background.base}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {title && (
        <Label
          xl
          bold
          primary
          title={title}
          style={{ width: moderateScale(250) }}
        />
      )}
    </View>
  );
};

// Displays steps and ingredients of the recipe
export const RecipeInformation = () => {
  const recipe: any = useSelector((store: storeType) => store.dashboard.recipe);

  // Convert string to list of strings based on the pattern
  const instructions = Utility.formatInstructions(recipe?.instructions ?? '');

  // route: 0 => Steps, route: 1 => Ingredients
  const [route, setRoute] = React.useState(0);
  const [checked, setChecked] = React.useState(
    new Array(instructions.length).fill(false)
  );

  return (
    <PrimaryView>
      <ScrollView style={styles.container}>
        <Header />
        <Card disabled>
          <Image
            style={styles.imageStyle}
            source={{
              uri: recipe.image
            }}
          />
        </Card>
        <View style={{ padding: moderateScale(10) }}>
          <Label title={recipe.title} ellipsizeMode="end" numberOfLines={2} />

          <CookingDetails recipe={recipe} />

          <CurvedButton
            inverse
            Icon={
              <MaterialIcons
                name="autorenew"
                color={theme.colors.background.base}
                size={moderateScale(20)}
              />
            }
            buttonStyle={styles.buttonStyle}
            title="Reset"
            // Resets the checked instructions
            onPress={() => {
              setChecked(new Array(instructions.length).fill(false));
            }}
          />

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
      </ScrollView>
    </PrimaryView>
  );
};
