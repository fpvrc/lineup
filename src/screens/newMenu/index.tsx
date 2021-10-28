import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../../components/buttons/regular";
import Header from "../../components/header/";
import Icon from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";
import FastImage from "react-native-fast-image";
import { doAddMenu } from "../../redux/actions/Menus";

const options = {
  mediaType: "photo",
  title: "Select an image",
};

const NewMenu: React.FC<{
  navigation: any;
  addMenu: (uid: string, text: string, photoUri: string) => void;
  uid: string;
}> = ({ navigation, uid, addMenu }) => {
  const { colors, fonts } = useTheme() as any;
  const inputRef = useRef() as any;
  const [text, setText] = useState("");
  const [photoUri, setPhotoUri] = useState("") as any;
  const changeText = (new_text: string) => {
    setText(new_text);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const goNewMenu = () => navigation.navigate("NewMenu");
  const goBack = () => navigation.goBack();
  const goAdd = () => addMenu(uid, text, photoUri);

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
      setPhotoUri(uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header onPress={goBack} onInfo={null} showInfo={false} />
      <Text
        style={{
          fontSize: 14,
          fontFamily: fonts.regular,
          color: colors.primaryBlack,
          marginTop: hp("5%"),
          marginLeft: wp("4%"),
        }}
      >
        Menu Name
      </Text>
      <TextInput
        ref={inputRef as any}
        keyboardType="default"
        keyboardAppearance={"light"}
        onChangeText={changeText}
        selectionColor={colors.backgroundBlack}
        placeholder={"Brewski Bar"}
        style={{
          marginTop: hp("1%"),
          height: wp("7%"),
          fontSize: 24,
          fontFamily: fonts.regular,
          marginLeft: wp("4%"),
        }}
      />
      <Text
        style={{
          fontSize: 14,
          fontFamily: fonts.regular,
          color: colors.primaryBlack,
          marginTop: hp("3%"),
          marginLeft: wp("4%"),
        }}
      >
        Menu Photo
      </Text>
      {photoUri ? (
        <TouchableOpacity
          style={{
            marginTop: hp("1%"),
            marginLeft: wp("4%"),
            marginRight: wp("4%"),
          }}
          onPress={addPhoto}
          activeOpacity={1}
        >
          <FastImage
            style={{
              width: wp("92%"),
              height: wp("50%"),
              borderRadius: wp("5%"),
            }}
            source={{
              uri: photoUri,
              priority: FastImage.priority.low,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={addPhoto}
          activeOpacity={1}
          style={{
            backgroundColor: colors.backgroundLightGrey,
            justifyContent: "center",
            marginTop: hp("1%"),
            marginLeft: wp("4%"),
            marginRight: wp("4%"),
            height: hp("24%"),
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
        onPress={goAdd}
        backgroundColor={colors.backgroundLightBlue}
        textColor={colors.primaryWhite}
        text={"Add New Menu"}
        icon={null}
        activeOpacity={1}
        styles={{
          bottom: hp("7%"),
          alignSelf: "center",
          position: "absolute",
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  uid: state.user.user.uid,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch: any) => ({
  addMenu: (uid, menu_name, photo_uri) =>
    dispatch(doAddMenu(uid, menu_name, photo_uri)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMenu);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
