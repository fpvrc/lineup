import React, { useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withSequence,
  runOnUI,
} from "react-native-reanimated";

const FadeInView = (props, { navigation }) => {
  let offset = useRef(0.5);

  //const offset = useSharedValue(0);

  const fadeIn = () => {
    "worklet";
    offset.current = withTiming(1, {
      duration: 500,
    });
    console.log("runnin");
  };

  const fadeOut = () => {
    "worklet";
    offset.current = withTiming(0, {
      duration: 250,
    });
  };

  useFocusEffect(() => {
    runOnUI(fadeIn)();
    /*
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 125,
      useNativeDriver: true,
    }).start();
    */
    return () => {
      runOnUI(fadeOut)();
      /*
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 62,
        useNativeDriver: true,
      }).start();
      */
    };
  });

  return (
    <Animated.View style={[{ flex: 1, opacity: offset.current }]}>
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;
