import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TextInput,
  Text,
  FlatList,
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
import Icon from "react-native-vector-icons/Ionicons";

const AddSection: React.FC<{
  isOpen: boolean;
  closeModal: () => void;
  addSection: (section: object) => void;
  sections: any;
  modals: string;
}> = ({ isOpen, closeModal, addSection, sections, modals }) => {
  const { colors, fonts } = useTheme() as any;
  const inputRef = useRef() as any;
  const [error, setError] = useState(false);
  const [text, setText] = useState("");

  const changeText = (text) => {
    setText(text);
    if (error) {
      setError(false);
    }
  };
  const getKeys = (item: any) => item.id;
  const goSave = () => {
    if (
      !text.length ||
      text.match(/^ *$/) ||
      sections.find((section) => section.title === text)
    ) {
      setError(true);
    } else {
      addSection({ id: idGenerator(), title: text });
    }
    setText("");
  };

  useEffect(() => {
    if (modals === "section") {
      inputRef.current.focus();
    }
  }, [modals]);

  const renderSection = ({ item }) => {
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
          height: hp("50%"),
          backgroundColor: colors.backgroundPurple,
          borderRadius: wp("5%"),
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: error ? "red" : colors.primaryGrey,
            marginTop: hp("5%"),
            marginLeft: wp("4%"),
          }}
        >
          Section Name
        </Text>
        <TextInput
          ref={inputRef as any}
          keyboardType="default"
          value={text}
          keyboardAppearance={"light"}
          onChangeText={changeText}
          selectionColor={colors.primaryGrey}
          placeholder={"Entres"}
          style={{
            marginTop: hp(".5%"),
            height: wp("7%"),
            fontSize: 24,
            fontFamily: fonts.regular,
            marginLeft: wp("4%"),
            color: colors.primaryGrey,
          }}
        />
        <Button
          onPress={goSave}
          backgroundColor={colors.primaryGreen}
          textColor={colors.backgroundBlack}
          text={"Add Section"}
          icon={null}
          activeOpacity={1}
          styles={{
            width: wp("50%"),
            marginLeft: wp("4%"),
            marginTop: hp("2%"),
          }}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.primaryGrey,
            marginLeft: wp("4%"),
            marginTop: hp("3.5%"),
          }}
        >
          {`Sections (${sections.length})`}
        </Text>
        <FlatList
          data={sections}
          keyExtractor={getKeys}
          renderItem={renderSection}
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

/*
    setSections((prevState) => [
      { id: idGenerator(), section: text },
      ...prevState,
    ]);
    */

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddSection);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
