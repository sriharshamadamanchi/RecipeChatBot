import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import { Card, CurvedButton, Label } from '../../common/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../common/theme';
import { resetAction } from '../redux/actions';
import { recipeType, storeType } from '../../common/store/types';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  recipeContainer: {
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.9,
    marginRight: moderateScale(5),
    marginLeft: moderateScale(5),
    flexDirection: 'row'
  },
  imageStyle: {
    backgroundColor: '#D3D3D3',
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(5)
  },
  labelStyle: {
    flex: 1,
    paddingLeft: moderateScale(10),
    justifyContent: 'center'
  },
  iconStyle: {
    justifyContent: 'center'
  },
  listHeaderComponentStyle: {
    paddingLeft: moderateScale(10),
    paddingBottom: moderateScale(5)
  },
  listHeaderComponentInnerStyle: {
    flex: 1,
    alignItems: 'center'
  },
  buttonStyle: {
    marginTop: moderateScale(10),
    width: moderateScale(150),
    height: moderateScale(45)
  }
});

const Recipe = ({
  recipe,
  onRecipeSelect
}: {
  recipe: recipeType;
  onRecipeSelect: (recipe: recipeType) => void;
}) => {
  return (
    <Card style={styles.recipeContainer} onPress={() => onRecipeSelect(recipe)}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: recipe.image
        }}
      />
      <View style={styles.labelStyle}>
        <Label
          center
          primary
          title={recipe.title}
          ellipsizeMode="end"
          numberOfLines={3}
        />
      </View>
      <View style={styles.iconStyle}>
        <MaterialIcons
          name={'chevron-right'}
          color={theme.colors.background.base}
          size={moderateScale(35)}
        />
      </View>
    </Card>
  );
};

export const LoadRecipies = ({
  onRecipeSelect
}: {
  onRecipeSelect: (recipe: recipeType) => void;
}) => {
  const recipies = useSelector((store: storeType) => store.dashboard.recipies);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        ListEmptyComponent={() => <Label title="No results" />}
        ListHeaderComponent={() => {
          if (recipies.length > 0) {
            return (
              <View style={styles.listHeaderComponentInnerStyle}>
                <Label primary title="Select a recipe for instructions" />
                <CurvedButton
                  Icon={
                    <MaterialIcons
                      name="autorenew"
                      color="white"
                      size={moderateScale(20)}
                    />
                  }
                  buttonStyle={styles.buttonStyle}
                  title="Reset"
                  onPress={() => {
                    // Clear all details from redux
                    dispatch(resetAction());
                  }}
                />
              </View>
            );
          }
        }}
        showsVerticalScrollIndicator={false}
        data={recipies}
        // Load recipe image and name
        renderItem={({ item }) => (
          <Recipe recipe={item} onRecipeSelect={onRecipeSelect} />
        )}
      />
    </View>
  );
};
