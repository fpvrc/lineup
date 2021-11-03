import * as React from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const FadeInView = (props, { navigation }) => {
  //const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const offset = useSharedValue(0);

  useFocusEffect(() => {
    offset.value = withTiming(1, { duration: 125 });
    /*
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 125,
      useNativeDriver: true,
    }).start();
    */
    return () => {
      offset.value = withTiming(0, { duration: 62 });
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
    <Animated.View
      style={{
        flex: 1,
        opacity: offset.value,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;
