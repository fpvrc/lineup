import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";

const PhotoModal: React.FC<{}> = ({}) => {
  const { colors, fonts } = useTheme() as any;
  return <View style={{ flex: 1 }}></View>;
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoModal);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
