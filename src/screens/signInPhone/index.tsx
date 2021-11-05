import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CountryPicker from "react-native-region-country-picker";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import ProgressBar from "react-native-progress/Bar";
import { signInPhone } from "../../api/Auth";
import { SharedElement } from "react-navigation-shared-element";
import Header from "../../components/header";

const options = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false,
};

const SignInPhone: React.FC<{
  navigation: any;
  user: any;
}> = ({ navigation, user }) => {
  const { colors, fonts } = useTheme() as any;
  const [phone_number, setNumber] = useState("");
  const [verification_code, setVerificationCode] = useState("");
  const [countryData, setCountryData] = useState("1");
  const [confirm, setConfirm] = useState(null) as any;
  const [loading, setLoading] = useState("");
  const inputRef = useRef<any>();
  const inputRef2 = useRef<any>();

  const changeText = (new_text: string) => {
    ReactNativeHapticFeedback.trigger("impactLight", options);
    setNumber(new_text);
    setLoading("");
  };
  const changeCode = (new_text: string) => {
    ReactNativeHapticFeedback.trigger("impactLight", options);
    setVerificationCode(new_text);
    setLoading("");
  };

  const reFocus = () => inputRef.current.focus();
  const newCountry = (data: any) => {
    setCountryData(data.callingCode);
  };

  useEffect(() => {
    if (phone_number.length === 10) {
      try {
        (async () => {
          setLoading("phone_number");
          const confirmation = await signInPhone(
            `+${countryData}${phone_number}`
          );
          setLoading("");
          setConfirm(confirmation);
          inputRef2.current.focus();
        })();
      } catch (error) {
        console.log(error);
      }
    } else if (phone_number.length === 0) {
      setLoading("");
    }
  }, [phone_number]);

  useEffect(() => {
    if (verification_code.length === 6) {
      try {
        (async () => {
          setLoading("code");
          await confirm.confirm(verification_code);
          setLoading("");
          navigation.goBack();
        })();
      } catch (error) {
        console.log(error);
      }
    }
  }, [verification_code]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const closeKeyboard = () => Keyboard.dismiss();

  const goBack = () => navigation.goBack();

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.backgroundPurple,
          paddingLeft: wp("4%"),
        }}
      >
        <Header onPress={goBack} onInfo={null} showInfo={false} />
        <View style={{ marginTop: hp("4%") }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: fonts.bold,
              color: colors.primaryGrey,
            }}
          >
            Phone Number
          </Text>
          <View style={{ flexDirection: "row", marginTop: hp("3%") }}>
            <CountryPicker
              enable={true}
              darkMode={false}
              countryCode={countryData === "" ? "US" : countryData}
              containerConfig={{
                showFlag: true,
                showCallingCode: true,
                showCountryName: false,
                showCountryCode: false,
              }}
              onSelectCountry={newCountry}
              onClose={reFocus}
              containerStyle={{
                container: {},
                flagStyle: {
                  fontSize: 30,
                },
                callingCodeStyle: {
                  fontSize: 30,
                  fontFamily: fonts.regular,
                  color: colors.primaryGrey,
                },
              }}
              modalStyle={{
                container: {},
                searchStyle: { fontFamily: fonts.regular },
                tileStyle: {
                  fontFamily: fonts.regular,
                },
                itemStyle: {
                  itemContainer: {},
                  flagStyle: {},
                  countryCodeStyle: {
                    fontFamily: fonts.regular,
                  },
                  countryNameStyle: { fontFamily: fonts.regular },
                  callingNameStyle: { fontFamily: fonts.regular },
                },
              }}
              title={"Country"}
              searchPlaceholder={"Search"}
              showCloseButton={true}
              showModalTitle={true}
            />
            <TextInput
              ref={inputRef as any}
              keyboardType="numeric"
              keyboardAppearance={colors.keyboard}
              onChangeText={changeText}
              maxLength={10}
              selectionColor={colors.primaryGrey}
              style={{
                height: wp("10%"),
                fontSize: 30,
                fontFamily: fonts.regular,
                letterSpacing: wp("1%"),
                marginLeft: wp("1%"),
                flex: 1,
                color: colors.primaryGrey,
              }}
            />
          </View>
          {loading === "phone_number" ? (
            <ProgressBar
              style={{ position: "absolute", marginTop: hp("12.2%") }}
              indeterminate={true}
              width={wp("92%")}
              borderWidth={0}
              height={hp(".1%")}
              useNativeDriver={true}
            />
          ) : null}
          <TextInput
            placeholder={"code..."}
            ref={inputRef2 as any}
            keyboardType="numeric"
            keyboardAppearance={colors.keyboard}
            onChangeText={changeCode}
            textContentType="oneTimeCode"
            selectionColor={colors.primaryGrey}
            style={{
              height: wp("10%"),
              fontSize: 30,
              fontFamily: fonts.regular,
              letterSpacing: wp("1%"),
              marginLeft: wp("1%"),
              marginTop: hp("3%"),
              color: colors.primaryGrey,
            }}
          />
        </View>
        {loading === "code" ? (
          <ProgressBar
            indeterminate={true}
            width={wp("92%")}
            borderWidth={0}
            height={hp(".1%")}
            useNativeDriver={true}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPhone);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
