import React, {useContext} from 'react';
import {FlatList, StatusBar, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import Card from '../custom/Card';
import Tts from 'react-native-tts';
import {font} from '../constants/font';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import {clearHistory} from '../redux/slices/historySlice';

export default function History({route, navigation}) {
  const history = useSelector(state => state.history);
  // console.log('object', history);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <Button textColor="#999" onPress={() => dispatch(clearHistory())}>
          Clear history
        </Button>
      </View>
      <View style={styles.flatList}>
        {history?.length < 1 ? (
          <View style={styles.notFound}>
            <Text style={styles.innerData}>No history data found!</Text>
          </View>
        ) : (
          <FlatList
            data={history}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.word}
            contentContainerStyle={{paddingBottom: 70}}
            renderItem={({item, index}) => {
              // console.log(item);
              return (
                <Card
                  item={item}
                  key={index}
                  icon={'trash-bin-outline'}
                  handleSpeak={() => Tts.speak(item?.word)}
                  route={route}
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
    justifyContent: 'space-between',
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
