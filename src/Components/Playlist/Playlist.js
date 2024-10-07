import React, {useState} from "react";
import Tracklist from "../Tracklist/Tracklist";
import styles from "./Playlist.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';


function Playlist(props){
    const [playlistName, setPlaylistName] = useState("");
    const [isDisplay, setIsDisplay] = useState(false);
    

    const HandleUserInput = e => {
        setPlaylistName(e.target.value);
    };

    const onSave = () => {
        if (playlistName) {
            setIsDisplay(false);
            props.onSave(playlistName);
            setPlaylistName("");
        } else {
            setIsDisplay(true)
        }
    };

    return(
    <div id={styles.playlistCol}>
        <div id={styles.divNamePlaylist}>
            <input type="text" placeholder="Titre de ta playlist" onChange={HandleUserInput} value={playlistName} id={styles.inputName} ></input>
        </div>
        <div id={styles.divTracklist}>
            <Tracklist list={props.addedSongs} id="playlist" onRemove={props.onRemove} />
        </div>
        <span className={isDisplay ? styles.afficher: styles.masquer} >Il manque un nom à ta playlist</span>
        <button onClick={onSave} id={styles.buttonSave} > <FontAwesomeIcon icon={faMusic} /> Save to Spotify</button>
    </div>
    )
}

export default Playlist;