import React from "react";
import { View, Animated } from "react-native";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/index";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./src/Navigation";
import { Settings } from "react-native-fbsdk-next";
import PhotoUploader from "./src/components/photoUploader";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.initializeSDK();

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PhotoUploader />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

//    <Navigation />

export default App;
