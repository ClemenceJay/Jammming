import React, {useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResult from '../SearchResult/SearchResult';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/spotify';

import styles from './App.module.css';


function App() {
  const [searchResults, setSearchResults] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [visibility, setVisibility] = useState("");

  const search = term => {
    setVisibility(true);
    Spotify.search(term).then((result) => setSearchResults(result));
  }
  
  const addTrack = track => {
    if(playlist.every((song) => song.id !== track.id)){
    setPlaylist((prevTrack) => [...prevTrack, track]);
  } else {
    alert("This song is already in your Playlist")
  }}

  const removeTrack = track => {
    setPlaylist(playlist.filter((song) => song.id !== track.id))
  }

  const spotiSave = name => {
    const trackToSave = playlist.map((song) => song.uri);
    Spotify.save(name, trackToSave).then(() => {
      setPlaylist([]);
      setSearchResults("");
      alert("Ta playlist a été sauvegardée, elle apparaitra sur ton compte spotify (cela peut prendre quelques minutes)");
    });
  }

  return (
    <div className={styles.app}>
      <div className={styles.titre}>
        <h1>Jammming</h1>
        <h2>Créateur de playlist</h2>
      </div>
      <SearchBar onSearch={search} />
      { visibility ? <div className={styles.allList}>
          <div className={styles.resultsCol}>
            <span className={styles.titreCol}>RESULTATS</span>
            <div id={styles.resultListSong}>
              <SearchResult results={searchResults} onAdd={addTrack} />
            </div>
          </div>
          <div className={styles.playlistCol}><Playlist addedSongs={playlist} onRemove={removeTrack} onSave={spotiSave} /></div>
      </div> : null }
    </div>
  );
}

export default App;
