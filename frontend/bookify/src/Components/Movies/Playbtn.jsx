import React, {useState} from 'react'
import styles from "./Playbtn.module.css";
import Trailer from './Trailer';


function Playbtn({movie}) {
const [trailer, setTrailer]=useState(false)
const toggleTrailer = ()=>{
setTrailer(!trailer)
};

  return (
<>

    <div 
    className={`${styles.trailer} d-flex align-items-center justify-content-center ${movie.active ? styles.trailerActive : ''}`}>
    <a href="#" className={styles.playBtn} onClick={toggleTrailer}>
      <ion-icon name="play-outline"></ion-icon>
      </a>
    <p>whatch trailer</p>

    </div>
    {movie.active&& <Trailer movie={movie} status={trailer} toggleTrailer={toggleTrailer}/> }
    </>
  );
}

export default Playbtn