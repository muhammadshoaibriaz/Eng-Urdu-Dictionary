import React, {useEffect, useRef, useState} from 'react';
import {Button, Platform, StatusBar, Text, View} from 'react-native';

import {
  TestIds,
  RewardedAd,
  RewardedAdEventType,
  BannerAd,
  useForeground,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

const adUnitIds = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitIds, {
  keywords: ['fashion', 'clothing'],
});

const bannerAddId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-6699024084379802/9250953498';

export default function GoogleA() {
  const [loaded, setLoaded] = useState(false);

  // No advert ready to show yet

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const bannerRef = useRef(null);

  // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
  // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  // No advert ready to show yet
  if (!loaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <BannerAd
        ref={bannerRef}
        unitId={bannerAddId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => {
          console.log('add loaded');
        }}
      />
    </View>
  );
}
