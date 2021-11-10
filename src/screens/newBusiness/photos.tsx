import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { launchImageLibrary } from "react-native-image-picker";
import Button from "../../components/buttons/regular";
import { idGenerator } from "../../api/Workers";
import PhotoUploader from "../../components/photoUploader/index";

const options = {
  mediaType: "photo",
  title: "Select an image",
};

const PhotoModal: React.FC<{ close: () => void; visible }> = ({
  close,
  visible,
}) => {
  const { colors, fonts } = useTheme() as any;
  const [photos, setPhotos] = useState([]) as any;

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
      setPhotos((prevState) => [...prevState, { id: idGenerator(), uri: uri }]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (photos.length) {
      console.log(photos);
    }
  }, [photos]);

  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      isVisible={visible}
      useNativeDriver={true}
      onBackdropPress={close}
      presentationStyle="fullScreen"
    >
      <View
        style={{
          backgroundColor: colors.backgroundPurple,
          width: wp("90%"),
          height: hp("50%"),
          borderRadius: wp("5%"),
        }}
      ></View>
    </Modal>
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoModal);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
