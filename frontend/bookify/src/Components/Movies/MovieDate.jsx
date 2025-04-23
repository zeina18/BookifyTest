import React from 'react'
import styles from './Date.module.css'

function MovieDate({movie}) {
  return (
    <div className={`${styles.date} ${movie.active ? styles.dateActive : ''}`}>
                <h2>On {movie.date}</h2>
   </div>
  )
}

export default MovieDate