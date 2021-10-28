import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TextInput,
  Text,
  FlatList,
  Alert,
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

const AddSection: React.FC<{
  isOpen: boolean;
  closeModal: () => void;
  addSection: (section: object) => void;
  sections: any;
}> = ({ isOpen, closeModal, addSection, sections }) => {
  const { colors, fonts } = useTheme() as any;
  const inputRef = useRef() as any;
  const [text, setText] = useState("");

  const changeText = (text) => setText(text);
  const getKeys = (item: any) => item.id;
  const goSave = () => {
    if (!text.length) return;
    addSection({ id: idGenerator(), section: text });
    /*
    setSections((prevState) => [
      { id: idGenerator(), section: text },
      ...prevState,
    ]);
    */
    setText("");
    return;
  };

  const renderSection = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: colors.backgroundLightYellow,
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
          {item.section}
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
          backgroundColor: colors.backgroundWhite,
          borderRadius: wp("5%"),
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.primaryBlack,
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
          selectionColor={colors.backgroundBlack}
          placeholder={"Entres"}
          style={{
            marginTop: hp("1%"),
            height: wp("7%"),
            fontSize: 24,
            fontFamily: fonts.regular,
            marginLeft: wp("4%"),
          }}
        />
        <Button
          onPress={goSave}
          backgroundColor={colors.backgroundLightGrey}
          textColor={colors.backgroundBlack}
          text={"Add Section"}
          icon={null}
          activeOpacity={1}
          styles={{
            width: wp("50%"),
            alignSelf: "center",
            marginTop: hp("1%"),
          }}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: fonts.regular,
            color: colors.primaryBlack,
            marginLeft: wp("4%"),
            marginTop: hp("1%"),
          }}
        >
          Sections
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
      </View>
    </Modal>
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddSection);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
