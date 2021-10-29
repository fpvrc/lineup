import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
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
import { doAddMenu, doInstantRender } from "../../redux/actions/Menus";
import { idGenerator } from "../../api/Workers";
import AddSection from "./AddSection";
import AddItem from "./AddItem";

const options = {
  mediaType: "photo",
  title: "Select an image",
};

const NewMenu: React.FC<{
  navigation: any;
  addMenu: (uid: string, formData: object) => void;
  instantRender: (menu: object) => void;
  uid: string;
}> = ({ navigation, uid, addMenu, instantRender }) => {
  const { colors, fonts } = useTheme() as any;
  const inputRef = useRef() as any;
  const [modals, setModals] = useState("");
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    muid: idGenerator(),
    menu_name: "",
    main_photo: "",
    sections: [],
    items: [],
  }) as any;

  const changeText = (new_text: string) => {
    setFormData((prevState) => ({
      ...prevState,
      menu_name: new_text,
    }));
  };

  const addSection = (section) => {
    setFormData((prevState) => ({
      ...prevState,
      sections: [...prevState.sections, section],
    }));
  };
  const addItem = (item) => {
    setFormData((prevState) => ({
      ...prevState,
      items: [...prevState.items, item],
    }));
  };

  const goBack = () => navigation.goBack();
  const goAdd = () => {
    if (!formData.menu_name) {
      setError(true);
    } else {
      instantRender(formData);
      addMenu(uid, formData);
      navigation.goBack();
    }
  };

  const openSection = () => setModals("section");
  const openItem = () => {
    if (!formData.sections.length) {
      Alert.alert("1 Section Required");
    } else {
      setModals("item");
    }
  };
  const closeModal = () => setModals("");

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
        main_photo: uri,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header onPress={goBack} onInfo={null} showInfo={false} />
      <Text
        style={{
          fontSize: 14,
          fontFamily: fonts.regular,
          color: error ? "red" : colors.primaryBlack,
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
      {formData.main_photo ? (
        <TouchableOpacity
          style={{
            marginTop: hp("1%"),
            marginLeft: wp("4%"),
            marginRight: wp("4%"),
            shadowOpacity: 0.25,
            elevation: 6,
            shadowRadius: 12,
            shadowOffset: { width: 1, height: 10 },
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
              uri: formData.main_photo,
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
            shadowOpacity: 0.25,
            elevation: 6,
            shadowRadius: 12,
            shadowOffset: { width: 1, height: 10 },
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
          fontFamily: fonts.regular,
          color: colors.primaryBlack,
          marginTop: hp("3%"),
          marginLeft: wp("4%"),
        }}
      >
        {`Sections (${formData.sections.length})`}
      </Text>
      <Button
        onPress={openSection}
        backgroundColor={colors.backgroundLightGrey}
        textColor={colors.backgroundBlack}
        text={`Add Section`}
        icon={null}
        activeOpacity={1}
        styles={{ alignSelf: "center", marginTop: hp("1%") }}
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
        {`Items (${formData.items.length})`}
      </Text>
      <Button
        onPress={openItem}
        backgroundColor={colors.backgroundLightGrey}
        textColor={colors.backgroundBlack}
        text={"Add Item"}
        icon={null}
        activeOpacity={1}
        styles={{ alignSelf: "center", marginTop: hp("2%") }}
      />
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
      <AddSection
        closeModal={closeModal}
        addSection={addSection}
        sections={formData.sections}
        isOpen={modals === "section" ? true : false}
        modals={modals}
      />
      <AddItem
        closeModal={closeModal}
        addItem={addItem}
        items={formData.items}
        sections={formData.sections}
        isOpen={modals === "item" ? true : false}
        modals={modals}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  uid: state.user.user.uid,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch: any) => ({
  addMenu: (uid, formData) => dispatch(doAddMenu(uid, formData)),
  instantRender: (menu) => dispatch(doInstantRender(menu)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMenu);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
