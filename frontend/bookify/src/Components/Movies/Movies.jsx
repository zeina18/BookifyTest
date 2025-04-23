import React, { useState, useEffect } from "react";
import styles from "./Movies.module.css";
import MovieContent from "./MovieContent";
import MovieDate from "./MovieDate";
import Playbtn from "./Playbtn";
import Swiper from "swiper";
import MovieSwiper from "./MovieSwiper.jsx";
import BookSection from "./BookSection.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { BASE_URL } from "../constants/baseUrl";


export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  


  useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await fetch(`${BASE_URL}/cinema`);
        const data = await response.json();

        setMovies(data);
            
        } catch{
            setError(true);
        }
    }
    fetchData();
    
}, [] )


if(error){
  return <Box>Something went wrong, please try again later</Box>
}

  const handleSlideChange = id=>{
    const newMovies = movies.map(movie=>{
      movie.active=false;
      if(movie._id===id){
        movie.active=true;
      }
      return movie;
    });
    setMovies(newMovies);

  };

  return <>
   
   <Navbar/>
 <div className={styles.container}>
 {/* top part */}
    <div className={styles.banner}>
      {
        movies && movies.length>0 && movies.map(movie=>( 
           <div className={styles.movie}>
          <img
          src={movie.bgImg} alt="background img" 
          className={`${styles.bgImg} ${movie.active ? styles.bgImgActive : ''}`} 
           />

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-md-12">
              <MovieContent movie={movie}/>
              </div>
              <div className="col-lg-6 col-md-12">
               <MovieDate movie={movie}/>

               <Playbtn movie={movie}/>
              </div>
            </div>
          </div>
        </div>
        ))
      }

      {
        movies && movies.length >0 &&<MovieSwiper slides={movies} slideChange={handleSlideChange}/>
      }
    </div>

     <BookSection />
    </div>
    </>
  
}
