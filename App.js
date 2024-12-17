import React from 'react';
import {ContextProvider} from './src/components/context/AppContext';
import {Onboarding} from './src/components/navigator/AppNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './src/components/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {check, request, PERMISSIONS} from 'react-native-permissions';
import {Platform} from 'react-native';
import GoogleA from './GoogleAds';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';

export default function App() {
  // const requestMicrophonePermission = async () => {
  //   const result = await request(
  //     Platform.OS === 'ios'
  //       ? PERMISSIONS.IOS.MICROPHONE
  //       : PERMISSIONS.ANDROID.RECORD_AUDIO,
  //   );
  //   console.log(result);
  // };
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ContextProvider>
          <Onboarding />
        </ContextProvider>
      </PersistGate>
    </Provider>
    // <GoogleA />
    // <StripeProvider publishableKey="pk_test_51QWD0TGqld81teEZSxGlOrNEcxPIwgoBRouzCn7o2Mef3B2s3psSNiDz9lMGn3ByamaBmP4qUNgvVWq8BPPWjcnd00Hlhps6MN">
    //   <PaymentScreen />
    // </StripeProvider>
  );
}
