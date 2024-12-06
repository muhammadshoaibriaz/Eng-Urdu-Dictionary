import {View, StyleSheet, FlatList, StatusBar, Text} from 'react-native';
import React, {useContext} from 'react';
import Card from '../custom/Card';
import Tts from 'react-native-tts';
import {font} from '../constants/font';
import {useDispatch, useSelector} from 'react-redux';
import {removeFavorite} from '../redux/slices/favoriteSlice';
export default function Favorite() {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorite);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      <View style={styles.flatList}>
        {favorites?.length < 1 ? (
          <View style={styles.notFound}>
            <Text style={styles.innerData}>No favorite data found!</Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            style={styles.flatListStyle}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({item, index}) => {
              return (
                <Card
                  item={item}
                  icon={'trash-bin-outline'}
                  handleSpeak={() => Tts.speak(item?.word)}
                  onPress={() => dispatch(removeFavorite(item))}
                />
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 80,
  },

  flatList: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: font.p_sm_bold,
    fontSize: 15,
    top: 2,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    backgroundColor: '#fff',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerData: {
    textAlign: 'center',
    fontFamily: font.p_medium,
    fontSize: 16,
  },
});
