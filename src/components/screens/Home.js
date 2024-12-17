import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ToastAndroid,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Dialog} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Tts from 'react-native-tts';
import TouchableButton from '../custom/TouchableButton';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import {ProgressBar} from 'react-native-paper';
import SearchResults from '../custom/SearchResults';

// Main Component
export default function Home({navigation, route}) {
  const [visible, setVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [query, setQuery] = useState('');
  const dateTime = new Date();
  const date = dateTime.getDate();

  // for downloading files
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState({});
  const [allDownloaded, setAllDownloaded] = useState(false);

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
      const filteredWords = data.filter(item =>
        item.word.toLowerCase().startsWith(text.toLowerCase()),
      );
      setResults(filteredWords);
    } else {
      setResults([]);
    }
  };

  const fileUrls = [
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/talk.json',
      name: 'talk.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/clothing.json',
      name: 'clothing.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/complaints.json',
      name: 'complaints.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/bodyParts.json',
      name: 'bodyParts.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/coupleChat.json',
      name: 'coupleChat.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/crush.json',
      name: 'crush.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/disagreement.json',
      name: 'disagreement.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/disaster.json',
      name: 'disaster.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/family.json',
      name: 'family.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/goodbye.json',
      name: 'goodbye.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/hobbies.json',
      name: 'hobbies.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/idioms.json',
      name: 'idioms.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/jobInterview.json',
      name: 'jobInterview.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/love.json',
      name: 'love.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/meetup.json',
      name: 'meetup.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/passengers.json',
      name: 'passengers.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/poetry.json',
      name: 'poetry.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/proposal.json',
      name: 'proposal.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/romantic.json',
      name: 'romantic.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/routine.json',
      name: 'routine.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/sayHello.json',
      name: 'sayHello.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/singular.json',
      name: 'singular.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/sports.json',
      name: 'sports.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/tenses.json',
      name: 'tenses.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/trip.json',
      name: 'trip.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/src/components/jsons/wedding.json',
      name: 'wedding.json',
    },
    {
      url: 'https://raw.githubusercontent.com/muhammadshoaibriaz/Eng-Urdu-Dictionary/master/wordsData.json',
      name: 'wordsData.json',
    },
  ];

  const downloadFiles = async () => {
    setDownloading(true);
    // setProgress({});
    let allDownloaded = true;

    for (let i = 0; i < fileUrls.length; i++) {
      const {url, name} = fileUrls[i];
      const filePath = `${RNFS.DocumentDirectoryPath}/${name}`;

      try {
        const download = RNFS.downloadFile({
          fromUrl: url,
          toFile: filePath,
          progress: res => {
            const percentage = Math.floor(
              (res.bytesWritten / res.contentLength) * 100,
            );
            setProgress(prev => ({
              ...prev,
              [name]: percentage,
            }));
          },
          progressDivider: 0,
        });

        const result = await download.promise;
        // console.log('result', result);

        if (result.statusCode !== 200) {
          Alert.alert(
            `Download Failed for ${name}`,
            `Status Code: ${result.statusCode}`,
          );
          allDownloaded = false;
          break;
        }
      } catch (error) {
        Alert.alert(`Error downloading ${name}`, error.message);
        allDownloaded = false;
        break;
      }
    }

    setDownloading(false);
    setAllDownloaded(allDownloaded);

    if (allDownloaded) {
      Alert.alert('Success', 'All files have been downloaded!');
    }
  };

  useEffect(() => {
    // Check if all files exist locally
    const checkFilesExist = async () => {
      for (let i = 0; i < fileUrls.length; i++) {
        const {name} = fileUrls[i];
        const filePath = `${RNFS.DocumentDirectoryPath}/${name}`;
        // console.log('filePath names', filePath);
        const exists = await RNFS.exists(filePath);
        if (!exists) {
          setAllDownloaded(false);
          setDialogVisible(true);
          return;
        }
      }
      setAllDownloaded(true);
    };

    checkFilesExist();
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    readFile('wordsData.json');
  }, []);
  const readFile = async fileName => {
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    // console.log(filePath);
    try {
      const fileContents = await RNFS.readFile(filePath, 'utf8');
      console.log('fileContents', fileContents);
      const parsedData = JSON.parse(fileContents);
      setData(parsedData);
      console.log('parsedData', parsedData);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <StatusBar barStyle={'dark-content'} backgroundColor={'#f7f7f7'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
          />
        </TouchableOpacity>
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
            <SearchResults
              navigation={navigation}
              results={results}
              key={'SearchResults'}
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
                onPress={() => {
                  navigation.navigate('Quiz');
                  // setDialogVisible(true);
                }}
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
      {/* Dialog box for file downloading */}
      {!allDownloaded && (
        <Dialog
          isVisible={dialogVisible}
          overlayStyle={styles.dialogOverlay1}
          animationType="fade"
          statusBarTranslucent={true}>
          <View style={styles.containerWrapper1}>
            <Text style={styles.title1}>Info!</Text>
            <Text style={styles.description1}>
              Please take a while to download files for offline use. Ensure that
              you are connected to internet.
            </Text>
            {downloading ? (
              <View style={styles.progress}>
                {fileUrls.map(file => {
                  return (
                    <View key={file.name}>
                      <ProgressBar
                        progress={(progress[file.name] || 0) / 100}
                        animatedValue={1}
                        visible={true}
                        fillStyle={{backgroundColor: 'orange'}}
                        style={{marginTop: 4}}
                      />
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // setDialogVisible(false);
                    ToastAndroid.show('بھائی کر لے ڈاونلوڈ پلیز 🙏🏻', 3000);
                  }}
                  style={[
                    styles.button,
                    {
                      borderWidth: 1,
                      backgroundColor: 'transparent',
                      borderColor: '#ddd',
                    },
                  ]}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={downloadFiles}
                  style={[
                    styles.button,
                    {
                      borderWidth: 1,
                      backgroundColor: 'teal',
                      borderColor: '#ddd',
                    },
                  ]}>
                  <Text style={[styles.buttonText, {color: '#fff'}]}>
                    Download
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Dialog>
      )}
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
  title1: {
    fontSize: 26,
    fontFamily: font.p_sm_bold,
    textAlign: 'left',
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
  description1: {
    fontSize: 16,
    opacity: 0.6,
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
  dialogOverlay1: {
    width: '90%',
    backgroundColor: '#fff',
  },
  containerWrapper: {
    alignItems: 'center',
    height: 500,
    position: 'relative',
  },
  containerWrapper1: {
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
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  button: {
    width: '45%',
    height: 45,
    borderRadius: 50,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: font.p_regular,
    top: 3,
  },
  downloadText: {
    fontFamily: font.p_regular,
    fontStyle: 'italic',
    fontSize: 16,
  },
});
