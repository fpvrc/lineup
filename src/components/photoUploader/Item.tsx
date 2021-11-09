import React from "react";
import { StyleSheet, View, Platform, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COL, SIZE, getPosition, Positions } from "../../lib/AnimatedConfig";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const Item: React.FC<{
  children: any;
  positions: Animated.SharedValue<Positions>;
  id: string;
}> = ({ children, positions, id }) => {
  const { colors, fonts } = useTheme() as any;
  const inset = useSafeAreaInsets();
  const containerHeight =
    Dimensions.get("window").height - inset.top - inset.bottom;
  const contentHeight = (Object.keys(positions.value).length / COL) * SIZE;
  const position = getPosition(positions.value[id]);
  const translateX = useSharedValue(position.x) as any;
  const translateY = useSharedValue(position.y) as any;
  const onGestureEvent = () =>
    useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      { x: number; y: number }
    >({
      onStart: (_, ctx) => {
        ctx.x = translateX.value;
        ctx.y = translateY.value;
      },
      onActive: (translationX, translationY) => {
        translateX.value = translationX;
        translateY.value = translationY;
      },
    });

  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: SIZE,
      height: SIZE,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <Animated.View style={style}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Item);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
