import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";

const Tile: React.FC<{ uri: string }> = ({ uri }) => {
  const { colors, fonts } = useTheme() as any;
  return (
    <FastImage
      style={{ width: wp("5%"), height: wp("5%") }}
      source={{ uri: uri }}
    />
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
