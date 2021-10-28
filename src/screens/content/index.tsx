import React from "react";
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

const Content: React.FC<{ navigation: any; my_menus: any }> = ({
  navigation,
  my_menus,
}) => {
  const { colors, fonts } = useTheme() as any;
  const goNewMenu = () => navigation.navigate("NewMenu");

  const getKeys = (item: any) => item.muid;

  const url =
    "https://octiblemedia.s3-accelerate.amazonaws.com/menus%2Fkvb6txlx4ri7ckg2fr%2Fdefault";

  const renderItem = ({ item }) => {
    const goNav = () => navigation.navigate("");
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={goNav}
        style={{
          backgroundColor: colors.backgroundLightGrey,
          width: wp("92%"),
          height: wp("70%"),
          borderRadius: wp("6%"),
          alignItems: "center",
          marginBottom: hp("2%"),
        }}
      >
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
            color: colors.primaryBlack,
            marginTop: hp("2.5%"),
          }}
        >
          {item.menu_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        onPress={goNewMenu}
        backgroundColor={colors.backgroundLightBlue}
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
            color: colors.primaryBlack,
          }}
        >
          My menus
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.primaryBlue,
          }}
        >
          Edit
        </Text>
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

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Content);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
