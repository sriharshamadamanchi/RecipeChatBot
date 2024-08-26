import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { FocusAwareStatusBar } from './FocusAwareStatusBar/FocusAwareStatusBar';
import { SafeViewRenderer } from './SafeViewRenderer/SafeViewRenderer';

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
  safeAreaTopColor?: 'default' | 'base' | 'primary' | 'light';
  safeAreaBottomColor?: 'default' | 'base' | 'primary';
  defaultColor?: boolean;
}

export const PrimaryView = ({
  children,
  safeAreaTopColor,
  safeAreaBottomColor,
  hideSafeViewRenderer = false,
  barStyle = 'dark-content',
  defaultColor = false
}: primaryViewPropsType) => {
  if (hideSafeViewRenderer) {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar barStyle={barStyle} defaultColor={defaultColor} />
        {children}
      </View>
    );
  }

  return (
    <SafeViewRenderer
      safeAreaTopColor={safeAreaTopColor}
      safeAreaBottomColor={safeAreaBottomColor}>
      <View style={styles.container}>
        <FocusAwareStatusBar barStyle={barStyle} defaultColor={defaultColor} />
        {children}
      </View>
    </SafeViewRenderer>
  );
};
