import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {font} from '../constants/font';
import {addHistory} from '../redux/slices/historySlice';
import {Context} from '../context/AppContext';
import {useDispatch} from 'react-redux';

export default function SearchResults({results, navigation}) {
  const {setItem} = useContext(Context);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={results}
      style={styles.flatListStyle}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => {
              navigation.navigate('Details', {item});
              setItem(item);
              dispatch(addHistory(item));
            }}>
            <Text style={styles.text}>{item?.word}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  flatListStyle: {
    marginTop: 10,
  },
  contentContainerStyle: {
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  touchableButton: {
    paddingVertical: 10,
    marginTop: 2,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  text: {
    textTransform: 'capitalize',
    fontFamily: font.p_regular,
  },
});
