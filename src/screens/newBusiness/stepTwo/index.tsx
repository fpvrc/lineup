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
import Icon from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import { launchImageLibrary } from "react-native-image-picker";
import { uploadBusinessPhoto } from "../../../api/Business";
import { idGenerator } from "../../../api/Workers";
import Button from "../../../components/buttons/regular";
import { validateInput } from "../../../lib/Helpers";
import {
  doRenderBusiness,
  doAddBusiness,
  doUploadMain,
  doUploadCover,
} from "../../../redux/actions/Business";
import PhotoUploader from "../../../components/photoUploader";
import PhotoModal from "./photos";
import { addPhoto } from "../../../lib/AddPhoto";

const options = {
  mediaType: "photo",
  title: "Select an image",
};

const StepTwo: React.FC<{
  navigation: any;
  uid: any;
  addBusiness: (uid: string, formData: object) => void;
  renderBusiness: (formData: object) => void;
  uploadMain: (buid: string, photo: object) => void;
  active_business: any;
  uploadCover: (buid: string, photo: object) => void;
}> = ({
  navigation,
  uid,
  addBusiness,
  renderBusiness,
  uploadMain,
  active_business,
  uploadCover,
}) => {
  const { colors, fonts } = useTheme() as any;
  const [visible, setVisible] = useState(false) as any;
  const [photos, setPhotos] = useState(active_business.photos) as any;

  const [errors, setErrors] = useState({
    main: false,
    cover: false,
  }) as any;

  const inputRef = useRef<any>();

  const goBusiness = () => {};

  const goBack = () => navigation.goBack();
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const goAddMain = async () => {
    let res = await addPhoto();
    let photo = {
      id: idGenerator(),
      uri: res,
      type: "main",
    };
    setPhotos((prevState) => [photo, ...prevState]);
  };

  const goAddCover = async () => {
    let res = await addPhoto();
    let photo = {
      id: idGenerator(),
      uri: res,
      type: "cover",
    };
    setPhotos((prevState) => [photo, ...prevState]);
  };

  const addAnother = async (another_photo) => {
    setPhotos((prevState) => [another_photo, ...prevState]);
  };

  const main_photo = photos.find((photo) => photo.type === "main");
  const cover_photo = photos.find((photo) => photo.type === "cover");
  const galery_photos = photos.filter((photo) => !photo.type);
  console.log(photos);
  return (
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
        steps={["active", "active"] as any}
      />
      <Text
        style={{
          fontSize: 14,
          fontFamily: fonts.bold,
          marginTop: hp("4%"),
          color: errors.photo ? "red" : colors.primaryGrey,
        }}
      >
        Main Photo*
      </Text>
      {main_photo ? (
        <TouchableOpacity
          style={{
            marginTop: hp("1%"),
            width: wp("30%"),
            height: wp("30%"),
            borderRadius: wp("5%"),
          }}
          onPress={goAddMain}
          activeOpacity={1}
        >
          <FastImage
            style={{
              width: wp("30%"),
              height: wp("30%"),
              borderRadius: wp("5%"),
            }}
            source={{
              uri: main_photo.uri,
              priority: FastImage.priority.low,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={goAddMain}
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
      <Text
        style={{
          fontSize: 14,
          fontFamily: fonts.bold,
          marginTop: hp("4%"),
          color: errors.photo ? "red" : colors.primaryGrey,
        }}
      >
        Cover Photo*
      </Text>
      {cover_photo ? (
        <TouchableOpacity
          onPress={goAddCover}
          style={{
            marginTop: hp("1%"),
            height: wp("50%"),
            borderRadius: wp("5%"),
          }}
          activeOpacity={1}
        >
          <FastImage
            style={{
              height: wp("50%"),
              borderRadius: wp("5%"),
            }}
            source={{
              uri: cover_photo.uri,
              priority: FastImage.priority.low,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={goAddCover}
          activeOpacity={1}
          style={{
            backgroundColor: colors.backgroundLightBlue,
            justifyContent: "center",
            marginTop: hp("1%"),
            height: wp("50%"),
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
      <Text
        style={{
          fontSize: 14,
          fontFamily: fonts.bold,
          marginTop: hp("4%"),
          color: errors.photo ? "red" : colors.primaryGrey,
        }}
      >
        Galery
      </Text>
      <Button
        onPress={openModal}
        backgroundColor={colors.backgroundLightBlue}
        textColor={colors.backgroundBlack}
        text={"Add Photo"}
        icon={null}
        activeOpacity={1}
        styles={{ marginTop: hp("1%"), width: wp("30%") }}
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
      <PhotoModal
        addAnother={addAnother}
        photos={galery_photos}
        visible={visible}
        close={closeModal}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  uid: state.user.user?.uid,
  active_business: state.business.active_business,
});

const mapDispatchToProps = (dispatch) => ({
  addBusiness: (uid, formData) => dispatch(doAddBusiness(uid, formData)),
  renderBusiness: (formData) => dispatch(doRenderBusiness(formData)),
  uploadMain: (buid, photo) => dispatch(doUploadMain(buid, photo)),
  uploadCover: (buid, photo) => dispatch(doUploadCover(buid, photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);
