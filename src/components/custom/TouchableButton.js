import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {font} from '../constants/font';

export default function TouchableButton({title, icon, onPress}) {
  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={icon} style={styles.image} />
      </View>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  imageWrapper: {
    width: 40,
    height: 40,
  },
  image: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  buttonText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: font.p_medium,
  },
});
