import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { FocusAwareStatusBar } from './FocusAwareStatusBar/FocusAwareStatusBar';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary
  }
});

interface primaryViewPropsType {
  children: any;
  barStyle?: 'light-content' | 'dark-content';
  hideSafeViewRenderer?: boolean;
  offlineBannerStyle?: any;
  safeAreaTopColor?: 'default' | 'base' | 'primary';
  safeAreaBottomColor?: 'default' | 'base' | 'primary';
  defaultColor?: boolean;
}

export const PrimaryView = ({
  children,
  barStyle = 'dark-content',
  defaultColor = false
}: primaryViewPropsType) => {
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={barStyle} defaultColor={defaultColor} />
      {children}
    </View>
  );
};
