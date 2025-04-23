import React from 'react'
import styles from "./Trailer.module.css";

function Trailer({movie, status ,toggleTrailer}) {
  return (
   <div className={`${styles.movieTrailer} ${status ? styles.TrailerActive : ''}`}>
    <a href="#" className={styles.trailerClose} onClick={toggleTrailer}>
    <ion-icon name="close-circle-outline"></ion-icon>
    </a>
  <iframe 
  width="1000" 
  height="500" 
  src={movie.video}
  title={`${movie.title} | Official Trailer`}
  frameBorder="0" 
  allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
  ></iframe>

   </div>
    
  );
}

export default Trailer