import React, { useRef, useEffect } from "react";
import { useColorScheme, Alert, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./lib/Navigation";
import styles from "./styles";
import analytics from "@react-native-firebase/analytics";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";
import { doSetUser } from "./redux/actions/User";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./components/tabBar";

//Screens
import Landing from "./screens/landing";
import SignInPhone from "./screens/signInPhone";

const Tab = createBottomTabNavigator();
const Tabs: React.FC<{}> = ({}) => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Landing" component={Landing} />
      <Tab.Screen name="SignInPhone" component={SignInPhone} />
    </Tab.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Navigation: React.FC<{ setUser: (user: object) => void }> = ({
  setUser,
}) => {
  const scheme = useColorScheme();
  const routeNameRef = useRef() as any;

  const onAuthStateChanged = (user: any) => {
    //console.log({...user});
    setUser(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const readyUp = () => {
    routeNameRef.current = navigationRef!.current!.getCurrentRoute()!.name;
  };

  const navStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef!.current!.getCurrentRoute()!.name;
    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={scheme === "light" ? styles.primary_theme : styles.primary_theme}
      onReady={readyUp}
      onStateChange={navStateChange}
    >
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen name="Tabs" component={Tabs} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setUser: (user: object) => dispatch(doSetUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
