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
import { SharedElement } from "react-navigation-shared-element";
import FadeInView from "../../components/fadeInView";

const User: React.FC<{
  navigation: any;
  logout: () => void;
  graph_authenticated;
  user: any;
}> = ({ navigation, logout, graph_authenticated, user }) => {
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
      <FadeInView>
        {user && !user?.isAnonymous ? (
          <View style={{ marginTop: hp("25%") }}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: fonts.bold,
                color: colors.primaryGrey,
              }}
            >
              {`Hello User: `}
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontFamily: fonts.regular,
                color: colors.primaryGrey,
              }}
            >
              {`${user?.uid.substring(0, 8)}`}
            </Text>
            <Button
              onPress={goLogout}
              backgroundColor={"red"}
              textColor={colors.primaryWhite}
              text={"Logout"}
              icon={null}
              activeOpacity={1}
              styles={{
                width: wp("20%"),
                height: hp("4%"),
                borderRadius: wp("5%"),
                marginTop: hp("1%"),
              }}
            />
          </View>
        ) : (
          <View>
            <View style={{ marginTop: hp("25%") }}>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: fonts.bold,
                  color: colors.primaryGrey,
                }}
              >
                Hello:
              </Text>
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
        )}
      </FadeInView>
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
