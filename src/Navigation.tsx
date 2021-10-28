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
import { doConnectGraph } from "./redux/actions/Auth";
import { signInAnonymously } from "./api/Auth";

//Screens
import User from "./screens/user";
import SignInPhone from "./screens/signInPhone";
import Content from "./screens/content";
import NewMenu from "./screens/newMenu";
import { doGetMyMenus } from "./redux/actions/Menus";

const Tab = createBottomTabNavigator();
const Tabs: React.FC<{}> = ({}) => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="User" component={User} />
      <Tab.Screen name="Content" component={Content} />
    </Tab.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Navigation: React.FC<{
  setUser: (user: object) => void;
  connectGraph: (user: any) => void;
  getMyMenus: (uid: string) => void;
  graph_authenticated: boolean;
  uid: string;
}> = ({ setUser, connectGraph, graph_authenticated, uid, getMyMenus }) => {
  const scheme = useColorScheme();
  const routeNameRef = useRef() as any;
  const initialRender = useRef(false) as any;

  const onAuthStateChanged = (user: any) => {
    if (initialRender.current) {
      if (user) {
        setUser(user.toJSON());
        connectGraph(user);
      } else {
        setUser(user);
        signInAnonymously();
      }
    } else {
      initialRender.current = true;
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (graph_authenticated) {
      getMyMenus(uid);
    }
  }, [graph_authenticated]);

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
        <Tab.Screen name="SignInPhone" component={SignInPhone} />
        <Tab.Screen name="NewMenu" component={NewMenu} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: any) => ({
  uid: state.user.user?.uid,
  graph_authenticated: state.auth.graph_authenticated,
});

const mapDispatchToProps = (dispatch: any) => ({
  setUser: (user) => dispatch(doSetUser(user)),
  connectGraph: (user) => dispatch(doConnectGraph(user)),
  getMyMenus: (uid) => dispatch(doGetMyMenus(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
