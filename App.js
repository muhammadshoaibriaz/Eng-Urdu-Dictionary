import React from 'react';
import {ContextProvider} from './src/components/context/AppContext';
import {Onboarding} from './src/components/navigator/AppNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './src/components/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {check, request, PERMISSIONS} from 'react-native-permissions';
import {Platform} from 'react-native';

export default function App() {
  const requestMicrophonePermission = async () => {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO,
    );
    console.log(result);
  };
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ContextProvider>
          <Onboarding />
        </ContextProvider>
      </PersistGate>
    </Provider>
    // <VoiceSearch requestMicrophonePermission={requestMicrophonePermission} />
  );
}
