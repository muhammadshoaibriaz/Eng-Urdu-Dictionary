import React, {useEffect, useState} from 'react';
import {View, Button, Alert} from 'react-native';
import {
  useStripe,
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';

export default function PaymentScreen() {
  const [isPaymentSheetReady, setIsPaymentSheetReady] = useState(false);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      'http://192.168.223.21:3000/create-payment-intent',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({amount: 5000, currency: 'usd'}),
      },
    );
    const {clientSecret} = await response.json();
    return clientSecret;
  };

  const initializePaymentSheet = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      customerEphemeralKeySecret: '',
      merchantDisplayName: 'Your App Name', // Replace with your app name
      defaultBillingDetails: {
        name: 'Test User',
        email: 'test@example.com',
      },
    });

    if (!error) {
      setIsPaymentSheetReady(true);
      Alert.alert('Success', 'Payment sheet initialized successfully!');
    } else {
      console.error('Error initializing payment sheet:', error);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Payment was confirmed successfully!');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Initialize Payment Sheet"
        onPress={initializePaymentSheet}
        disabled={isPaymentSheetReady}
      />
      <Button
        title="Present Payment Sheet"
        onPress={openPaymentSheet}
        disabled={!isPaymentSheetReady}
      />
    </View>
  );
}
