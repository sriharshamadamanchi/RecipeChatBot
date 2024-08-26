import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { theme } from '../../../theme';

interface safeViewRendererPropsType {
  children: any;
  safeAreaTopColor?: 'default' | 'base' | 'primary' | 'light' | 'transparent';
  safeAreaBottomColor?: 'default' | 'base' | 'primary' | 'transparent';
}

export const SafeViewRenderer = ({
  children,
  safeAreaTopColor,
  safeAreaBottomColor
}: safeViewRendererPropsType): any => {
  const topContinerStyle = { backgroundColor: theme.colors.background.default };
  const bottomContainerStyle = {
    flex: 1,
    backgroundColor: theme.colors.background.default
  };

  switch (safeAreaTopColor) {
    case 'primary':
      topContinerStyle.backgroundColor = theme.colors.background.primary;
      break;
    case 'base':
      topContinerStyle.backgroundColor = theme.colors.dashboardGradient.color1;
      break;
    case 'light':
      topContinerStyle.backgroundColor = theme.colors.dashboardGradient.color2;
      break;
    case 'transparent':
      topContinerStyle.backgroundColor = 'transparent';
      break;
    case 'default':
    default:
      topContinerStyle.backgroundColor = theme.colors.background.default;
  }

  switch (safeAreaBottomColor) {
    case 'primary':
      bottomContainerStyle.backgroundColor = theme.colors.background.primary;
      break;
    case 'base':
      bottomContainerStyle.backgroundColor =
        theme.colors.dashboardGradient.color1;
      break;
    case 'transparent':
      bottomContainerStyle.backgroundColor = 'transparent';
      break;
    case 'default':
    default:
      bottomContainerStyle.backgroundColor = theme.colors.background.default;
  }

  return (
    <>
      <SafeAreaView style={topContinerStyle} />
      <SafeAreaView style={bottomContainerStyle}>{children}</SafeAreaView>
    </>
  );
};
