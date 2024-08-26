import React from 'react';
import { LogBox, StyleSheet, View } from 'react-native';
import { theme } from './src/common/theme';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { navigationRef } from './src/common/navigation/navigationService';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/common/store';
import { RootSiblingParent } from 'react-native-root-siblings';
import { ErrorBoundary } from './src/common/ErrorBoundary/ErrorBoundary';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './src';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreAllLogs();

const getActiveRouteName = (state: any): any => {
  const route = state?.routes[state?.index];

  if (route?.state) {
    return getActiveRouteName(route.state);
  }

  return route?.name;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.default }
});

const themeForPaper = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.background.base,
    accent: theme.colors.background.base
  }
};

export const App = () => {
  const routeNameRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef?.current?.getRootState();

    routeNameRef.current = getActiveRouteName(state);
  }, []);

  console.log(navigationRef);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <PaperProvider theme={themeForPaper}>
            <ErrorBoundary>
              <GestureHandlerRootView style={styles.container}>
                <View style={styles.container}>
                  <NavigationContainer
                    ref={navigationRef}
                    onStateChange={(state: any) => {
                      const previousRouteName = routeNameRef.current;
                      const currentRouteName = getActiveRouteName(state);
                      if (previousRouteName !== currentRouteName) {
                        console.log('Route : ', currentRouteName);
                        routeNameRef.current = currentRouteName;
                      }
                    }}>
                    <Home />
                  </NavigationContainer>
                </View>
              </GestureHandlerRootView>
            </ErrorBoundary>
          </PaperProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};
