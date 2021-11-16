import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { launchImageLibrary } from "react-native-image-picker";
import Button from "../../../components/buttons/regular";
import { idGenerator } from "../../../api/Workers";
import PhotoUploader from "../../../components/photoUploader/index";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { addPhoto } from "../../../lib/AddPhoto";

const options = {
  mediaType: "photo",
  title: "Select an image",
};

const PhotoModal: React.FC<{
  close: () => void;
  visible: boolean;
  photos: [any];
  addAnother: (photo: object) => void;
}> = ({ close, visible, photos, addAnother }) => {
  const { colors, fonts } = useTheme() as any;
  const [testing, setTesting] = useState([
    {
      id: idGenerator(),
      uri: "https://octiblemedia.s3.us-west-1.amazonaws.com/items/kvbrb23kgdqmi0nue7s/default",
    },
    {
      id: idGenerator(),
      uri: "https://octiblemedia.s3.us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.06.13+PM.png",
    },
  ]) as any;

  const goAddAnother = async () => {
    setTesting((prevState) => [
      ...prevState,
      {
        id: idGenerator(),
        uri: "https://octiblemedia.s3.us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.12.45+PM.png",
      },
    ]);
    return;
    let res = await addPhoto();
    let photo = {
      id: idGenerator(),
      uri: res,
      type: "",
    };
    console.log("ad", photo);
    addAnother(photo);
  };

  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      hideModalContentWhileAnimating={true}
      isVisible={visible}
      coverScreen={false}
      onBackdropPress={close}
    >
      <View
        style={{
          backgroundColor: colors.backgroundPurple,
          width: wp("90%"),
          height: hp("80%"),
          borderRadius: wp("5%"),
          padding: wp("4%"),
        }}
      >
        <Button
          onPress={goAddAnother}
          backgroundColor={colors.primaryGreen}
          textColor={colors.backgroundBlack}
          text={"Add Photo"}
          icon={null}
          activeOpacity={1}
          styles={{
            alignSelf: "center",
            marginTop: hp("2%"),
            width: wp("80%"),
            marginBottom: hp("4%"),
          }}
        />
        <PhotoUploader photos={testing as any} />
        <TouchableOpacity
          activeOpacity={1}
          onPress={close}
          style={{
            width: wp("15%"),
            height: wp("15%"),
            backgroundColor: colors.primaryGreen,
            justifyContent: "center",
            borderRadius: wp("10%"),
            alignSelf: "center",
            position: "absolute",
            bottom: hp("-3.5%"),
            shadowOpacity: 0.25,
            elevation: 6,
            shadowRadius: 12,
            shadowOffset: { width: 1, height: 10 },
          }}
        >
          <Icon
            style={{
              fontSize: 26,
              alignSelf: "center",
            }}
            name="close"
            color={colors.backgroundBlack}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoModal);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
