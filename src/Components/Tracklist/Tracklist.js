import React from "react";
import Track from "../Track/Track";


const Tracklist = ({list, onAdd, onRemove}) => {
   return Array.isArray(list) && list.map((track) => {
              return (<Track
              track={track}
              key={track.id}
              onAdd={onAdd}
              onRemove={onRemove}
            />)}
  )
};

export default Tracklist;