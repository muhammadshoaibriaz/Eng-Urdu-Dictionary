import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font} from '../constants/font';

const LearnButton = ({imageUrl, titleEng, titleUrd, onPress, style}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.wrapper}>
        <Image source={imageUrl} style={styles.image} />
        <Text
          allowFontScaling={true}
          minimumFontScale={16}
          style={styles.english}>
          {titleEng}
        </Text>
      </View>
      <Text style={styles.urdu}>{titleUrd}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 6,
    marginVertical: 3,
  },
  english: {
    marginLeft: 14,
    fontFamily: font.p_medium,
  },
  urdu: {
    fontWeight: '800',
    color: '#555',
    textAlign: 'right',
    marginTop: 2,
    // backgroundColor: 'red',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default LearnButton;
