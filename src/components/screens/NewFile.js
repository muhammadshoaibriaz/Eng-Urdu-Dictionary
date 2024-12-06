import React, { Component, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");

const Indicator = ({ scrollX }) => {
  return (
    <View style={styles.card}>
      {data.map((item, index) => {
        const translateY = scrollX.interpolate({
          inputRange: [-width, 0, width],
          outputRange: [36, 0, -36],
        });
        return (
          <Animated.View key={index} style={[styles.animatedCard]}>
            <Animated.Text
              style={{ fontSize: 30, transform: [{ translateY: translateY }] }}
            >
              {item}
            </Animated.Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

const data = [
  "👍🏻",
  "😂",
  "😍",
  "😡",
  "😢",
  "🔥",
  "♥️",
  "🥺",
  "😔",
  "😳",
  "😂",
  "😘",
  "😎",
  "🙄",
];
export default function NewFile() {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1 }}>
      <Indicator scrollX={scrollX} />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width,
                height,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 40 }}>{item}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  animatedView: {
    width: 250,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 20,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  card: {
    marginTop: 40,
    height: 36,
    overflow: "hidden",
  },
});
