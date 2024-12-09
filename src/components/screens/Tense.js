import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {font} from '../constants/font';
export default function Tense({navigation, route}) {
  const {item} = route?.params;
  // console.log(item);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{item?.tense}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.tense}>
          <View style={styles.definitionWrapper}>
            <Text style={styles.definitionTitle}>Definition</Text>
            <Text style={styles.definition}>{item?.definition}</Text>
            <View style={styles.itemView}>
              <Text style={styles.examples}>Affirmative</Text>
              <Text style={styles.exampleTitle}>
                {item?.structure?.affirmative}
              </Text>
            </View>
            <View style={styles.itemView}>
              <Text style={styles.examples}>Negative</Text>
              <Text style={styles.exampleTitle}>
                {item?.structure?.negative}
              </Text>
            </View>
            <View style={styles.itemView}>
              <Text style={styles.examples}>Interrogative</Text>
              <Text style={styles.exampleTitle}>
                {item?.structure?.interrogative}
              </Text>
            </View>
          </View>
          <View style={styles.exampleWrapper}>
            <Text style={styles.definitionTitle}>Examples</Text>
            {Object.entries(item?.examples).map(([key, value]) => (
              <View key={value?.sentence}>
                <Text style={styles.types}>{key}</Text>
                <Text style={styles.types}>{value?.sentence}</Text>
                <Text style={styles.subtitle}>Word-by-word breakdown:</Text>
                {Object.entries(value?.word_by_word).map(
                  ([word, explanation]) => (
                    <Text key={word} style={styles.wordBreakdown}>
                      <Text style={[styles.word]}>{word}:</Text> {explanation}
                    </Text>
                  ),
                )}
              </View>
            ))}
          </View>
          <View style={[styles.definitionWrapper, {marginTop: 14}]}>
            <Text style={styles.definitionTitle}>Urdu examples</Text>
            <View style={styles.itemView}>
              <Text style={styles.examples}>Affirmative</Text>
              <Text style={styles.exampleTitle}>
                {item?.example_urdu?.affirmative}
              </Text>
            </View>
            <View style={styles.itemView}>
              <Text style={styles.examples}>Negative</Text>
              <Text style={styles.exampleTitle}>
                {item?.example_urdu?.negative}
              </Text>
            </View>
            <View style={styles.itemView}>
              <Text style={styles.examples}>Interrogative</Text>
              <Text style={styles.exampleTitle}>
                {item?.example_urdu?.interrogative}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  tense: {
    flex: 1,
    paddingTop: 10,
  },
  definitionWrapper: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 14,
  },
  definitionTitle: {
    fontSize: 16,
    fontFamily: font.p_sm_bold,
  },
  definition: {
    fontFamily: font.p_regular,
    color: '#333',
  },
  itemView: {
    flexDirection: 'row',
  },
  exampleTitle: {
    flex: 1,
    fontSize: 13,
    color: '#999',
    fontFamily: font.p_regular,
  },
  examples: {
    marginRight: 8,
    color: '#fe3377',
    flex: 0.4,
  },
  exampleWrapper: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 14,
    marginTop: 14,
  },
  types: {
    textTransform: 'capitalize',
    fontFamily: font.p_regular,
    color: '#999',
  },
  subtitle: {
    fontFamily: font.p_medium,
    color: 'navy',
    marginVertical: 4,
    textTransform: 'capitalize',
  },
  word: {
    color: '#fe3377',
  },
  wordBreakdown: {
    fontFamily: font.p_regular,
    marginVertical: 2,
    // color: 'gold',
  },
});
