import {StatusBar} from 'expo-status-bar';
import React, {Component, useEffect, useRef, useState} from 'react';
import {
  AntDesign,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
const IMAGES = [
  {
    img: require('../../images/product1.jpg'),
    title: 'Crispy Wings',
    reviews: '134',
    price: '$49.99',
    description:
      'SDLC is a systematic process for building software that ensures the quality and correctness of the software built. SDLC process aims to produce high-quality software that meets customer expectations. The system development should be complete in the pre-defined time frame and cost.',
  },
  {
    img: require('../../images/product2.jpg'),
    title: 'Italian style chicken',
    reviews: '243',
    price: '$39.99',
    description:
      'The requirement is the first stage in the SDLC process. It is conducted by the senior team members with inputs from all the stakeholders and domain experts in the industry. Planning for the quality assurancerequirements and recognization of the risks involved is also done at this stage.',
  },
  {
    img: require('../../images/product3.jpg'),
    title: 'Boom Chicka Pop',
    reviews: '113',
    price: '$29.99',
    description:
      'Once the requirement analysis phase is completed the next SDLC step is to define and document software needs. This process conducted with the help of ‘Software Requirement Specification’ document also known as ‘SRS’ document. It includes everything which should be designed and developed during the project life cycle.',
  },
  {
    img: require('../../images/product4.jpg'),
    title: 'Blue Diamond',
    reviews: '302',
    price: '$49.99',
    description:
      'Once the software testing phase is over and no bugs or errors left in the system then the final deployment process starts. Based on the feedback given by the project manager, the final software is released and checked for deployment issues if any.',
  },
];

const Indicator = ({scrollX}) => {
  return (
    <View style={styles.pagination}>
      {IMAGES.map((item, index) => {
        const scaleX = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [1, 2, 1],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: ['#eee', '#1d7aec', '#eee'],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {transform: [{scaleX}]},
              {backgroundColor},
            ]}></Animated.View>
        );
      })}
    </View>
  );
};

const TitleIndicator = ({scrollX}) => {
  return (
    <View style={{marginTop: 10, marginBottom: 20}}>
      {IMAGES.map((item, index) => {
        const opacity = scrollX.interpolate({
          inputRange: [
            (index - 0.55) * width,
            index * width,
            (index + 0.55) * width,
          ],
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        return (
          <Animated.Text
            key={index}
            style={{
              position: 'absolute',
              fontWeight: '900',
              fontSize: 24,
              opacity,
              textTransform: 'uppercase',
            }}>
            {item.title}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const Description = ({scrollX}) => {
  return (
    <View style={{marginTop: 10, marginBottom: 20, position: 'relative'}}>
      {IMAGES.map((item, index) => {
        const opacity = scrollX.interpolate({
          inputRange: [
            (index - 0.55) * width,
            index * width,
            (index + 0.55) * width,
          ],
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        return (
          <Animated.Text
            key={index}
            style={{
              opacity,
              marginTop: 8,
              lineHeight: 20,
              position: 'absolute',
            }}>
            {item.description}
          </Animated.Text>
        );
      })}
    </View>
  );
};

export default function Magnify() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [moveAngle, setMoveAngle] = useState(false);
  const [count, setCount] = useState(1);

  const [flavor1] = useState(new Animated.Value(-70));
  const [flavor2] = useState(new Animated.Value(-70));
  const [flavor3] = useState(new Animated.Value(-70));
  const [flavor4] = useState(new Animated.Value(-70));

  const [flavor, setFlavor] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#1d7aec');

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.spring(flavor1, {
      toValue: 10,
      useNativeDriver: false,
      damping: 999,
    }).start();
    Animated.spring(flavor2, {
      toValue: 80,
      useNativeDriver: false,
      damping: 999,
    }).start();
    Animated.spring(flavor3, {
      toValue: 150,
      useNativeDriver: false,
      damping: 999,
    }).start();
    Animated.spring(flavor4, {
      toValue: 220,
      useNativeDriver: false,
      damping: 999,
    }).start();
  };
  const popOut = () => {
    setPop(false);
    Animated.spring(flavor1, {
      toValue: -70,
      useNativeDriver: false,
      damping: 999,
    }).start();
    Animated.spring(flavor2, {
      toValue: -70,
      useNativeDriver: false,
      damping: 999,
    }).start();
    Animated.spring(flavor3, {
      toValue: -70,
      useNativeDriver: false,
      damping: 999,
    }).start();
    Animated.spring(flavor4, {
      toValue: -70,
      useNativeDriver: false,
      damping: 999,
    }).start();
  };

  const [icon, setIcon] = useState('Flavor');
  const [off, setOff] = useState(true);
  const [selectedValue, setSelectedValue] = useState('option1');
  const onPress1 = () => {
    LayoutAnimation.easeInEaseOut();
  };
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <StatusBar translucent={false} style="light" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn}>
          <Feather name="chevron-left" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Feather name="shopping-bag" size={20} />
        </TouchableOpacity>
      </View>
      <View style={{position: 'relative'}}>
        <FlatList
          data={IMAGES}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width,
                  height: 200,
                }}
                key={index}>
                <Animated.Image
                  source={item.img}
                  key={index}
                  style={{width: 180, height: 200, bottom: 20}}
                  resizeMode="contain"
                />
              </View>
            );
          }}
        />
        <Indicator scrollX={scrollX} />
      </View>
      <View
        style={{
          position: 'relative',
        }}>
        <TouchableOpacity
          style={[
            styles.flavourBtn,
            {
              position: 'absolute',
              right: 14,
              bottom: -30,
              zIndex: 11111,
              backgroundColor: backgroundColor,
              shadowColor: backgroundColor,
              elevation: 20,
            },
          ]}
          onPress={() => {
            pop === false ? popIn() : popOut();
            setMoveAngle(!moveAngle);
            setFlavor(!flavor);
          }}
          activeOpacity={1}>
          <View style={styles.flavourBtn}>
            <Text style={styles.flavorText}>{icon}</Text>
            <Animated.View
              style={{
                transform: [{rotate: moveAngle ? '180deg' : '0deg'}],
              }}>
              <AntDesign name="arrowdown" size={24} color="#fff" />
            </Animated.View>
          </View>
        </TouchableOpacity>
        <Animated.View style={{right: 10, top: 30, zIndex: 111}}>
          <TouchableOpacity
            onPress={() => {
              setIcon('🍩');
              setBackgroundColor('gold');
              pop === false ? popIn() : popOut();
            }}
            activeOpacity={1}>
            <Animated.View
              style={[styles.flavour, {top: flavor1, backgroundColor: 'gold'}]}>
              <Text style={{fontSize: 8, color: '#fff', fontWeight: '900'}}>
                Chocolate
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setIcon('🍊');
              setBackgroundColor('chocolate');
              pop === false ? popIn() : popOut();
            }}>
            <Animated.View
              style={[
                styles.flavour,
                {top: flavor2, backgroundColor: 'chocolate'},
              ]}>
              <Text style={{fontSize: 8, color: '#fff', fontWeight: '900'}}>
                Orange
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setIcon('🌮');
              setBackgroundColor('orange');
              pop === false ? popIn() : popOut();
            }}>
            <Animated.View
              style={[
                styles.flavour,
                {top: flavor3, backgroundColor: 'orange'},
              ]}>
              <Text style={{fontSize: 8, color: '#fff', fontWeight: '900'}}>
                Java Chip
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setIcon('🍌');
              setBackgroundColor('lightgreen');
              pop === false ? popIn() : popOut();
            }}>
            <Animated.View
              style={[
                styles.flavour,
                {top: flavor4, backgroundColor: 'lightgreen'},
              ]}>
              <Text
                style={{
                  fontSize: 8,
                  color: '#fff',
                  fontWeight: '900',
                }}>
                Banana
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 12,
            paddingTop: 10,
            position: 'relative',
          }}>
          <Text style={{fontWeight: '900'}}>
            {' '}
            <AntDesign name="star" color={'gold'} /> 5.0{' '}
            <Text style={{opacity: 0.2, fontWeight: '500', color: '#999'}}>
              (118 reviews)
            </Text>
          </Text>
          <TitleIndicator scrollX={scrollX} />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setOpen(!open);
              LayoutAnimation.easeInEaseOut();
              setOff(!off);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 14,
                height: 40,
              }}>
              <Text style={{fontWeight: '900', fontSize: 16}}>Description</Text>
              <Feather name={off ? 'chevron-down' : 'chevron-up'} size={18} />
            </View>
            {open && (
              <View
                style={{
                  width: '100%',
                  height: 140,
                }}>
                <Description scrollX={scrollX} />
              </View>
            )}
          </TouchableOpacity>
          <View style={[styles.price, {marginTop: 10}]}>
            <View>
              <Animated.Text
                style={{
                  fontSize: selectedValue === 'option2' ? 14 : 22,
                  color: selectedValue === 'option2' ? 'red' : 'black',
                  textDecorationLine:
                    selectedValue === 'option2' ? 'line-through' : 'none',
                  fontWeight: '900',
                }}>
                $49.99
              </Animated.Text>
              {selectedValue == 'option2' && (
                <Animated.Text
                  style={{
                    fontSize: 24,
                    fontWeight: '900',
                    transform: [{scale: selectedValue === 'option2' ? 1 : 0}],
                  }}>
                  $47.49
                </Animated.Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 40,
                overflow: 'hidden',
                width: 100,
                height: 35,
              }}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => {
                  setCount(count - 1);
                }}>
                <Ionicons name="remove" size={22} />
              </TouchableOpacity>
              <Text style={{fontWeight: '900'}}>{count}</Text>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => {
                  setCount(count + 1);
                }}>
                <Ionicons name="add" size={22} />
              </TouchableOpacity>
            </View>
          </View>
          <RadioButton.Group
            onValueChange={value => {
              setSelectedValue(value);
              LayoutAnimation.easeInEaseOut();
            }}
            value={selectedValue}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 50,
                  backgroundColor:
                    selectedValue == 'option1' ? '#1d7aec20' : 'transparent',
                  borderRadius: 10,
                  paddingRight: 14,
                  borderWidth: 2,
                  borderColor:
                    selectedValue == 'option1' ? '#1d7aec20' : '#fff',
                }}>
                <RadioButton value="option1" color="#1d7aec" />
                <Text style={styles.purchase}>One time purchase</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 50,
                  borderRadius: 10,
                  paddingRight: 14,
                  backgroundColor:
                    selectedValue == 'option2' ? '#1d7aec20' : 'transparent',
                  borderWidth: 2,
                  borderColor:
                    selectedValue == 'option2' ? '#1d7aec20' : '#fff',
                }}>
                <RadioButton value="option2" color="#1d7aec" />
                <Text style={styles.purchase}>Subscribe & Save 5%</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
      </ScrollView>
      <View style={styles.addToCartBar}>
        <TouchableOpacity style={styles.addToCart} activeOpacity={0.8}>
          <Text style={{fontWeight: '900', color: '#fff', fontSize: 20}}>
            Add to cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favorite}
          onPress={() => {
            setFavorite(!favorite);
          }}>
          <Ionicons
            name="heart-outline"
            size={30}
            color={favorite ? '#1d7aec' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  pagination: {
    width: 80,
    height: 30,
    position: 'absolute',
    bottom: 0,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 4,
    borderRadius: 10,
    marginRight: 10,
  },
  flavour: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 14,
    elevation: 10,
  },
  counterBtn: {
    width: 40,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    height: 45,
  },
  addToCartBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 6,
    width: '100%',
    paddingHorizontal: 14,
  },
  addToCart: {
    width: 240,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1d7aec',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#8ebdf7',
  },
  favorite: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  flavourBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 100,
    zIndex: 1,
  },
  flavorText: {
    fontWeight: '800',
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  purchase: {
    fontWeight: '800',
    fontSize: 13,
  },
});
