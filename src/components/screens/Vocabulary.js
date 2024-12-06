import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Headers from '../custom/Headers';
import LearnButton from '../custom/LearnButton';

export default function Vocabulary({navigation, route}) {
  const [vocabulary] = useState([
    {
      titleEng: 'Body parts',
      titleUrd: 'جسم کے اعزا',
      url: require('../../assets/images/body.png'),
    },
    {
      titleEng: 'Common ways to say hello',
      titleUrd: 'سلام کرنے کے عام طریقے',
      url: require('../../assets/images/hello.png'),
    },
    {
      titleEng: 'Disasters',
      titleUrd: 'آفات',
      url: require('../../assets/images/flood.png'),
    },
    {
      titleEng: 'Making Complaints',
      titleUrd: 'شکایات کرنا',
      url: require('../../assets/images/bad-review.png'),
    },
    {
      titleEng: 'Most Common ways to say goodbye',
      titleUrd: 'الوداع کہنے کے سب سے عام طریقے',
      url: require('../../assets/images/bye.png'),
    },
    {
      titleEng: 'Daily Routines',
      titleUrd: 'روزمرہ کے معمولات',
      url: require('../../assets/images/routine.png'),
    },
    {
      titleEng: 'Clothing Related actions',
      titleUrd: 'کپڑوں سے متعلق افعال',
      url: require('../../assets/images/dress-code.png'),
    },
    {
      titleEng: 'Hobbies',
      titleUrd: 'مشغلے',
      url: require('../../assets/images/canvas.png'),
    },
    {
      titleEng: 'Family',
      titleUrd: 'خاندان',
      url: require('../../assets/images/family.png'),
    },
    {
      titleEng: 'Sports',
      titleUrd: 'کھیل',
      url: require('../../assets/images/family.png'),
    },
  ]);
  return (
    <View style={styles.container}>
      <Headers navigation={navigation} route={route} />
      <View style={styles.flatList}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          {vocabulary?.map((item, index) => (
            <LearnButton
              key={index}
              imageUrl={item?.url}
              titleEng={item?.titleEng}
              titleUrd={item?.titleUrd}
              onPress={() => {
                navigation.navigate('Reader', {vocabulary, item});
              }}
              style={styles.button}
            />
          ))}
        </ScrollView>
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
});
