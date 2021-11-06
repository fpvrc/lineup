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
import { SharedElement } from "react-navigation-shared-element";
import Header from "../../components/header";
import Icon from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import { launchImageLibrary } from "react-native-image-picker";
import { uploadBusinessPhoto } from "../../api/Business";
import { idGenerator } from "../../api/Workers";
import Button from "../../components/buttons/regular";
import { validateInput } from "../../lib/Helpers";
import { doRenderBusiness, doAddBusiness } from "../../redux/actions/Business";
import PhotoModal from "./photos";

const options = {
  mediaType: "photo",
  title: "Select an image",
};

const NewBusiness: React.FC<{
  navigation: any;
  uid: any;
  addBusiness: (uid: string, formData: object) => void;
  renderBusiness: (formData: object) => void;
}> = ({ navigation, uid, addBusiness, renderBusiness }) => {
  const { colors, fonts } = useTheme() as any;
  const [formData, setFormData] = useState({
    buid: idGenerator(),
    name: "",
    description: "",
    photo: "",
    photo2: "",
  }) as any;
  const [errors, setErrors] = useState({
    name: false,
    photo: false,
  }) as any;
  const inputRef = useRef<any>();

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
    if (validateInput(formData.name) && validateInput(formData.photo)) {
      renderBusiness(formData);
      addBusiness(uid, formData);
      navigation.goBack();
    } else {
      setErrors({
        name: !Boolean(formData.name),
        photo: !Boolean(formData.photo),
      });
    }
  };

  const closeKeyboard = () => Keyboard.dismiss();

  const goBack = () => navigation.goBack();

  const addPhoto = async () => {
    try {
      const promise = new Promise((resolve, reject) => {
        launchImageLibrary(options as any, (res: any) => {
          if (res.didCancel) {
            reject(new Error("User cancelled image picker"));
          } else if (res.errorMessage) {
            reject(new Error(res.errorMessage));
          } else {
            const source = res.assets[0]?.uri;
            resolve(source);
          }
        });
      });
      let uri = await promise;
      setFormData((prevState) => ({
        ...prevState,
        photo: uri,
      }));
      uploadBusinessPhoto(formData.buid, uri);
      if (errors.photo) {
        setErrors((prevState) => ({
          ...prevState,
          photo: false,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <Header onPress={goBack} onInfo={null} showInfo={false} />
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
          maxLength={100}
          numberOfLines={2}
          style={{
            marginTop: hp(".5%"),
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.primaryGrey,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.bold,
            marginTop: hp("2%"),
            color: errors.photo ? "red" : colors.primaryGrey,
          }}
        >
          Main Photo*
        </Text>
        {formData.photo ? (
          <TouchableOpacity
            style={{
              marginTop: hp("1%"),
              width: wp("30%"),
              height: wp("30%"),
              borderRadius: wp("5%"),
            }}
            onPress={addPhoto}
            activeOpacity={1}
          >
            <FastImage
              style={{
                width: wp("30%"),
                height: wp("30%"),
                borderRadius: wp("5%"),
              }}
              source={{
                uri: formData.photo,
                priority: FastImage.priority.low,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={addPhoto}
            activeOpacity={1}
            style={{
              backgroundColor: colors.backgroundLightBlue,
              justifyContent: "center",
              marginTop: hp("1%"),
              width: wp("30%"),
              height: wp("30%"),
              borderRadius: wp("5%"),
            }}
          >
            <Icon
              style={{
                fontSize: 64,
                alignSelf: "center",
                shadowOpacity: 0.25,
                elevation: 6,
                shadowRadius: 12,
                shadowOffset: { width: 1, height: 10 },
              }}
              name="add"
              color={colors.backgroundBlack}
            />
          </TouchableOpacity>
        )}
        <Button
          onPress={goBusiness}
          backgroundColor={colors.primaryGreen}
          textColor={colors.primaryWhite}
          text={"Add Business"}
          icon={null}
          activeOpacity={1}
          styles={{ marginTop: hp("4%") }}
        />
      </View>
      <PhotoModal />
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => ({
  uid: state.user.user?.uid,
});

const mapDispatchToProps = (dispatch) => ({
  addBusiness: (uid, formData) => dispatch(doAddBusiness(uid, formData)),
  renderBusiness: (formData) => dispatch(doRenderBusiness(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBusiness);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
