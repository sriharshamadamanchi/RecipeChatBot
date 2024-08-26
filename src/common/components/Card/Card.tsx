import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: theme.colors.background.default,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginVertical: moderateScale(8)
  },
  cardShadowStyle: {
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1
  }
});

interface cardType {
  onPress?: () => void;
  onLongPress?: () => void;
  children: any;
  style?: any;
  disabled?: boolean;
  useRipple?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}

export const Card = ({
  children,
  disabled,
  onPress,
  onLongPress,
  style,
  testID,
  accessibilityLabel
}: cardType) => {
  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.cardStyle, styles.cardShadowStyle, style]}>
      {children}
    </TouchableOpacity>
  );
};
