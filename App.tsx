import React from "react";
import { View, Animated } from "react-native";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/index";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./src/Navigation";
import { Settings } from "react-native-fbsdk-next";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.initializeSDK();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
