import { StyleSheet, TextInput, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../theme';
import Voice from '@react-native-voice/voice';
import React from 'react';
import { SPEECH, useVoiceControl } from './hooks';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: moderateScale(20)
  },
  textInputStyle: {
    backgroundColor: theme.colors.background.default,
    borderRadius: moderateScale(50),
    width: '70%',
    height: moderateScale(45),
    paddingHorizontal: moderateScale(20),
    fontSize: moderateScale(16),
    fontFamily: theme.fonts.medium,
    marginHorizontal: moderateScale(10),
    color: theme.colors.font.primary
  },
  microphoneStyle: {
    marginLeft: moderateScale(10),
    marginRight: moderateScale(20)
  },
  lottieStyles: {
    position: 'absolute',
    height: moderateScale(100),
    width: moderateScale(100),
    bottom: moderateScale(-35),
    right: moderateScale(-24)
  }
});

export const Search = ({
  value,
  onChangeValue,
  onSubmit
}: {
  value: string;
  onChangeValue: (value: string) => void;
  onSubmit: (value: string) => void;
}) => {
  const { setVoice, status, setStatus } = useVoiceControl(onChangeValue);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter recipe name"
        placeholderTextColor={theme.colors.font.secondary}
        value={value}
        style={styles.textInputStyle}
        maxFontSizeMultiplier={1.2}
        onChangeText={onChangeValue}
      />
      <View>
        <FontAwesome
          style={styles.microphoneStyle}
          name="microphone"
          color={theme.colors.background.base}
          size={moderateScale(24)}
          onPress={() => {
            setVoice('');
            setStatus(null);
            Voice.start('en-US');
          }}
        />
        {status === SPEECH.START && (
          <LottieView
            speed={0.9}
            style={[styles.lottieStyles]}
            source={require('../../theme/lottie/ripple.json')}
            autoPlay
            loop
            colorFilters={[
              {
                keypath: 'wave03',
                color: theme.colors.font.base
              },
              {
                keypath: 'wave02',
                color: theme.colors.font.base
              },
              {
                keypath: 'wave01',
                color: theme.colors.font.base
              }
            ]}
          />
        )}
      </View>
      <Ionicons
        name="send"
        color={theme.colors.background.base}
        size={moderateScale(24)}
        onPress={() => {
          if (value.trim().length > 0) {
            onSubmit(value);
          }
        }}
      />
    </View>
  );
};
