import React, { useRef } from "react";
import { Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const FadeInView: React.FC<{}> = (props) => {
  const fade = useRef(new Animated.Value(0)).current;

  useFocusEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fade, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }).start();
    };
  });

  return (
    <Animated.View style={[{ flex: 1, opacity: fade }]}>
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;
