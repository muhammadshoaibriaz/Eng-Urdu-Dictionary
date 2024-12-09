import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';

// imports
import Home from '../screens/Home';
import History from '../screens/History';
import Favorite from '../screens/Favorite';
import Details from '../screens/Details';
import Thesarus from '../screens/Thesarus';
import Chats from '../screens/Chat';
import Learn from '../screens/Learn';
import Vocabulary from '../screens/Vocabulary';
import FileReader from '../screens/FileReader';
import Tenses from '../screens/Tenses';
import Plural from '../screens/Plural';
import Idioms from '../screens/Idioms';
import Conversation from '../screens/Conversations';
import Tense from '../screens/Tense';
import Splash from '../screens/Splash';
import ImageProcess from '../screens/ImageProcess';
import Quiz from '../screens/Quiz';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home tab navigation screens
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        cardStyle: {backgroundColor: '#f7f7f7'},
      }}>
      <Stack.Screen name="HomePage" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Learn" component={Learn} />
      <Stack.Screen name="Conversation" component={Conversation} />
      <Stack.Screen name="Vocabulary" component={Vocabulary} />
      <Stack.Screen name="Reader" component={FileReader} />
      <Stack.Screen name="Tenses" component={Tenses} />
      <Stack.Screen name="Singular Plural" component={Plural} />
      <Stack.Screen name="Idioms" component={Idioms} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="Tense" component={Tense} />
      <Stack.Screen name="ImageProcess" component={ImageProcess} />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
};

const ThesarusStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Thesars"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        cardStyle: {backgroundColor: '#f7f7f7'},
      }}>
      <Stack.Screen name="Thesars" component={Thesarus} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

const Onboarding = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          options={{
            animation: 'scale_from_center',
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 2000}},
              close: {animation: 'timing', config: {duration: 1000}},
            },
          }}
          name="AppNavigator"
          component={AppNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerTransparent: true,
        tabBarActiveTintColor: 'teal',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'timer' : 'timer-outline';
          } else if (route.name === 'Thesarus') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart-sharp' : 'heart-outline';
          }
          return <Ionicons name={iconName} color={color} size={22} />;
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 0.7)',
              '#fff',
            ]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={[styles.tabBarContainer]}
          />
        ),
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: 'transparent',
          display: focusedRouteName(route) ? 'flex' : 'none',
        },
        tabBarLabelStyle: {
          fontSize: 8,
        },
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Thesarus" component={ThesarusStack} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Favorite" component={Favorite} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export {AppNavigator, Onboarding};

const focusedRouteName = route => {
  const route_name = getFocusedRouteNameFromRoute(route);
  console.log('route_name', route_name);
  const hiddenScreens = [
    'Details',
    'Learn',
    'Conversation',
    'Vocabulary',
    'Reader',
    'Tenses',
    'Plural',
    'Idioms',
    'Chats',
    'Tense',
    'ImageProcess',
  ];

  return !(route_name && hiddenScreens.includes(route_name));
};

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 70,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
