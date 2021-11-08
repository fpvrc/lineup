import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { launchImageLibrary } from "react-native-image-picker";
import Button from "../buttons/regular";
import { idGenerator } from "../../api/Workers";
import Tile from "./Tile";
import SortableList from "./SortableList";

const options = {
  mediaType: "photo",
  title: "Select an image",
};

const PhotoUploader: React.FC<{}> = ({}) => {
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
    <View
      style={{
        width: wp("92%"),
        height: hp("80%"),
        backgroundColor: colors.backgroundPurple,
        borderRadius: wp("5%"),
      }}
    >
      <Button
        onPress={addPhoto}
        backgroundColor={colors.primaryGreen}
        textColor={colors.primaryWhite}
        text={"Add Photo"}
        icon={null}
        activeOpacity={1}
        styles={{
          marginTop: hp("3%"),
          width: wp("60%"),
          alignSelf: "center",
        }}
      />
      <SortableList>
        {tiles.map((tile) => (
          <Tile
            onLongPress={() => true}
            key={tile.id}
            id={tile.id}
            uir={tile.uri}
          />
        ))}
      </SortableList>
    </View>
  );
};

const tiles = [
  {
    id: "google",
    uri: "https://google.com",
  },

  {
    id: "expo",
    uri: "https://expo.io",
  },
  {
    id: "facebook",
    uri: "https://facebook.com",
  },
  {
    id: "reanimated",
    uri: "https://docs.swmansion.com/react-native-reanimated/",
  },
  {
    id: "github",
    uri: "https://github.com",
  },
  {
    id: "rnnavigation",
    uri: "https://reactnavigation.org/",
  },
  {
    id: "youtube",
    uri: "https://youtube.com",
  },
  {
    id: "twitter",
    uri: "https://twitter.com",
  },
];

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoUploader);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
