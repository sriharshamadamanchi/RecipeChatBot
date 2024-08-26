import React from 'react';
import { Label } from './common/components';
import { moderateScale } from 'react-native-size-matters';
import { Platform, StyleSheet, View } from 'react-native';
import { theme } from './common/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import { Recipe } from './Dashboard/Recipe/Recipe';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RecipeInformation } from './Dashboard/Recipe/RecipeInformation';
import { ChatBot } from './Dashboard/ChatBot/ChatBot';
import { useDispatch } from 'react-redux';
import {
  storeRecipeAction,
  storeRecipeDetailsAction
} from './Dashboard/redux/actions';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabsStyle: {
    flex: 1,
    backgroundColor: theme.colors.background.default
  },
  icon: {
    height: moderateScale(36),
    width: moderateScale(36)
  },
  welcomeLabelStyle: {
    margin: moderateScale(15)
  },
  teamNameStyle: {
    marginBottom: moderateScale(20)
  },
  infoIconStyle: {
    position: 'absolute',
    padding: moderateScale(10),
    right: moderateScale(90),
    bottom: moderateScale(12)
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(20)
  }
});

export const Header = ({ name }: { name: string }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <HeaderBackButton
        style={{ paddingLeft: moderateScale(10) }}
        tintColor="#FFFFFF"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Label
        ellipsizeMode="end"
        numberOfLines={1}
        center
        xl22
        bold
        white
        title={name}
        style={{ width: moderateScale(275), right: moderateScale(10) }}
      />
    </View>
  );
};

const TabBarLabel = ({ color, children }: any) => {
  return (
    <Label
      s
      bold
      title={children}
      style={{ color, paddingBottom: moderateScale(10) }}
    />
  );
};

export const HomeTabbar = () => {
  return (
    <View style={styles.tabsStyle}>
      <Tab.Navigator
        backBehavior={'initialRoute'}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: Platform.OS === 'android',
          tabBarActiveTintColor: theme.colors.background.base,
          tabBarStyle: {
            height:
              Platform.OS === 'android' ? moderateScale(65) : moderateScale(90),
            paddingTop: moderateScale(5)
          },
          tabBarLabel: TabBarLabel
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="chat"
                color={
                  focused
                    ? theme.colors.background.base
                    : theme.colors.background.secondary
                }
                size={moderateScale(30)}
              />
            )
          }}
          name={'CHAT'}
          component={ChatBot}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="food-bank"
                color={
                  focused
                    ? theme.colors.background.base
                    : theme.colors.background.secondary
                }
                size={moderateScale(30)}
              />
            )
          }}
          name={'RECIPE'}
          component={Recipe}
        />
      </Tab.Navigator>
    </View>
  );
};

const Stack = createStackNavigator();

export const Home = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Clear chat details on launch
    dispatch(storeRecipeAction({ recipies: [], chat: true }));
    dispatch(storeRecipeDetailsAction({ recipe: undefined, chat: true }));
  }, [dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTintColor: theme.colors.font.primary,
        headerStyle: {
          backgroundColor: theme.colors.background.default,
          height:
            Platform.OS === 'android'
              ? moderateScale(50)
              : Platform.isTV
                ? 80
                : undefined
        },
        headerTitleStyle: {
          fontSize: theme.fontSizes.xl20,
          color: theme.colors.font.primary,
          fontFamily: theme.fonts.bold,
          marginHorizontal: moderateScale(20)
        },
        headerTitle: ({ children }: { children: string }) => {
          return (
            <Label
              primary
              bold
              xl20
              title={children}
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={{ marginHorizontal: moderateScale(25) }}
            />
          );
        }
      }}>
      <>
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="HomeTabbar"
          component={HomeTabbar}
        />

        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="RecipeInformation"
          component={RecipeInformation}
        />
      </>
    </Stack.Navigator>
  );
};
