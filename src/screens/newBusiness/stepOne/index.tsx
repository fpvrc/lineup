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
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../../../components/header";
import { idGenerator } from "../../../api/Workers";
import Button from "../../../components/buttons/regular";
import { validateInput } from "../../../lib/Helpers";
import {
  doRenderBusiness,
  doAddBusiness,
  doStepOne,
} from "../../../redux/actions/Business";

const StepOne: React.FC<{
  navigation: any;
  uid: any;
  addBusiness: (uid: string, formData: object) => void;
  renderBusiness: (formData: object) => void;
  stepOne: (formData: object) => void;
}> = ({ navigation, stepOne }) => {
  const { colors, fonts } = useTheme() as any;

  const [formData, setFormData] = useState({
    buid: idGenerator(),
    name: "",
    description: "",
    photos: [],
  }) as any;

  const [errors, setErrors] = useState({
    name: false,
  }) as any;
  const inputRef = useRef() as any;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const changeTitle = (new_text: string) => {
    setFormData((prevState) => ({
      ...prevState,
      name: new_text,
    }));
    if (errors.name) {
      setErrors((prevState) => ({
        ...prevState,
        name: false,
      }));
    }
  };

  const changeDescription = (new_text: string) => {
    setFormData((prevState) => ({
      ...prevState,
      description: new_text,
    }));
  };

  const goBusiness = () => {
    if (validateInput(formData.name)) {
      stepOne(formData);
      navigation.navigate("StepTwo");
    } else {
      setErrors({
        name: !Boolean(formData.name),
      });
    }
  };

  const closeKeyboard = () => Keyboard.dismiss();

  const goBack = () => navigation.goBack();

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.backgroundPurple,
          paddingLeft: wp("4%"),
          paddingRight: wp("4%"),
        }}
      >
        <Header
          onPress={goBack}
          onInfo={null}
          showInfo={false}
          steps={["active", ""] as any}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.bold,
            marginTop: hp("5%"),
            color: errors.name ? "red" : colors.primaryGrey,
          }}
        >
          Business Name*
        </Text>
        <TextInput
          ref={inputRef as any}
          keyboardType="default"
          keyboardAppearance={colors.keyboard}
          onChangeText={changeTitle}
          selectionColor={colors.primaryGrey}
          placeholder={"Bar Wagon"}
          placeholderTextColor={"grey"}
          style={{
            marginTop: hp(".5%"),
            height: wp("7%"),
            fontSize: 24,
            fontFamily: fonts.regular,
            color: colors.primaryGrey,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.bold,
            marginTop: hp("2%"),
            color: colors.primaryGrey,
          }}
        >
          Description
        </Text>
        <TextInput
          keyboardType="default"
          keyboardAppearance={colors.keyboard}
          onChangeText={changeDescription}
          selectionColor={colors.primaryGrey}
          placeholder={"Your favorite local bar"}
          multiline={true}
          maxLength={280}
          numberOfLines={2}
          placeholderTextColor={"grey"}
          style={{
            marginTop: hp(".5%"),
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.primaryGrey,
          }}
        />
        <Button
          onPress={() => goBusiness()}
          backgroundColor={colors.primaryGreen}
          textColor={colors.primaryWhite}
          text={"Continue"}
          icon={null}
          activeOpacity={1}
          styles={{
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            marginBottom: hp("10%"),
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => ({
  uid: state.user.user?.uid,
});

const mapDispatchToProps = (dispatch) => ({
  addBusiness: (uid, formData) => dispatch(doAddBusiness(uid, formData)),
  renderBusiness: (formData) => dispatch(doRenderBusiness(formData)),
  stepOne: (formData) => dispatch(doStepOne(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);
