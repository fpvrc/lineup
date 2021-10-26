import React from "react";
import { StyleSheet, View, Platform, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../../components/buttons/regular";
import Header from "../../components/header/";

const NewMenu: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors, fonts } = useTheme() as any;
  const goNewMenu = () => navigation.navigate("NewMenu");
  const goBack = () => navigation.goBack();
  return (
    <View style={{ flex: 1 }}>
      <Header onPress={goBack} onInfo={null} showInfo={false} />
      <Button
        onPress={goNewMenu}
        backgroundColor={colors.backgroundLightBlue}
        textColor={colors.primaryWhite}
        text={"Create Menu"}
        icon={null}
        activeOpacity={1}
        styles={{ marginTop: hp("10%"), alignSelf: "center" }}
      />
      <Text
        style={{
          fontSize: 14,
          fontFamily: fonts.regular,
          color: colors.primaryBlack,
          marginTop: hp("5%"),
          marginLeft: wp("4.5%"),
        }}
      >
        My menus
      </Text>
    </View>
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NewMenu);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
