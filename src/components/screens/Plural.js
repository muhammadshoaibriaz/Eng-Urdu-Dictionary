import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Headers from '../custom/Headers';
import {font} from '../constants/font';
import RNFS from 'react-native-fs';
export default function Plural({navigation, route}) {
  const [data, setData] = useState(null);
  useEffect(() => {
    readFile('singular.json');
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
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({item, index}) => {
            return (
              <View style={styles.cardWrapper} key={index?.toString()}>
                <View style={styles.row}>
                  <Text style={styles.english}>{item?.singular}</Text>
                  <Text style={styles.urdu}>{item?.plural}</Text>
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
    textTransform: 'capitalize',
    fontSize: 18,
    color: '#888',
    fontFamily: font.p_regular,
  },
  urdu: {
    fontSize: 18,
    fontFamily: font.p_regular,
    color: '#999',
    textTransform: 'capitalize',
  },
  cardWrapper: {
    marginHorizontal: 14,
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 6,
    padding: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flatList: {
    flex: 1,
  },
});
