import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
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

const Menu: React.FC<{
  navigation: any;
  active_menu: any;
}> = ({ navigation, active_menu }) => {
  const { colors, fonts } = useTheme() as any;
  const [localMenu, setLocalMenu] = useState(null) as any;

  useEffect(() => {
    if (active_menu) {
      setLocalMenu(active_menu);
    }
  }, [active_menu]);

  const getKeys = (item: any) => item.muid;
  const goBack = () => {
    navigation.goBack();
  };
  const goSection = (sect) => {
    navigation.navigate("Section", sect);
  };

  const renderItem = ({ item }) => {
    const goNav = () => navigation.navigate("Item", item);
    return (
      <TouchableOpacity
        onPress={goNav}
        style={{
          flexDirection: "column",
          marginRight: wp("4%"),
        }}
      >
        <FastImage
          style={{
            width: wp("28%"),
            height: wp("28%"),
            borderRadius: wp("3%"),
          }}
          source={{
            uri: `https://octiblemedia.s3-accelerate.amazonaws.com/items/${item.id}/default`,
            priority: FastImage.priority.high,
          }}
        />
        <Text
          style={{
            fontSize: 13,
            fontFamily: fonts.bold,
            color: colors.primaryGrey,
            marginTop: hp("1%"),
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: fonts.regular,
            color: colors.primaryGrey,
            marginTop: hp(".5%"),
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
            marginTop: hp(".7%"),
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
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.backgroundPurple }}>
      <TouchableOpacity
        onPress={goBack}
        style={{
          position: "absolute",
          zIndex: 1,
          height: hp("5%"),
          width: wp("10%"),
          marginTop: hp("2.5%"),
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
      <FastImage
        source={{
          uri: `https://octiblemedia.s3-accelerate.amazonaws.com/menus/${localMenu?.muid}/default`,
          priority: FastImage.priority.high,
        }}
        style={{
          width: wp("100%"),
          height: wp("65%"),
          borderRadius: wp("10%"),
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          fontSize: 40,
          fontFamily: fonts.bold,
          color: colors.backgroundWhite,
          marginTop: hp("21%"),
          position: "absolute",
          alignSelf: "center",
        }}
      >
        {active_menu?.menu_name}
      </Text>
      {active_menu?.sections.map((section) => (
        <View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => goSection(section)}
            style={{
              flexDirection: "row",
              marginLeft: wp("4%"),
              marginRight: wp("4%"),
              justifyContent: "space-between",
              marginTop: hp("2%"),
              paddingTop: hp("3%"),
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: fonts.bold,
                color: colors.primaryGrey,
              }}
            >
              {section.title}
            </Text>
            <View
              style={{
                flex: 1,
                height: hp(".2%"),
                backgroundColor: colors.primaryGrey,
                marginTop: hp("1.9%"),
                marginLeft: wp("15%"),
              }}
            />
            <Text
              style={{
                fontSize: 13,
                fontFamily: fonts.regular,
                color: colors.primaryGrey,
                marginTop: hp(".6%"),
                paddingLeft: wp("4%"),
              }}
            >
              View
            </Text>
          </TouchableOpacity>
          <FlatList
            data={active_menu?.items.filter(
              (item) => item.section === section.title
            )}
            renderItem={renderItem}
            horizontal={true}
            contentContainerStyle={{
              marginLeft: wp("4%"),
              marginTop: hp("1.6"),
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => ({
  active_menu: state.menus.active_menu,
});

const mapDispatchToProps = (dispatch: any) => ({
  setActiveMenu: (menu) => dispatch(doSetActiveMenu(menu)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
