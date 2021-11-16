import React, { ReactElement, useState, useEffect, useRef } from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import Item from "./Item";
import { COL, Positions, SIZE } from "../../lib/AnimatedConfig";

interface ListProps {
  children: ReactElement<{ id: string }>[];
  editing: boolean;
  onDragEnd: (diff: Positions) => void;
}

const List = ({ children, editing, onDragEnd }: ListProps) => {
  const scrollY = useSharedValue(0);
  const scrollView = useAnimatedRef<Animated.ScrollView>();
  let positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map((child, index) => ({ [child.props.id]: index }))
    )
  );
  const first_render = useRef(false);

  useEffect(() => {
    if (first_render.current) {
      positions.value = Object.assign(
        {},
        ...children.map((child, index) => ({ [child.props.id]: index }))
      );
    } else {
      first_render.current = true;
    }
  }, [children.length]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  });

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      ref={scrollView}
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * SIZE,
        backgroundColor: "red",
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
    >
      {children.map((child) => (
        <Item
          key={child.props.id}
          positions={positions}
          id={child.props.id}
          editing={editing}
          onDragEnd={onDragEnd}
          scrollView={scrollView}
          scrollY={scrollY}
        >
          {child}
        </Item>
      ))}
    </Animated.ScrollView>
  );
};

export default List;
