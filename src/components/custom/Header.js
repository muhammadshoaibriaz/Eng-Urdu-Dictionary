import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Header = ({onPress, name, icon, title}) => {
  return (
    <View style={styles.header}>
      <View style={{flex: 0.3}}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Ionicons name={name} size={22} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{''}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
});
export default Header;
