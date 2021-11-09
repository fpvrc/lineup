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
            uri={tile.uri}
          />
        ))}
      </SortableList>
    </View>
  );
};

const tiles = [
  {
    id: "google",
    uri: "https://octiblemedia.s3.us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.06.13+PM.png",
  },

  {
    id: "expo",
    uri: "https://octiblemedia.s3.us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.12.45+PM.png",
  },
  {
    id: "facebook",
    uri: "https://octiblemedia.s3.us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.10+PM.png",
  },
  {
    id: "reanimated",
    uri: "https://octiblemedia.s3.us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.33+PM.png",
  },
  {
    id: "github",
    uri: "https://octiblemedia.s3.us-west-1.amazonaws.com/items/kvbrb23kgdqmi0nue7s/default",
  },
  {
    id: "rnnavigation",
    uri: "https://octiblemedia.s3.us-west-1.amazonaws.com/items/kvcp2st1wqubqmbnhmh/default",
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
