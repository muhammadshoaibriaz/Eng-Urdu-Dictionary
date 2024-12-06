import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {font} from '../constants/font';
import Headers from '../custom/Headers';
import LottieView from 'lottie-react-native';
export default function ImageProcess({navigation, route}) {
  const [image, setImage] = useState(null);
  var [text, setText] = useState('');
  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    setImage(result.assets[0].uri);
  };

  useEffect(() => {
    if (image) {
      extractTextFromImage(image);
    }
  }, [image]);

  const extractTextFromImage = async imageUrl => {
    const result = await TextRecognition.recognize(imageUrl);
    setText(result.text);
    for (let block of result.blocks) {
      text += block.text + '\n';
    }
    // console.log('Recognized text:', result.text);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <Headers navigation={navigation} route={route} />
      {!image ? (
        <View style={styles.wrapper}>
          <Button
            onPress={pickImage}
            mode="elevated"
            contentStyle={{backgroundColor: 'white'}}>
            Choose image
          </Button>
        </View>
      ) : (
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{!text ? 'No text in image' : text}</Text>
          <Text
            style={[styles.text, {textAlign: 'center', marginTop: 10}]}
            onPress={pickImage}>
            Pick Image
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  text: {
    fontFamily: font.p_regular,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
