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
import { SharedElement } from "react-navigation-shared-element";
import Header from "../../components/header";

const UserProfile: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const { colors, fonts } = useTheme() as any;
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  });
  const inputRef = useRef<any>();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const changeText = (new_text: string) => {};

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
        <View style={{ marginTop: hp("25%") }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: fonts.bold,
              color: colors.primaryGrey,
            }}
          >
            Username
          </Text>
          <TextInput
            ref={inputRef as any}
            keyboardType="default"
            keyboardAppearance={colors.keyboard}
            onChangeText={changeText}
            selectionColor={colors.primaryGrey}
            placeholder={"Sam"}
            style={{
              marginTop: hp("1%"),
              height: wp("7%"),
              fontSize: 24,
              fontFamily: fonts.regular,
              color: colors.primaryGrey,
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
