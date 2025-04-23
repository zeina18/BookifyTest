import React from 'react'
import styles from "./MovieContent.module.css";


export default function MovieContent({movie}) {
  return (
            <div className={`${styles.bannercontent} ${movie.active ? styles.bannercontentActive : ''}`} >
                   <img src={movie.titleImg} alt="movie title" className={styles.movieTitle} />
                   <h4>
                     <span>{movie.year}</span>
                     <span>
                       <i>{movie.ageLimit}</i>
                     </span>
                     <span>{movie.length}</span>
                     <span>{movie.category}</span>
                   </h4>
                   <p> {movie.description} </p>
                   <div className={styles.button}>
                   
                   </div>
            </div>
  )
}

