import React, {useState} from "react";
import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'



function SearchBar(props) {
    const[term, setTerm] = useState("");

    function passTerm(){
        props.onSearch(term);
    };

    function handleTermChange(e){
        setTerm(e.target.value);
    };

    return (
    <div className={styles.searchBar}>
        <input type="text" placeholder="Song search" onChange={handleTermChange} className={styles.inputSearch} />
        <button onClick={passTerm} className={styles.buttonSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
    </div>
)
};


export default SearchBar;