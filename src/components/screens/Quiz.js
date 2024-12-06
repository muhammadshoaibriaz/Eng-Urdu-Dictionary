import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {font} from '../constants/font';
import {Button} from 'react-native-paper';
import Headers from '../custom/Headers';

const past = [
  {
    id: 1,
    question: 'Which sentence is in the past tense?',
    options: [
      'She is running fast.',
      'He was watching TV.',
      'They will go to the park.',
      'I am eating lunch.',
    ],
    answer: 'He was watching TV.',
  },
  {
    id: 2,
    question: 'Which word is an adjective?',
    options: ['Quickly', 'Beautiful', 'Run', 'Loudly'],
    answer: 'Beautiful',
  },
  {
    id: 3,
    question: "What is the plural form of 'Child'?",
    options: ['Childs', 'Children', 'Childes', 'Childen'],
    answer: 'Children',
  },
  {
    id: 4,
    question: "What is the correct article for the word 'Apple'?",
    options: ['A', 'An', 'The', 'None'],
    answer: 'An',
  },
  {
    id: 5,
    question: "What is the verb in the sentence: 'She dances gracefully'?",
    options: ['She', 'Dances', 'Gracefully', 'None'],
    answer: 'Dances',
  },
];

const Quiz = ({navigation, route}) => {
  const [quizData, setQuizData] = useState([
    {
      id: 1,
      question: "What is the meaning of 'Happiness' in Urdu?",
      options: ['غم', 'خوشی', 'غصہ', 'محبت'],
      answer: 'خوشی',
    },
    {
      id: 2,
      question: "What is the meaning of 'Book' in Urdu?",
      options: ['کتاب', 'قلم', 'کاغذ', 'میز'],
      answer: 'کتاب',
    },
    {
      id: 3,
      question: "What is the meaning of 'Beautiful' in Urdu?",
      options: ['بدصورت', 'خوبصورت', 'اداس', 'مشکل'],
      answer: 'خوبصورت',
    },
    {
      id: 4,
      question: "What is the meaning of 'Love' in Urdu?",
      options: ['محبت', 'دوستی', 'نفرت', 'شک'],
      answer: 'محبت',
    },
    {
      id: 5,
      question: "What is the meaning of 'Friend' in Urdu?",
      options: ['دشمن', 'دوست', 'استاد', 'طالب علم'],
      answer: 'دوست',
    },
    {
      id: 6,
      question: "What is the meaning of 'Respect' in Urdu?",
      options: ['عزت', 'غصہ', 'معافی', 'نفرت'],
      answer: 'عزت',
    },
    {
      id: 7,
      question: "What is the meaning of 'Peace' in Urdu?",
      options: ['لڑائی', 'امن', 'خوف', 'خوشی'],
      answer: 'امن',
    },
    {
      id: 8,
      question: "What is the meaning of 'Success' in Urdu?",
      options: ['ناکامی', 'محنت', 'کامیابی', 'دوستی'],
      answer: 'کامیابی',
    },
    {
      id: 9,
      question: "What is the meaning of 'Dream' in Urdu?",
      options: ['نیند', 'خواب', 'امید', 'حقیقت'],
      answer: 'خواب',
    },
    {
      id: 10,
      question: "What is the meaning of 'Teacher' in Urdu?",
      options: ['شاگرد', 'دوست', 'استاد', 'والدین'],
      answer: 'استاد',
    },
  ]);

  const [yourSelection, setYourSelection] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  // console.log('your slection', yourSelection)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionPress = selectedOption => {
    const isCorrect = quizData[currentQuestion].answer === selectedOption;
    setYourSelection([...yourSelection, selectedOption]);
    // console.log('object', yourSelection);
    setCorrectAnswer([...correctAnswer, quizData[currentQuestion].answer]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#fff'} />
        <Headers navigation={navigation} route={route} />
        <View style={styles.answerWrapper}>
          <Text style={styles.scoreText}>Quiz Finished!</Text>
          <Text style={styles.scoreText}>
            Your Score: {score}/{quizData.length}
          </Text>
          <View style={{marginTop: 20}}>
            <Button
              mode="elevated"
              contentStyle={{backgroundColor: '#fe3377'}}
              textColor="white"
              onPress={() => {
                setIsFinished(false);
                setCurrentQuestion(0);
                setCorrectAnswer([]);
                setYourSelection([]);
                setScore(0);
              }}>
              Retake Quiz
            </Button>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <Headers navigation={navigation} route={route} />
      <View style={{paddingHorizontal: 14}}>
        <Text style={styles.questionText}>
          {quizData[currentQuestion].question}
        </Text>
        <View style={styles.wrapper}>
          {quizData[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionPress(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionText: {
    width: '100%',
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#90EE9020',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  optionButton: {
    width: '48%',
    backgroundColor: '#eee',
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    paddingVertical: 20,
  },
  optionText: {
    fontSize: 16,
    fontFamily: font.p_regular,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  answerWrapper: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Quiz;
