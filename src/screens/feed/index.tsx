import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../../components/buttons/regular";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Ionicons";
import { doSetActiveMenu } from "../../redux/actions/Menus";

const Feed: React.FC<{
  navigation: any;
  my_menus: any;
  setActiveMenu: (menu: object) => void;
}> = ({ navigation, my_menus, setActiveMenu }) => {
  const { colors, fonts } = useTheme() as any;

  const getKeys = (item: any) => item.muid;

  const renderItem = ({ item }) => {
    const goNav = () => {
      setActiveMenu(item);
      navigation.navigate("Menu");
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={goNav}
        style={{
          backgroundColor: colors.backgroundBlack,
          width: wp("92%"),
          height: wp("70%"),
          borderRadius: wp("6%"),
          alignItems: "center",
          marginBottom: hp("2%"),
          shadowOpacity: 0.25,
          elevation: 6,
          shadowRadius: 12,
          shadowOffset: { width: 1, height: 10 },
        }}
      >
        <FastImage
          source={{
            uri: `https://octiblemedia.s3-accelerate.amazonaws.com/menus/${item.muid}/default`,
            priority: FastImage.priority.high,
          }}
          style={{
            width: wp("88%"),
            height: wp("46%"),
            borderRadius: wp("5%"),
            marginTop: hp("1%"),
          }}
        />
        <Text
          style={{
            fontSize: 28,
            fontFamily: fonts.regular,
            color: colors.primaryGrey,
            marginTop: hp("2.5%"),
          }}
        >
          {item.menu_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundPurple }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: fonts.bold,
          color: colors.primaryGrey,
          marginTop: hp("10%"),
          marginLeft: wp("4%"),
        }}
      >
        Public Feed
      </Text>
      <FlatList
        data={my_menus}
        renderItem={renderItem}
        keyExtractor={getKeys}
        contentContainerStyle={{ alignItems: "center", marginTop: hp("2%") }}
      />
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  my_menus: state.menus.menus,
});

const mapDispatchToProps = (dispatch: any) => ({
  setActiveMenu: (menu) => dispatch(doSetActiveMenu(menu)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
