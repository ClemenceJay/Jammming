import React, {useState} from "react";
import Tracklist from "../Tracklist/Tracklist";

function SearchResult(props){
    return <Tracklist list={props.results} id="trackResults" onAdd={props.onAdd} />
}

export default SearchResult;