import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native";

const Tile: React.FC<{
  onLongPress: () => void;
  uri: string;
  key: string;
  id: string;
}> = ({ onLongPress, uri, key, id }) => {
  const { colors, fonts } = useTheme() as any;
  return (
    <TouchableOpacity
      style={{
        padding: wp("1%"),
        borderRadius: wp("5%"),
        width: wp("25%"),
        height: wp("25%"),
      }}
      activeOpacity={1}
      onLongPress={onLongPress}
    >
      <FastImage
        style={{ flex: 1, borderRadius: wp("5%") }}
        source={{ uri: uri }}
      />
    </TouchableOpacity>
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
