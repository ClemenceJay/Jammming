import React from "react";
import styles from "./Track.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function Track(props){
    function AddTrack(){
        props.onAdd(props.track)
    };

    function RemoveTrack(){
        props.onRemove(props.track)
    };
    
    function CreateButton(){
        if(props.onAdd){
            return <button onClick={AddTrack} className={styles.addButton}> <FontAwesomeIcon icon={faPlus} /> </button>
        } else {
            return <button onClick={RemoveTrack} className={styles.deleteButton} > <FontAwesomeIcon icon={faTrash} /> </button>
        }
    };

    return(
        <div className={styles.cardSong}>
            <img src={props.track.albumImg} />
            <div id={styles.infoTrack} >
                <p id={styles.titreTrack}>{props.track.title}</p>
                <p id={styles.artistTrack}>{props.track.artist} </p>
                <p id={styles.albumTrack}>{props.track.album} </p>
            </div>
            <div>
                <CreateButton />
            </div>
        </div>
    )
};

export default Track;