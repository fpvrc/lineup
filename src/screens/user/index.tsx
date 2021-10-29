import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Button from "../../components/buttons/regular";
import { signInApple, signInFacebook, signInGoogle } from "../../api/Auth";
import { doLogout } from "../../redux/actions/Auth";

const User: React.FC<{ navigation: any; logout: () => void }> = ({
  navigation,
  logout,
}) => {
  const { colors, fonts } = useTheme() as any;

  const goPhone = () => navigation.push("SignInPhone");
  const goApple = () => signInApple();
  const goGoogle = () => signInGoogle();
  const goFacebook = () => signInFacebook();
  const goLogout = () => logout();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundPurple,
        padding: wp("4%"),
      }}
    >
      <View style={{ marginTop: hp("25%") }}>
        <TouchableOpacity activeOpacity={1} onPress={goLogout}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: fonts.bold,
              color: colors.primaryGrey,
            }}
          >
            Hello!
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 30,
            fontFamily: fonts.bold,
            color: colors.primaryGrey,
          }}
        >
          Project Starter
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.primaryGrey,
            marginTop: hp(".7%"),
            marginLeft: wp(".5%"),
          }}
        >
          Create an account or login
        </Text>
      </View>
      <View style={{ marginTop: hp("2%") }}>
        <Button
          onPress={goPhone}
          backgroundColor={colors.primaryGreen}
          textColor={colors.primaryWhite}
          text={"Continue with Phone"}
          icon={require(`../../../assets/icons/phone/phone.png`)}
          activeOpacity={1}
          styles={{ marginTop: hp("2.5%") }}
        />
        <Button
          onPress={goApple}
          backgroundColor={colors.primaryGreen}
          textColor={colors.primaryWhite}
          text={"Continue with Apple"}
          icon={require(`../../../assets/icons/apple/apple.png`)}
          activeOpacity={1}
          styles={{ marginTop: hp("2.5%") }}
        />
        <Button
          onPress={goGoogle}
          backgroundColor={colors.primaryGreen}
          textColor={colors.primaryWhite}
          text={"Continue with Google"}
          icon={require(`../../../assets/icons/google/google.png`)}
          activeOpacity={1}
          styles={{ marginTop: hp("2.5%") }}
        />
        <Button
          onPress={goFacebook}
          backgroundColor={colors.primaryGreen}
          textColor={colors.primaryWhite}
          text={"Continue with Facebook"}
          icon={require(`../../../assets/icons/facebook/facebook.png`)}
          activeOpacity={1}
          styles={{ marginTop: hp("2.5%") }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(doLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
