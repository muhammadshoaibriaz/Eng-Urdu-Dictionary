import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {font} from '../constants/font';
export default function Splash(d) {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('AppNavigator');
    }, 5000);
  });
  return (
    <View style={styles.container}>
      <Animatable.Image
        animation={'fadeIn'}
        duration={2000}
        style={styles.image}
        source={require('../../assets/images/logo.png')}
      />
      <Animatable.Text
        animation={'slideInUp'}
        duration={2000}
        style={styles.title}>
        Dictionary
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 260,
    height: 260,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
  },
  title: {
    fontSize: 24,
    fontFamily: font.p_sm_bold,
    color: '#333',
  },
});
