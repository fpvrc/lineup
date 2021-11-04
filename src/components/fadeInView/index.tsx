import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

const FadeInView = (props, { navigation }) => {
  //const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {};
  });

  /*
  const fadeIn = () => {
    "worklet";
    offset.value = withTiming(1, {
      duration: 125,
    });
  };

  const fadeOut = () => {
    "worklet";
    offset.value = withTiming(0, {
      duration: 62,
    });
  };
  */

  useFocusEffect(() => {
    //fadeIn();
    /*
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 125,
      useNativeDriver: true,
    }).start();
    */
    return () => {
      //fadeOut();
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
    <Animated.View style={[{ flex: 1 }, {}]}>{props.children}</Animated.View>
  );
};

export default FadeInView;
