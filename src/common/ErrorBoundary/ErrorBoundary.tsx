import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { CurvedButton, Label } from '../components';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../theme';
import RNRestart from 'react-native-restart';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    paddingTop: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  textStyle: {
    margin: moderateScale(20)
  },
  relaunch: {
    height: moderateScale(40),
    width: moderateScale(150),
    marginVertical: moderateScale(50)
  },
  noticeIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(30)
  },
  cardStyle: {
    width: moderateScale(140),
    height: moderateScale(100),
    margin: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  labelStyle: {
    paddingTop: moderateScale(12)
  },
  copyStyle: {
    alignSelf: 'center'
  }
});

const Error = () => {
  return (
    <View style={styles.container}>
      <Label style={styles.textStyle} xxxxl bold title={'Oops!'} />
      <Label
        xxl
        center
        style={styles.textStyle}
        title={'Something went wrong'}
      />
      <CurvedButton
        buttonStyle={styles.relaunch}
        title={'Relaunch'}
        onPress={() => {
          RNRestart.Restart();
        }}
      />
    </View>
  );
};

class ErrorBoundaryComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: any): any {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, _: any) {
    if (__DEV__) {
      console.error('Error Boundry Error', error);
    } else {
      console.error('Error Boundry Error', error);
      // crashlytics().recordError(error);
    }
  }

  render(): any {
    if (this.state.hasError) {
      return <Error />;
    }

    return this.props.children;
  }
}

export const ErrorBoundary = ErrorBoundaryComponent;
