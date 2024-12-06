import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tts from 'react-native-tts';
import word from '../../../wordsData.json';
import {Context} from '../context/AppContext';
import Card from '../custom/Card';
import {font} from '../constants/font';
import {useDispatch} from 'react-redux';
import {addFavorite} from '../redux/slices/favoriteSlice';
import {addHistory} from '../redux/slices/historySlice';

export default function Details({navigation, route}) {
  const [value, setValue] = useState(1); // State to control the active tab
  const {item, setItem, pushToFavorites} = useContext(Context);
  const dispatch = useDispatch();

  // Definitions Component
  function Definitions() {
    const data = item;
    return (
      <View style={styles.centeredContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.smallTitle}>Definitions</Text>
          {item?.definitions?.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 6,
                }}
                key={index}>
                <Text style={{width: 20}}>{index + 1}.</Text>
                <Text style={styles.text}>{item}</Text>
              </View>
            );
          })}
        </View>
        {data?.derivedForms?.map((item, index) => {
          return (
            <View style={styles.resultCard} key={index}>
              <Text style={styles.smallTitle}>{item?.partOfSpeech}</Text>
              <Text style={styles.text}>
                Derived from <Text style={styles.form}>{item?.form}</Text>
              </Text>

              <View style={{flexDirection: 'row'}} key={index}>
                <Text style={{width: 20}}>{index + 1}.</Text>
                <Text style={styles.text}>{item?.definition}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  // Synonyms Component
  function Synonyms() {
    return (
      <View style={styles.centeredContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.smallTitle}>Synonyms</Text>
          <View style={styles.row}>
            {item?.synonyms?.map((item, index) => (
              <Text key={index} style={styles.smallText}>
                {item + ', '}
              </Text>
            ))}
          </View>
          <Text style={[styles.smallTitle, {marginBottom: 2, marginTop: 14}]}>
            Related words
          </Text>
          <View style={styles.row}>
            {item?.relatedWords?.map((item, index) => (
              <Text key={index} style={styles.smallText}>
                {item + ', '}
              </Text>
            ))}
          </View>
          <Text style={[styles.smallTitle, {marginBottom: 2, marginTop: 14}]}>
            Categories
          </Text>
          <View style={styles.row}>
            {item?.categories?.map((item, index) => (
              <Text key={index} style={styles.smallText}>
                {item + ', '}
              </Text>
            ))}
          </View>
          <Text style={[styles.smallTitle, {marginBottom: 2, marginTop: 14}]}>
            tags
          </Text>
          <View style={styles.row}>
            {item?.tags?.map((item, index) => (
              <Text key={index} style={styles.smallText}>
                {item + ', '}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  }

  // Antonyms Component
  function Antonyms() {
    return (
      <View style={styles.centeredContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.smallTitle}>Antonyms</Text>
          <View style={styles.row}>
            {item?.antonyms?.map((item, index) => (
              <Text key={index} style={styles.smallText}>
                {item + ', '}
              </Text>
            ))}
          </View>
          <Text style={[styles.smallTitle, {marginTop: 20}]}>Examples</Text>
          {item?.examples?.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 6,
              }}
              key={index}>
              <Text style={{width: 20}}>{index + 1}.</Text>
              <Text style={styles.smallText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  // Dynamically render the selected tab's content
  const renderContent = () => {
    if (value === 1) return <Definitions />;
    if (value === 2) return <Synonyms />;
    return <Antonyms />;
  };

  // Button labels for the tab navigation
  const tabLabels = ['Definitions', 'Synonyms', 'Antonyms'];

  const handleSpeak = text => {
    Tts.setDefaultVoice('en-US');
    Tts.stop(true);
    Tts.speak(text);
  };

  const [search, setSearch] = useState(item?.word);
  const [filteredResults, setFilteredResults] = useState([]);
  const onChangeText = text => {
    setSearch(text);
    const filteredData = word.filter(query =>
      query.word.toLowerCase().startsWith(text.toLowerCase()),
    );
    setFilteredResults(filteredData);
  };

  const handleSelect = items => {
    setItem(items);
    setSearch(items?.word);
    setFilteredResults([]);
  };
  const addToFavorite = favItem => {
    dispatch(addFavorite(favItem));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#555" />
        </TouchableOpacity>
        <View style={styles.inputBar}>
          <View style={styles.inputContainer}>
            <AntDesign name="search1" color="#999" size={18} />
            <TextInput
              value={search}
              style={styles.input}
              onChangeText={onChangeText}
            />
          </View>
          <TouchableOpacity style={styles.closeButton}>
            <AntDesign
              name="closecircle"
              color="#999"
              size={20}
              onPress={() => setSearch('')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          {/* Header Section */}
          <View style={styles.flatListStyle}>
            {search.length > 0 &&
              filteredResults.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    handleSelect(item);
                    dispatch(addHistory(item));
                  }}
                  key={index}
                  style={styles.searchedItem}>
                  <Text>{item?.word}</Text>
                </TouchableOpacity>
              ))}
          </View>
          {/* Word Card */}
          <Card
            onPress={() => addToFavorite(item)}
            handleSpeak={handleSpeak}
            item={item}
            icon={'heart-outline'}
            key={'wordCard'}
          />

          {/* Tab Buttons */}
          <View style={styles.tabContainer}>
            {tabLabels.map((label, index) => (
              <Text
                key={label}
                onPress={() => setValue(index + 1)}
                style={[
                  styles.tabText,
                  {opacity: value === index + 1 ? 1 : 0.4},
                ]}>
                {label}
              </Text>
            ))}
          </View>

          {/* Tab Content */}
          {renderContent()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  inputBar: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    paddingLeft: 14,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: 8,
    fontFamily: font.p_regular,
  },
  cardView: {
    marginHorizontal: 20,
    width: '90%',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    marginTop: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    textTransform: 'capitalize',
    flex: 1,
    // backgroundColor: 'red',
  },
  speakerButton: {
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: '#fe3377',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSubHeader: {
    flexDirection: 'row',
    marginTop: 10,
  },
  highlightedText: {
    color: '#fe3377',
    fontWeight: '800',
  },
  cardPhonetic: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: '800',
  },
  tabContainer: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 20,
  },
  tabText: {
    fontFamily: font.p_medium,
    fontSize: 16,
  },
  centeredContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    marginTop: 20,
    shadowColor: '#ddd',
  },
  smallTitle: {
    fontFamily: font.p_medium,
    opacity: 0.5,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  text: {
    fontFamily: font.p_regular,
    color: '#444',
    flex: 1,
  },
  secondaryText: {
    color: '#999',
  },
  marginTop20: {
    marginTop: 20,
  },
  urduMeaning: {
    fontSize: 15,
    color: 'white',
    marginTop: 4,
  },

  form: {
    fontStyle: 'italic',
    color: '#fe3366',
    fontFamily: font.p_regular,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallText: {
    textTransform: 'capitalize',
    margin: 0,
    padding: 0,
    color: '#444',
    fontFamily: font.p_regular,
  },
  definition: {
    flex: 1,
  },
  heartButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 14,
    position: 'absolute',
    right: 14,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchedItem: {
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  flatListStyle: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
  },
  containerView: {
    flex: 1,
  },
});
