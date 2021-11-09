import React, { ReactElement } from "react";
import { StyleSheet, View, Platform, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Positions, COL, SIZE } from "../../lib/AnimatedConfig";
import Item from "./Item";
import { useSharedValue } from "react-native-reanimated";
import styles from "../../styles";
let colors = styles.primary_theme.colors;
let fonts = styles.primary_theme.fonts;

const SortableList: React.FC<{ children: ReactElement<{ id: string }>[] }> = ({
  children,
}) => {
  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map((child, index) => ({ [child.props.id]: index }))
    )
  );
  return (
    <ScrollView
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * SIZE,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
    >
      {children.map((child) => {
        return (
          <Item key={child.props.id} id={child.props.id} positions={positions}>
            {child}
          </Item>
        );
      })}
    </ScrollView>
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SortableList);

/*
const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
*/
