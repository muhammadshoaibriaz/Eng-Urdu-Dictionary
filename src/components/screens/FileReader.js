import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Tts from 'react-native-tts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFS, {read} from 'react-native-fs';

// json imports
import bodyParts from '../jsons/bodyParts.json';
import sayHello from '../jsons/sayHello.json';
import disasters from '../jsons/disaster.json';
import complaints from '../jsons/complaints.json';
import routine from '../jsons/routine.json';
import clothing from '../jsons/clothing.json';
import hobbies from '../jsons/hobbies.json';
import goodbye from '../jsons/goodbye.json';
import family from '../jsons/family.json';
import sports from '../jsons/sports.json';

export default function FileReader({route, navigation}) {
  const {item} = route?.params;
  // console.log(item?.titleEng);
  const file = item?.file;
  // console.log(file);

  // const data = () => {
  //   if (title === 'Body parts') {
  //     return bodyParts;
  //   }
  //   if (title === 'Common ways to say hello') {
  //     return sayHello;
  //   }
  //   if (title === 'Disasters') {
  //     return disasters;
  //   }
  //   if (title === 'Making Complaints') {
  //     return complaints;
  //   }
  //   if (title === 'Daily Routines') {
  //     return routine;
  //   }
  //   if (title === 'Clothing Related actions') {
  //     return clothing;
  //   }
  //   if (title === 'Most Common ways to say goodbye') {
  //     return goodbye;
  //   }
  //   if (title === 'Hobbies') {
  //     return hobbies;
  //   }
  //   if (title === 'Family') {
  //     return family;
  //   }
  //   if (title === 'Sports') {
  //     return sports;
  //   }
  // };

  const handleCopy = text => {
    Clipboard.setString(text);
  };

  const [data, setData] = useState(null);
  useEffect(() => {
    readFile(file);
  }, []);
  const readFile = async fileName => {
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    try {
      const fileContents = await RNFS.readFile(filePath, 'utf8');
      // console.log(JSON.parse(fileContents));
      setData(JSON.parse(fileContents));
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{item?.titleEng}</Text>
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({item, index}) => {
            // console.log(item);
            return (
              <View style={styles.cardWrapper} key={index?.toString()}>
                <View style={styles.btns}>
                  <TouchableOpacity
                    style={styles.volumeBtn}
                    onPress={() => {
                      // Tts.speak(item?.name + item?.name_urdu)
                      handleCopy(item?.name + item?.name_urdu);
                    }}>
                    <Ionicons name="copy-outline" size={20} color={'#999'} />
                  </TouchableOpacity>
                  <View style={styles.row}>
                    <Text style={styles.english}>{item?.name}</Text>
                    <Text style={styles.urdu}>{item?.name_urdu}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.volumeBtn}
                    onPress={() => Tts.speak(item?.name + item?.name_urdu)}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    alignSelf: 'center',
  },

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
