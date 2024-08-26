import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { theme } from '../../../theme';

interface focusAwareStatusBarType {
  barStyle: 'default' | 'light-content' | 'dark-content';
  defaultColor?: boolean;
}

export const FocusAwareStatusBar = ({
  barStyle,
  defaultColor
}: focusAwareStatusBarType): any => {
  let backgroundColor = 'transparent';
  switch (barStyle) {
    case 'light-content':
      backgroundColor = theme.colors.dashboardGradient.color1;
      break;
    case 'dark-content':
      backgroundColor = defaultColor
        ? theme.colors.background.default
        : theme.colors.background.primary;
      break;
  }
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
  ) : null;
};
