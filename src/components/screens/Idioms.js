import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Headers from '../custom/Headers';
import idioms from '../jsons/idioms.json';
import Tts from 'react-native-tts';
import Clipboard from '@react-native-clipboard/clipboard';
export default function Idioms({navigation, route}) {
  const handleCopy = text => {
    Clipboard.setString(text);
  };

  return (
    <View style={styles.container}>
      <Headers navigation={navigation} route={route} />
      <View style={styles.flatList}>
        <FlatList
          data={idioms}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({item, index}) => {
            return (
              <View style={styles.cardWrapper} key={index?.toString()}>
                <View style={styles.btns}>
                  <TouchableOpacity
                    style={styles.volumeBtn}
                    onPress={() => {
                      handleCopy(item?.idiom_english + ' ' + item?.idiom);
                    }}>
                    <Ionicons name="copy-outline" size={20} color={'#999'} />
                  </TouchableOpacity>
                  <View style={styles.row}>
                    <Text style={styles.english}>{item?.idiom_english}</Text>
                    <Text style={styles.urdu}>{item?.idiom}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.volumeBtn}
                    onPress={() => {
                      Tts.speak(item?.idiom_english + ' ' + item?.idiom);
                    }}>
                    <Ionicons name="volume-high" size={20} color={'#999'} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  english: {
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  urdu: {
    marginTop: 6,
    fontSize: 18,
    textAlign: 'center',
  },
  volumeBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  cardWrapper: {
    marginHorizontal: 14,
    backgroundColor: '#fff',
    marginVertical: 4,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  btns: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
