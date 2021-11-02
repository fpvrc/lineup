import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
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
import { SharedElement } from "react-navigation-shared-element";

const Section: React.FC<{
  navigation: any;
  my_menus: any;
  setActiveMenu: (menu: object) => void;
  route: any;
  active_menu: any;
}> = ({ navigation, my_menus, setActiveMenu, route, active_menu }) => {
  const { colors, fonts } = useTheme() as any;
  const [data, setData] = useState(
    active_menu.items.filter((item) => item.section === route.params.title)
  );

  const getKeys = (item: any) => item.muid;
  const goBack = () => navigation.goBack();

  const renderItem = ({ item, index }) => {
    const goNav = () => navigation.navigate("Item", item);
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={goNav}
        style={{
          height: wp("30%"),
          marginBottom: hp("3%"),
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <SharedElement id={`item.${item.id}.photo`}>
            <FastImage
              source={{
                uri: `https://octiblemedia.s3-accelerate.amazonaws.com/items/${item.id}/default`,
                priority: FastImage.priority.high,
              }}
              style={{
                width: wp("28%"),
                height: wp("28%"),
                borderRadius: wp("3%"),
              }}
            />
          </SharedElement>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: fonts.bold,
                color: colors.primaryGrey,
                marginLeft: wp("3%"),
              }}
            >
              {item.title}
            </Text>
            <Text
              numberOfLines={3}
              style={{
                fontSize: 13,
                fontFamily: fonts.regular,
                color: colors.primaryGrey,
                marginLeft: wp("3%"),
                marginTop: hp(".5%"),
                maxWidth: wp("60%"),
              }}
            >
              {item.sub_title}
            </Text>
            <View
              style={{
                bottom: hp("-1.2%"),
                position: "absolute",
                width: hp("29.5%"),
                height: wp("10%"),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: fonts.bold,
                  color: colors.primaryGrey,
                  marginLeft: wp("4%"),
                  marginTop: hp("1.8%"),
                }}
              >
                {item.price}
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  backgroundColor: colors.primaryGreen,
                  width: wp("16%"),
                  height: hp("2.8%"),
                  justifyContent: "center",
                  borderRadius: wp("4%"),
                  marginTop: hp(".8%"),
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: fonts.regular,
                    color: colors.backgroundWhite,
                    alignSelf: "center",
                  }}
                >
                  View
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            height: hp(".2%"),
            backgroundColor: colors.primaryGrey,
            marginTop: hp("2%"),
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundPurple }}>
      <TouchableOpacity
        onPress={goBack}
        style={{
          position: "absolute",
          zIndex: 1,
          height: hp("5%"),
          width: wp("10%"),
          marginTop: hp("4%"),
          marginLeft: wp("4%"),
        }}
      >
        <Icon
          style={{
            fontSize: 26,
          }}
          name="arrow-back"
          color={colors.backgroundBlack}
        />
      </TouchableOpacity>
      <SharedElement id={`item.${route.params.id}.title`}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: fonts.bold,
            color: colors.primaryGrey,
            marginTop: hp("10%"),
            marginLeft: wp("4%"),
          }}
        >
          {route.params.title}
        </Text>
      </SharedElement>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={getKeys}
        contentContainerStyle={{
          marginTop: hp("2%"),
          marginLeft: wp("4%"),
          marginRight: wp("4%"),
        }}
      />
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  my_menus: state.menus.my_menus,
  active_menu: state.menus.active_menu,
});

const mapDispatchToProps = (dispatch: any) => ({
  setActiveMenu: (menu) => dispatch(doSetActiveMenu(menu)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
