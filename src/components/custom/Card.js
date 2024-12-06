import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {font} from '../constants/font';
import {useDispatch} from 'react-redux';

export default function Card({item, handleSpeak, onPress, icon, route}) {
  return (
    <LinearGradient
      start={{x: 0.1, y: 0.5}}
      locations={[0.0, 0.9]}
      colors={['#1c014f', '#110032']}
      style={styles.cardView}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item?.word}</Text>
        <TouchableOpacity
          style={styles.speakerButton}
          onPress={() => handleSpeak(item?.word)}>
          <FontAwesome name="volume-up" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.urduMeaning}>{item?.urduMeaning}</Text>
      <Text style={styles.usageNotes}>{item?.usageNotes}</Text>
      <View style={styles.cardSubHeader}>
        <Text style={styles.highlightedText}>Pronounciation</Text>
        <Text style={styles.cardPhonetic}>{item?.pronunciation}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.heartButton,
          {display: route?.name === 'History' ? 'none' : 'flex'},
        ]}
        onPress={onPress}>
        <Ionicons name={icon} size={20} color="#999" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    marginTop: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    textTransform: 'capitalize',
    flex: 1,
    // backgroundColor: 'red',
  },
  speakerButton: {
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: '#fe3377',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSubHeader: {
    flexDirection: 'row',
    marginTop: 10,
  },
  highlightedText: {
    color: '#fe3377',
    fontWeight: '800',
  },
  cardPhonetic: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: '800',
  },

  heartButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 14,
    position: 'absolute',
    right: 14,
  },
  urduMeaning: {
    fontSize: 15,
    color: '#fff',
    flex: 1,
  },
  usageNotes: {
    fontSize: 13,
    color: 'white',
    flex: 1,
    marginTop: 4,
    fontFamily: font?.p_regular,
  },
});
