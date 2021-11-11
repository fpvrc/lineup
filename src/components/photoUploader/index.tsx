import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MARGIN } from "../../lib/AnimatedConfig";
import Tile from "./Tile";
import SortableList from "./SortableList";
import { connect } from "react-redux";

const PhotoUploader: React.FC<{ photos: [any] }> = ({ photos }) => {
  return (
    <SortableList
      editing={true}
      onDragEnd={(positions) => console.log(JSON.stringify(positions, null, 2))}
    >
      {photos.map((tile, index) => (
        <Tile
          onLongPress={() => true}
          key={tile.id + "-" + index}
          id={tile.id + "-" + index}
          uri={tile.uri}
        />
      ))}
    </SortableList>
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
