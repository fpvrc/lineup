import React, { useState, useEffect, useRef } from "react";
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
      {[...photos].map((tile, index) => (
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

export default PhotoUploader;
