import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Headers from '../custom/Headers';
import Tts from 'react-native-tts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import {font} from '../constants/font';

import * as Animatable from 'react-native-animatable';

export default function Chats({navigation, route}) {
  const {item} = route?.params;
  const file = item?.name;
  // console.log('file', file);
  const [data, setData] = useState(null);
  useEffect(() => {
    readFile(file);
  }, []);
  const readFile = async fileName => {
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    try {
      const fileContents = await RNFS.readFile(filePath, 'utf8');
      setData(JSON.parse(fileContents));
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Headers navigation={navigation} route={route} />
      <View style={styles.flatList}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item, index}) => {
            return (
              <Animatable.View
                animation={'fadeInUp'}
                delay={index * 100}
                style={styles.cardWrapper}
                key={index}>
                <View style={styles.row}>
                  <Text style={styles.english}>
                    <Text style={styles.colored}>{item?.person + '! '}</Text>
                    {item?.message}
                  </Text>
                  <TouchableOpacity
                    style={styles.volumeBtn}
                    onPress={() => {
                      Tts.stop(true);
                      Tts.speak(item?.message + item?.message_urdu);
                    }}>
                    <Ionicons name="volume-high" size={20} color={'#fe3377'} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.urdu}>{item?.message_urdu}</Text>
              </Animatable.View>
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
  flatList: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 6,
  },
  english: {
    fontSize: 16,
    flex: 1,
    color: '#777',
    fontFamily: font.p_regular,
  },
  urdu: {
    marginTop: 8,
    textAlign: 'right',
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
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#BBDEFB50',
    // backgroundColor: 'red',
    borderRadius: 6,
    paddingLeft: 8,
    paddingVertical: 8,
  },
  colored: {
    color: '#000',
  },
});
