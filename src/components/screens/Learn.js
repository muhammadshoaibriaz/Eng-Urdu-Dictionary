import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LearnButton from '../custom/LearnButton';
import Headers from '../custom/Headers';
import {font} from '../constants/font';
export default function Learn({navigation, route}) {
  const data = [
    {
      title: 'Conversation',
      subtitle: 'گفتگو',
      imageUrl: require('../../assets/images/icon2.png'),
    },
    {
      title: 'Vocabulary',
      subtitle: 'ذخیرہ الفاظ',
      imageUrl: require('../../assets/images/icon5.png'),
    },
    {
      title: 'Tenses',
      subtitle: 'فعل کا زمانہ',
      imageUrl: require('../../assets/images/icon1.png'),
    },
    {
      title: 'Singular Plural',
      subtitle: 'واحد جمع',
      imageUrl: require('../../assets/images/icon4.png'),
    },
    {
      title: 'Idioms',
      subtitle: 'محاورے',
      imageUrl: require('../../assets/images/icon3.png'),
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learn english</Text>
      </View>
      <ScrollView style={styles.scrollView} showVerticleScrollIndicator={false}>
        {data?.map((item, index) => (
          <LearnButton
            imageUrl={item?.imageUrl}
            titleEng={item?.title}
            titleUrd={item?.subtitle}
            key={index.toString()}
            onPress={() => navigation.navigate(`${item?.title}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginHorizontal: 18,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderRadius: 6,
    height: 60,
    marginVertical: 3,
  },
  english: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginLeft: 14,
  },
  urdu: {
    position: 'absolute',
    bottom: 8,
    right: 18,
    fontWeight: '800',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
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
    fontFamily: font.p_medium,
  },
  scrollView: {
    marginTop: 10,
  },
});
