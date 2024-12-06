import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import {launchImageLibrary} from 'react-native-image-picker';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Dialog} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Tts from 'react-native-tts';
import words from '../../../wordsData.json';
import {Context} from '../context/AppContext';
import TouchableButton from '../custom/TouchableButton';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {addHistory} from '../redux/slices/historySlice';

// Main Component
export default function Home({navigation, route}) {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');
  const {setItem, pushToHistory} = useContext(Context);
  const dateTime = new Date();
  const date = dateTime.getDate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkDialogVisibility = async () => {
      const storedDate = await AsyncStorage.getItem('date');
      const currentDate = new Date().getDate();
      if (!storedDate || parseInt(storedDate) !== currentDate) {
        setVisible(true);
        await AsyncStorage.setItem('date', currentDate.toString());
      }
    };
    checkDialogVisibility();
  }, []);

  // Word of the Day logic
  const wordOfTheDay = [
    'Josher',
    'Weird',
    'Aching',
    'Abater',
    'Abductor',
    'Abeam',
    'Baalism',
    'Bacchae',
    'Cabalist',
    'Jabbered',
    'Jades',
    'Jadish',
  ];
  const randomQuote = Math.floor(Math.random() * wordOfTheDay.length);

  // Text-to-Speech Handler
  const speak = text => {
    Tts.speak(text);
  };

  const [results, setResults] = useState([]);
  const handleSearch = text => {
    setQuery(text);
    if (text.trim()) {
      const filteredWords = words.filter(item =>
        item.word.toLowerCase().startsWith(text.toLowerCase()),
      );
      setResults(filteredWords);
    } else {
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <StatusBar barStyle={'dark-content'} backgroundColor={'#f7f7f7'} />
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage}
        />
      </View>
      <View>
        <ScrollView>
          {/* Main Content */}
          <View style={styles.innerContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Thesaurus</Text>
            <Text style={styles.subtitle}>
              Find synonyms, antonyms, and related words
            </Text>
            {/* Search Bar */}
            <View style={styles.inputBar}>
              <View style={styles.searchContainer}>
                <AntDesign name="search1" size={20} />
                <TextInput
                  value={query}
                  onChangeText={handleSearch}
                  placeholder="Search by word"
                  style={styles.input}
                />
              </View>
              <Feather name="mic" color="#999" size={20} />
            </View>
          </View>
        </ScrollView>
      </View>
      {query.length > 0 ? (
        <View style={styles.resultArea}>
          {query?.length > 0 && (
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
          )}
        </View>
      ) : (
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.btnWrapper}>
            <View style={styles.wrapper}>
              <TouchableButton
                icon={require('../../assets/images/icon1.png')}
                title={'Learn English'}
                onPress={() => navigation.navigate('Learn')}
              />
              <TouchableButton
                icon={require('../../assets/images/icon2.png')}
                title={'Chat'}
                onPress={() => navigation.navigate('Conversation')}
              />
              <TouchableButton
                icon={require('../../assets/images/scanner.png')}
                title={'Extract text from image (OCR)'}
                onPress={() => navigation.navigate('ImageProcess')}
              />
              <TouchableButton
                icon={require('../../assets/images/quiz.png')}
                title={'Take Quiz'}
                onPress={() => navigation.navigate('Quiz')}
              />
            </View>
          </ScrollView>
        </View>
      )}
      {/* Word of the Day Dialog */}
      <Dialog
        isVisible={visible}
        overlayStyle={styles.dialogOverlay}
        animationType="slide"
        statusBarTranslucent={true}
        onDismiss={() => setVisible(false)}
        onRequestClose={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}>
        <View style={styles.containerWrapper}>
          <Text style={styles.title}>Word of the Day</Text>
          <Text style={styles.description}>
            Build your vocabulary with new words and definitions every day of
            the week.
          </Text>

          {/* Word Card */}
          <LinearGradient
            start={{x: 0.1, y: 0.5}}
            locations={[0.0, 0.9]}
            colors={['#1c014f', '#110032']}
            style={styles.cardView}>
            <View>
              <View style={styles.card}>
                <Text style={styles.word}>{wordOfTheDay[randomQuote]}</Text>
                <TouchableOpacity
                  style={styles.volumeButton}
                  onPress={() => speak(wordOfTheDay[randomQuote])}>
                  <FontAwesome name="volume-up" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.wordDetails}>
                <Text style={styles.highlightText}>Show IPA</Text>
                <Text style={styles.ipaText}>[am.bi.sin.un.ster]</Text>
              </View>
              <Text style={styles.definition}>
                clumsy or unskillful with both hands.
              </Text>
              <TouchableOpacity style={styles.history}>
                <Text style={styles.showMoreText}>Show More</Text>
                <FontAwesome
                  name="angle-down"
                  color="#fe3377"
                  size={20}
                  style={styles.showMoreIcon}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Close Button */}
          <LinearGradient
            start={{x: 0.1, y: 0.5}}
            colors={['#fe3388', '#fe3366']}
            style={styles.closeButton}>
            <TouchableOpacity
              onPress={async () => {
                setVisible(false);
                await AsyncStorage.setItem('date', date);
              }}
              style={styles.barBtn}>
              <AntDesign name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Images
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  image: {
    width: 200,
    height: 200,
  },

  // Text
  title: {
    fontSize: 26,
    marginVertical: 20,
    fontFamily: font.p_sm_bold,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
    width: '60%',
    marginBottom: 15,
    fontFamily: font.p_regular,
  },
  description: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
    width: '100%',
    marginBottom: 15,
    fontFamily: font.p_regular,
  },
  word: {
    fontSize: 22,
    color: '#fff',
    fontFamily: font.p_sm_bold,
  },
  ipaText: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: '800',
  },
  highlightText: {
    color: '#fe3377',
    fontWeight: '800',
  },
  definition: {
    color: '#999',
    marginTop: 10,
    fontFamily: font.p_regular,
  },

  // Search Bar
  inputBar: {
    width: '85%',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: 8,
    fontFamily: font.p_regular,
    top: 3,
  },

  // Dialog
  dialogOverlay: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 0,
    position: 'absolute',
    bottom: 0,
  },
  containerWrapper: {
    alignItems: 'center',
    height: 500,
    position: 'relative',
  },
  cardView: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    elevation: 20,
    marginTop: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wordDetails: {
    flexDirection: 'row',
    marginTop: 10,
  },
  history: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  showMoreText: {
    color: '#fe3377',
  },
  showMoreIcon: {
    marginLeft: 5,
    marginTop: 3,
  },

  // Buttons
  volumeButton: {
    marginTop: 0,
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: '#fe3377',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    width: 50,
    height: 50,
    elevation: 10,
    shadowColor: '#fe3377',
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  barBtn: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  resultArea: {
    flex: 1,
  },
  wrapper: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 20,
  },
  btnWrapper: {
    paddingBottom: 60,
  },
});
