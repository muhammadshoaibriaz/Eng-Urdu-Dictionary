import React, {useEffect, useState} from 'react';
import Headers from '../custom/Headers';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import RNFS from 'react-native-fs';
import {font} from '../constants/font';
export default function Tenses({navigation, route}) {
  const [data, setData] = useState(null);
  useEffect(() => {
    readFile('tenses.json');
  }, []);
  const readFile = async fileName => {
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    try {
      const fileContents = await RNFS.readFile(filePath, 'utf8');
      console.log(fileContents);
      const parsedData = JSON.parse(fileContents);
      setData(parsedData.tenses);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };
  // console.log('data', data);
  return (
    <View style={styles.container}>
      <Headers navigation={navigation} route={route} />
      <View style={styles.flatList}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({item, index}) => {
            console.log('item is ', item);
            return (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate('Tense', {item});
                }}>
                <Text style={styles.english}>{item?.tense}</Text>
                <Text style={styles.urdu}>{item?.urdu_name}</Text>
              </TouchableOpacity>
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
  button: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flex: 1,
  },
  urdu: {
    fontSize: 16,
    color: '#333',
    // fontFamily: font.p_medium,
    textAlign: 'right',
  },
  english: {
    fontSize: 16,
    fontFamily: font.p_regular,
    color: '#333',
  },
});
