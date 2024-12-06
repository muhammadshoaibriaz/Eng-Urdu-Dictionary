import React from 'react';
import {ContextProvider} from './src/components/context/AppContext';
import {Onboarding} from './src/components/navigator/AppNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './src/components/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ContextProvider>
          <Onboarding />
        </ContextProvider>
      </PersistGate>
    </Provider>
  );
}