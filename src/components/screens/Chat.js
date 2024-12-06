import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import Headers from '../custom/Headers';
import Tts from 'react-native-tts';
import Ionicons from 'react-native-vector-icons/Ionicons';
// json imports
import meetup from '../jsons/meetup.json';
import passengers from '../jsons/passengers.json';
import coupleChat from '../jsons/coupleChat.json';
import jobInterview from '../jsons/jobInterview.json';
import trip from '../jsons/trip.json';
import talk from '../jsons/talk.json';
import disagreement from '../jsons/disagreement.json';
import romantic from '../jsons/romantic.json';
import proposal from '../jsons/proposal.json';
import wedding from '../jsons/wedding.json';
import poetry from '../jsons/poetry.json';
import crush from '../jsons/crush.json';
import love from '../jsons/love.json';
import {font} from '../constants/font';

export default function Chats({navigation, route}) {
  const {item} = route?.params;
  const topicEng = item?.topicEng;
  // console.log(topicEng);
  const chat = () => {
    if (topicEng === 'First Meeting Between a Couple') {
      return meetup;
    }
    if (topicEng === 'Conversation Between Two Passengers') {
      return passengers;
    }
    if (topicEng === 'Chat Between Girlfriend and Boyfriend') {
      return coupleChat;
    }
    if (topicEng === 'Discussion About a Job Interview') {
      return jobInterview;
    }
    if (topicEng === 'Conversation About a Vacation Plan') {
      return trip;
    }
    if (topicEng === 'Casual Talk Between Friends') {
      return talk;
    }
    if (topicEng === 'Disagreement Between Two Colleagues') {
      return disagreement;
    }
    if (topicEng === 'Romantic Conversation Between Lovers') {
      return romantic;
    }
    if (topicEng === 'Proposal Chat Between a Couple') {
      return proposal;
    }
    if (topicEng === 'Discussion About a Dream Wedding') {
      return wedding;
    }
    if (topicEng === 'A Romantic Poetry Exchange') {
      return poetry;
    }
    if (topicEng === 'Flirty Conversation Between Crushes') {
      return crush;
    }
    if (topicEng === 'Heartfelt Confession of Love') {
      return love;
    }
  };
  return (
    <View style={styles.container}>
      <Headers navigation={navigation} route={route} />
      <View style={styles.flatList}>
        <FlatList
          data={chat()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item, index}) => {
            return (
              <View style={styles.cardWrapper} key={index}>
                <View style={styles.row}>
                  <Text style={styles.english}>
                    <Text style={styles.colored}>{item?.person + '! '}</Text>
                    {item?.message}
                  </Text>
                  <TouchableOpacity
                    style={styles.volumeBtn}
                    onPress={() => {
                      Tts.stop(true);
                      Tts.speak(item?.message + item?.message_urdu);
                    }}>
                    <Ionicons name="volume-high" size={20} color={'#fe3377'} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.urdu}>{item?.message_urdu}</Text>
              </View>
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
  flatList: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 6,
  },
  english: {
    fontSize: 16,
    flex: 1,
    color: '#777',
    fontFamily: font.p_regular,
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
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF5E6',
    // backgroundColor: 'red',
    borderRadius: 6,
    paddingLeft: 8,
    paddingVertical: 8,
  },
  colored: {
    color: '#000',
  },
});
