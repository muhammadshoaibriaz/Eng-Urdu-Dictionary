import {View, Text, StyleSheet, FlatList, TextInput} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Context} from '../context/AppContext';
import RNFS from 'react-native-fs';
export default function Thesarus({navigation}) {
  const [data, setData] = useState(null);
  const [results, setResults] = useState([]);
  const handleSearch = text => {
    const filteredWords = data.filter(item =>
      item.word.toLowerCase().startsWith(text.toLowerCase()),
    );
    setResults(filteredWords);
    // console.log(filteredWords);
  };

  const {setItem} = useContext(Context);
  useEffect(() => {
    readFile('wordsData.json');
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
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.inputBar}>
        <View style={styles.searchContainer}>
          <AntDesign
            onPress={() => navigation.navigate('Details')}
            name="search1"
            size={20}
          />
          <TextInput
            placeholder="Search by word"
            style={styles.input}
            onChangeText={handleSearch}
          />
        </View>
        <Feather name="mic" color="#999" size={20} />
      </View>
      <View style={styles.resultArea}>
        <FlatList
          data={results ? data : results}
          style={styles.flatListStyle}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={() => {
                  setItem(item);
                  navigation.navigate('Details', {item});
                }}>
                <Text style={styles.text}>{item?.word}</Text>
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
  inputBar: {
    width: '90%',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 0.92,
    height: '100%',
    paddingLeft: 8,
  },
  resultArea: {
    flex: 1,
  },
  flatListStyle: {
    marginTop: 10,
  },
  contentContainerStyle: {
    paddingBottom: 60,
    paddingHorizontal: 18,
  },
  touchableButton: {
    paddingVertical: 10,
    marginTop: 2,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  text: {
    textTransform: 'capitalize',
  },
});
