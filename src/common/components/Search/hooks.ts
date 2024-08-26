import React from 'react';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import Toast from 'react-native-root-toast';

export enum SPEECH {
  START,
  END,
  ERROR
}

export const useVoiceControl = (onChangeValue: (val: string) => void) => {
  const [voice, setVoice] = React.useState('');
  const [status, setStatus] = React.useState<SPEECH | null>();

  React.useEffect(() => {
    Voice.onSpeechStart = () => {
      Toast.show('Start speaking', { duration: Toast.durations.SHORT });
      setStatus(SPEECH.START);
    };

    Voice.onSpeechError = () => {
      Toast.show('Please try again', {
        duration: Toast.durations.SHORT
      });
      setStatus(SPEECH.ERROR);
    };

    Voice.onSpeechEnd = () => {
      Toast.show('Voice recognition stopped', {
        duration: Toast.durations.SHORT
      });
      setStatus(SPEECH.END);
    };

    Voice.onSpeechResults = (event: SpeechResultsEvent) => {
      onChangeValue(event.value?.join('') ?? '');
    };
  }, [onChangeValue]);

  return {
    voice,
    setVoice,
    status,
    setStatus
  };
};
