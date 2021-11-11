import React from "react";
import { StyleSheet, View, Platform, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";

const Header: React.FC<{
  onPress: () => void;
  onInfo: any;
  showInfo: boolean;
  steps: [any];
}> = ({ onPress, onInfo, showInfo, steps }) => {
  const { colors, fonts } = useTheme() as any;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: wp("4%"),
        marginTop: hp("7%"),
        height: hp("4%"),
      }}
    >
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <Icon
          style={{
            fontSize: 32,
            fontFamily: fonts.regular,
            alignSelf: "center",
            shadowOpacity: 0.25,
            elevation: 6,
            shadowRadius: 12,
            shadowOffset: { width: 1, height: 10 },
          }}
          name="arrow-back-outline"
          color={"black"}
        />
      </TouchableOpacity>
      {showInfo ? (
        <TouchableOpacity activeOpacity={1} onPress={onInfo}>
          <Icon
            style={{
              fontSize: 32,
              alignSelf: "center",
              shadowOpacity: 0.25,
              elevation: 6,
              shadowRadius: 12,
              shadowOffset: { width: 1, height: 10 },
            }}
            name="ellipsis-vertical"
            color={"black"}
          />
        </TouchableOpacity>
      ) : null}
      <View style={{ flexDirection: "row" }}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={{
              width: wp("8%"),
              height: wp("1%"),
              borderRadius: wp("2%"),
              marginTop: hp("1.8%"),
              backgroundColor: step === "active" ? colors.primaryGrey : "grey",
              marginLeft: wp("3%"),
            }}
          />
        ))}
      </View>
    </View>
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
