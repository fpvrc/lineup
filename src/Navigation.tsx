import React, { useRef, useEffect } from "react";
import { useColorScheme, Alert, View } from "react-native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import { doGetMyMenus, doGetMenus } from "./redux/actions/Menus";

//Screens
import User from "./screens/user";
import SignInPhone from "./screens/signInPhone";
import Content from "./screens/content";
import Feed from "./screens/feed";
import NewMenu from "./screens/newMenu";
import Menu from "./screens/menu";
import Item from "./screens/item";
import Section from "./screens/section";
import NewBusiness from "./screens/newBusiness";

import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Tab = createBottomTabNavigator();
const Tabs: React.FC<{}> = ({}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="User" component={User} />
      <Tab.Screen name="Content" component={Content} />
      <Tab.Screen name="Feed" component={Feed} />
    </Tab.Navigator>
  );
};

//const MainStack = createNativeStackNavigator();
const NavigationStack = createSharedElementStackNavigator();
const Navigation: React.FC<{
  setUser: (user: object) => void;
  connectGraph: (user: any) => void;
  getMyMenus: (uid: string) => void;
  graph_authenticated: boolean;
  uid: string;
  user: any;
  getMenus: () => void;
}> = ({
  setUser,
  connectGraph,
  graph_authenticated,
  uid,
  getMyMenus,
  user,
  getMenus,
}) => {
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
      getMenus();
    }
  }, [graph_authenticated, user?.uid]);

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
      <NavigationStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
        initialRouteName="Tabs"
      >
        <NavigationStack.Screen name="Tabs" component={Tabs} />
        <NavigationStack.Screen
          sharedElements={(route, otherRoute, showing) => {
            return [{ id: `item.${route.params.muid}.photo` }];
          }}
          name="Feed"
          component={Feed}
        />
        <NavigationStack.Screen
          sharedElements={(route, otherRoute, showing) => {
            return [{ id: `welcome_title`, animation: "fade" }];
          }}
          name="SignInPhone"
          component={SignInPhone}
        />
        <NavigationStack.Screen name="NewMenu" component={NewMenu} />
        <NavigationStack.Screen
          sharedElements={(route, otherRoute, showing) => {
            return [{ id: `item.${route.params.id}.photo` }];
          }}
          name="Item"
          component={Item}
        />
        <NavigationStack.Screen
          sharedElements={(route, otherRoute, showing) => {
            return [{ id: `item.${route.params.id}.photo` }];
          }}
          name="Section"
          component={Section}
        />
        <NavigationStack.Screen
          sharedElements={(route, otherRoute, showing) => {
            return [{ id: `item.${route.params.muid}.photo` }];
          }}
          name="Menu"
          component={Menu}
        />
        <NavigationStack.Screen name="NewBusiness" component={NewBusiness} />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: any) => ({
  uid: state.user.user?.uid,
  graph_authenticated: state.auth.graph_authenticated,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  setUser: (user) => dispatch(doSetUser(user)),
  connectGraph: (user) => dispatch(doConnectGraph(user)),
  getMyMenus: (uid) => dispatch(doGetMyMenus(uid)),
  getMenus: () => dispatch(doGetMenus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
