import React, { useState } from "react";
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
import FadeInView from "../../components/fadeInView";

const Content: React.FC<{
  navigation: any;
  my_menus: any;
  setActiveMenu: (menu: object) => void;
}> = ({ navigation, my_menus, setActiveMenu }) => {
  const { colors, fonts } = useTheme() as any;
  const goNewMenu = () => navigation.navigate("NewMenu");
  const [edit, setEdit] = useState(false);

  const getKeys = (item: any) => item.muid;
  const toggleEdit = () => setEdit(!edit);

  const renderItem = ({ item }) => {
    const goNav = () => {
      if (edit) {
        Alert.alert("To do");
        navigation.navigate("");
      } else {
        setActiveMenu(item);
        navigation.navigate("Menu");
      }
    };
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={goNav}
        style={[
          {
            backgroundColor: colors.backgroundBlack,
            width: wp("92%"),
            height: wp("70%"),
            borderRadius: wp("6%"),
            alignItems: "center",
            marginBottom: hp("2%"),
          },
          edit
            ? {
                shadowOpacity: 0.25,
                elevation: 6,
                shadowRadius: 12,
                shadowOffset: { width: 1, height: 10 },
              }
            : {},
        ]}
      >
        {edit ? (
          <Icon
            style={{
              fontSize: 32,
              alignSelf: "center",
              shadowOpacity: 0.25,
              elevation: 6,
              shadowRadius: 12,
              shadowOffset: { width: 1, height: 10 },
              position: "absolute",
              marginTop: hp("10%"),
            }}
            name="pencil"
            color={colors.backgroundBlack}
          />
        ) : null}

        <FastImage
          source={{ uri: item.main_photo }}
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
      <Button
        onPress={goNewMenu}
        backgroundColor={colors.primaryGreen}
        textColor={colors.primaryWhite}
        text={"Create Menu"}
        icon={null}
        activeOpacity={1}
        styles={{ marginTop: hp("10%"), alignSelf: "center" }}
      />
      <View
        style={{
          marginTop: hp("5%"),
          marginLeft: wp("4.5%"),
          marginRight: wp("4.5%"),
          paddingBottom: hp("2%"),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.primaryGrey,
          }}
        >
          My menus
        </Text>
        <TouchableOpacity activeOpacity={1} onPress={toggleEdit}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.regular,
              color: colors.primaryGreen,
            }}
          >
            {edit ? "Close" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={my_menus}
        renderItem={renderItem}
        keyExtractor={getKeys}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  my_menus: state.menus.my_menus,
});

const mapDispatchToProps = (dispatch: any) => ({
  setActiveMenu: (menu) => dispatch(doSetActiveMenu(menu)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
