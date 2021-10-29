import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TextInput,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import Button from "../../components/buttons/regular";
import { idGenerator } from "../../api/Workers";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import { launchImageLibrary } from "react-native-image-picker";
import { uploadItemPhoto } from "../../api/Menus";

const options = {
  mediaType: "photo",
  title: "Select an image",
};

const AddItem: React.FC<{
  isOpen: boolean;
  closeModal: () => void;
  addItem: (item: object) => void;
  items: any;
  sections: any;
  modals: string;
}> = ({ isOpen, closeModal, addItem, items, modals, sections }) => {
  const { colors, fonts } = useTheme() as any;
  const inputRef = useRef() as any;
  const inputRef2 = useRef() as any;
  const inputRef3 = useRef() as any;
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    id: idGenerator(),
    title: "",
    sub_title: "",
    photo: "",
    price: "",
    section: "",
  }) as any;

  const changeTitle = (text) =>
    setFormData((prevState) => ({
      ...prevState,
      title: text,
    }));
  const changeSubTitle = (text) =>
    setFormData((prevState) => ({
      ...prevState,
      sub_title: text,
    }));
  const changePrice = (text) =>
    setFormData((prevState) => ({
      ...prevState,
      price: text,
    }));

  const getKeys = (item: any) => item.id;
  const goSave = () => {
    if (!formData.title || !formData.sub_title || !formData.price) {
      setError(true);
    } else {
      addItem(formData);
      setFormData((prevState) => ({
        id: idGenerator(),
        title: "",
        sub_title: "",
        photo: "",
        price: "",
        section: prevState.section,
      }));
      if (error) {
        setError(false);
      }
    }
  };

  const updatePicker = (itemValue, index) => {
    setFormData((prevState) => ({
      ...prevState,
      section: sections[index].title,
    }));
  };

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
      uploadItemPhoto(formData.id, uri);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (modals === "item") {
      inputRef.current.focus();
      setFormData((prevState) => ({
        ...prevState,
        section: sections.length ? sections[0].title : "",
      }));
    }
  }, [modals]);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: colors.primaryGrey,
          borderRadius: wp("3%"),
          height: hp("5%"),
          justifyContent: "center",
          alignItems: "center",
          marginTop: hp("1%"),
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            fontWeight: "bold",
            color: colors.primaryBlack,
          }}
        >
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
      onBackdropPress={closeModal}
      isVisible={isOpen}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
    >
      <View
        style={{
          alignSelf: "center",
          width: wp("92%"),
          height: hp("90%"),
          backgroundColor: colors.backgroundPurple,
          borderRadius: wp("5%"),
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: error
              ? !formData.title
                ? "red"
                : colors.primaryGrey
              : colors.primaryGrey,
            marginTop: hp("5%"),
            marginLeft: wp("4%"),
          }}
        >
          Title
        </Text>
        <TextInput
          ref={inputRef as any}
          keyboardType="default"
          value={formData.title}
          keyboardAppearance={"light"}
          onChangeText={changeTitle}
          selectionColor={colors.primaryGrey}
          placeholder={"Steak"}
          style={{
            marginTop: hp(".5%"),
            height: wp("7%"),
            fontSize: 24,
            fontFamily: fonts.regular,
            marginLeft: wp("4%"),
            color: colors.primaryGrey,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: error
              ? !formData.sub_title
                ? "red"
                : colors.primaryGrey
              : colors.primaryGrey,
            marginTop: hp("2%"),
            marginLeft: wp("4%"),
          }}
        >
          Subtitle
        </Text>
        <TextInput
          ref={inputRef2 as any}
          keyboardType="default"
          value={formData.sub_title}
          keyboardAppearance={"light"}
          onChangeText={changeSubTitle}
          selectionColor={colors.primaryGrey}
          placeholder={"Local steak"}
          style={{
            marginTop: hp(".5%"),
            height: wp("7%"),
            fontSize: 24,
            fontFamily: fonts.regular,
            marginLeft: wp("4%"),
            color: colors.primaryGrey,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: error
              ? !formData.price
                ? "red"
                : colors.primaryGrey
              : colors.primaryGrey,
            marginTop: hp("2%"),
            marginLeft: wp("4%"),
          }}
        >
          Price
        </Text>
        <TextInput
          ref={inputRef3 as any}
          keyboardType="default"
          value={formData.price}
          keyboardAppearance={"light"}
          onChangeText={changePrice}
          selectionColor={colors.primaryGrey}
          placeholder={"$29.99"}
          style={{
            marginTop: hp(".5%"),
            height: wp("7%"),
            fontSize: 24,
            fontFamily: fonts.regular,
            marginLeft: wp("4%"),
            color: colors.primaryGrey,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.primaryGrey,
            marginTop: hp("2%"),
            marginLeft: wp("4%"),
          }}
        >
          Section
        </Text>
        <Picker
          selectedValue={formData.section}
          mode="dialog"
          enabled={true}
          style={{
            height: hp("10%"),
            width: wp("60%"),
          }}
          itemStyle={{
            height: hp("13%"),
            marginTop: hp("-2.8%"),
            marginLeft: wp("1.5%"),
          }}
          onValueChange={updatePicker}
        >
          {sections.map((section) => (
            <Picker.Item
              label={`${section.title}`}
              value={`${section.title}`}
            />
          ))}
        </Picker>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.primaryGrey,
            marginTop: hp("-1.5%"),
            marginLeft: wp("4%"),
          }}
        >
          Photo
        </Text>
        {formData.photo ? (
          <TouchableOpacity
            style={{
              marginTop: hp("1%"),
              width: wp("30%"),
              height: wp("30%"),
              borderRadius: wp("5%"),
              marginLeft: wp("4%"),
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
              marginLeft: wp("4%"),
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
          onPress={goSave}
          backgroundColor={colors.primaryGreen}
          textColor={colors.backgroundBlack}
          text={"Add Item"}
          icon={null}
          activeOpacity={1}
          styles={{
            width: wp("50%"),
            marginLeft: wp("4%"),
            marginTop: hp("3%"),
          }}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.primaryGrey,
            marginLeft: wp("4%"),
            marginTop: hp("3%"),
          }}
        >
          {`Items (${items.length})`}
        </Text>
        <FlatList
          data={items}
          keyExtractor={getKeys}
          renderItem={renderItem}
          style={{ maxHeight: hp("25%") }}
          contentContainerStyle={{
            marginLeft: wp("4%"),
            marginRight: wp("4%"),
            marginTop: hp("1%"),
          }}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeModal}
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

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
