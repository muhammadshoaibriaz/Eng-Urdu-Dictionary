import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Headers from '../custom/Headers';
import LearnButton from '../custom/LearnButton';

export default function Conversation({navigation, route}) {
  const [conversation] = useState([
    {
      topicEng: 'Conversation Between Two Passengers',
      topicUrd: 'دو مسافروں کے درمیان گفتگو',
      url: require('../../assets/images/body.png'),
    },
    {
      topicEng: 'Chat Between Girlfriend and Boyfriend',
      topicUrd: 'گرل فرینڈ اور بوائے فرینڈ کے درمیان بات چیت',
      url: require('../../assets/images/speech-bubble.png'),
    },
    {
      topicEng: 'Discussion About a Job Interview',
      topicUrd: 'نوکری کے انٹرویو کے بارے میں بحث',
      url: require('../../assets/images/meeting.png'),
    },
    {
      topicEng: 'Conversation About a Vacation Plan',
      topicUrd: 'چھٹی کے منصوبے کے بارے میں بات چیت',
      url: require('../../assets/images/vocational.png'),
    },
    {
      topicEng: 'Casual Talk Between Friends',
      topicUrd: 'دوستوں کے درمیان غیر رسمی بات چیت',
      url: require('../../assets/images/body.png'),
    },
    {
      topicEng: 'Disagreement Between Two Colleagues',
      topicUrd: 'دو ساتھیوں کے درمیان اختلاف',
      url: require('../../assets/images/body.png'),
    },
    {
      topicEng: 'Romantic Conversation Between Lovers',
      topicUrd: 'محبت کرنے والوں کے درمیان رومانوی گفتگو',
      url: require('../../assets/images/body.png'),
    },
    {
      topicEng: 'Proposal Chat Between a Couple',
      topicUrd: 'جوڑے کے درمیان پرپوزل چیٹ',
      url: require('../../assets/images/speech-bubble.png'),
    },
    {
      topicEng: 'Discussion About a Dream Wedding',
      topicUrd: 'خوابوں کی شادی کے بارے میں بات چیت',
      url: require('../../assets/images/meeting.png'),
    },
    {
      topicEng: 'A Romantic Poetry Exchange',
      topicUrd: 'رومانوی شاعری کا تبادلہ',
      url: require('../../assets/images/vocational.png'),
    },
    {
      topicEng: 'Flirty Conversation Between Crushes',
      topicUrd: 'پسندیدگی رکھنے والوں کے درمیان فلرٹی بات چیت',
      url: require('../../assets/images/body.png'),
    },
    {
      topicEng: 'First Meeting Between a Couple',
      topicUrd: 'ایک جوڑے کے درمیان پہلی ملاقات',
      url: require('../../assets/images/meeting.png'),
    },
    {
      topicEng: 'Heartfelt Confession of Love',
      topicUrd: 'محبت کا دل سے اعتراف',
      url: require('../../assets/images/body.png'),
    },
  ]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <Headers navigation={navigation} route={route} />
      <View style={styles.flatList}>
        <FlatList
          data={conversation}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({item, index}) => {
            return (
              <LearnButton
                key={index}
                titleEng={item?.topicEng}
                titleUrd={item?.topicUrd}
                imageUrl={item?.url}
                onPress={() => {
                  navigation.navigate('Chats', {conversation, item});
                }}
                style={styles.button}
              />
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
    fontSize: 16,
    flex: 1,
    color: '#777',
  },
  urdu: {
    marginTop: 8,
    textAlign: 'right',
  },
  volumeBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  cardWrapper: {
    marginHorizontal: 14,
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flatList: {
    flex: 1,
  },
  colored: {
    color: '#000',
  },
});
