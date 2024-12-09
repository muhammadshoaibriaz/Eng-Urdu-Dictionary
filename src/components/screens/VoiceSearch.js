import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import RNSpeechToText from 'react-native-speech-to-text';

export default function VoiceSearch({requestMicrophonePermission}) {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');

  // Start Listening
  const startSpeechToText = async () => {
    try {
      const result = await RNSpeechToText.startSpeech(
        'en-US', // Language code
        true, // Show recognition prompt
      );
      console.log('Speech Result:', result);
    } catch (error) {
      console.error('Error in speech-to-text:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recognized Text: {text}</Text>
      <Button
        title={isListening ? 'Stop Listening' : 'Start Voice Search'}
        onPress={isListening ? startSpeechToText : startSpeechToText}
      />
      <Button
        title="Request Microphone Permission"
        onPress={requestMicrophonePermission}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
