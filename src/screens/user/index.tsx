import React, { useRef } from "react";
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
import { SharedElement } from "react-navigation-shared-element";
import FadeInView from "../../components/fadeInView";
import { getName } from "../../lib/Helpers";
import Icon from "react-native-vector-icons/Ionicons";

const User: React.FC<{
  navigation: any;
  logout: () => void;
  graph_authenticated;
  user: any;
}> = ({ navigation, logout, graph_authenticated, user }) => {
  const { colors, fonts } = useTheme() as any;

  let userName = user?.uid.substring(0, 8);
  if (user?.displayName) {
    userName = getName(user.displayName);
  }

  const goPhone = () => navigation.push("SignInPhone");
  const goApple = () => signInApple();
  const goGoogle = () => signInGoogle();
  const goFacebook = () => signInFacebook();
  const goLogout = () => logout();
  const goBusiness = () => {
    navigation.navigate("NewBusiness");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundPurple,
        paddingLeft: wp("4%"),
        paddingRight: wp("4%"),
      }}
    >
      {user && !user?.isAnonymous ? (
        <View style={{ marginTop: hp("10%") }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                maxWidth: wp("70%"),
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: fonts.bold,
                  color: colors.primaryGrey,
                }}
              >
                Hi
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: fonts.regular,
                  color: colors.primaryGrey,
                  marginLeft: wp("3%"),
                }}
              >
                {userName}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: wp("20%"),
                justifyContent: "center",
              }}
              onPress={goLogout}
            >
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: 15,
                  color: "red",
                  fontWeight: "500",
                  alignSelf: "flex-end",
                  marginTop: hp(".5%"),
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: hp("8%"),
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: fonts.bold,
                color: colors.primaryGrey,
              }}
            >
              Business
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                borderRadius: wp("4%"),
                width: wp("7%"),
                height: wp("7%"),
                justifyContent: "center",
              }}
              onPress={goBusiness}
            >
              <Icon
                style={{
                  fontSize: 26,
                  alignSelf: "center",
                  marginLeft: wp(".3%"),
                }}
                name="add"
                color={colors.backgroundBlack}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View style={{ marginTop: hp("15%") }}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: fonts.bold,
                color: colors.primaryGrey,
              }}
            >
              Welcome to lineup!
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
      )}
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  graph_authenticated: state.auth.graph_authenticated,
  user: state.user?.user,
});

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
