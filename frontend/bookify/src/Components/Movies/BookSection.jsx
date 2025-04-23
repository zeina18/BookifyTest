import React,{useState,useEffect} from 'react'
import styles from "./Booksection.module.css";
import { a } from 'framer-motion/client';
import { useNavigate } from "react-router-dom"; // Import navigation
import { BASE_URL } from "../constants/baseUrl";


function BookSection() {
    const [movies, setMovies] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCinema, setSelectedCinema] = useState("");
    const [cinemas, setCinemas] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const navigate = useNavigate(); // Add this inside your component

    useEffect(() => {
        fetch(`${BASE_URL}/cinema`) // Make sure movies.json is in public folder
          .then((response) => response.json())
          .then((data) => {
            setMovies(data);
            const uniqueCities = [
              ...new Set(data.flatMap((movie) => movie.locations.map((loc) => loc.city))),
            ];
            setCities(uniqueCities);
          })
          .catch((error) => console.error("Error fetching movies:", error));
      }, []);
    
      // Update cinemas when a city is selected
      useEffect(() => {
        if (selectedCity) {
          const availableCinemas = movies
            .flatMap((movie) =>
              movie.locations.filter((loc) => loc.city === selectedCity).flatMap((loc) => loc.cinemas)
            )
            .map((cinema) => cinema.name);
          setCinemas([...new Set(availableCinemas)]);
        }
      }, [selectedCity, movies]);
    
      // Update movies when a cinema is selected
      useEffect(() => {
        if (selectedCinema) {
          const filtered = movies.filter((movie) =>
            movie.locations.some((loc) =>
              loc.cinemas.some((cinema) => cinema.name === selectedCinema)
            )
          );
          setFilteredMovies(filtered);
        } else {
          setFilteredMovies([]);
        }
      }, [selectedCinema, movies]);

  return (
 
     <div className={styles.container}>
    <h2 className={styles.title}>Book your ticket</h2>

    


     <div className={styles.filters}>
  <div className={styles.selectContainer}>
    <label className={styles.labelcity}>Choose City:</label>
    <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
      <option value="">Select City</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>

  {selectedCity && (
    <div className={styles.selectContainer}>
      <label className={styles.labelcity}>Choose Cinema:</label>
      <select onChange={(e) => setSelectedCinema(e.target.value)} value={selectedCinema}>
        <option value="">Select Cinema</option>
        {cinemas.map((cinema) => (
          <option key={cinema} value={cinema}>
            {cinema}
          </option>
        ))}
      </select>
    </div>
  )}
</div>

      {selectedCinema && (
        <div className={styles.movieList}>
          <h2>Movies Available at {selectedCinema}</h2>
          {filteredMovies.map((movie) => (
  <div key={movie._id} className={styles.movieCard}>
       <h3 className={styles.movieTitle}>{movie.title}</h3>
    <div className={styles.movieDetailsContainer}>
      {/* Movie Poster */}
      <img className={styles.moviePoster} src={movie.previewImg} alt={movie.title} />

      {/* Movie Details */}
      <div className={styles.movieInfo}>
        <p><strong>Length:</strong> {movie.length}</p>
        <p><strong>Category:</strong> {movie.category}</p>
        <p><strong>Age Limit:</strong> {movie.ageLimit}+</p>
        <p className={styles.movieDescription}>{movie.description}</p>
      </div>
    </div>



             {/* Showtimes */}
  
    <div className={styles.showtimes}>  
        <strong>Showtimes:</strong>
      {movie.locations
        .flatMap((loc) => loc.cinemas)
        .find((cinema) => cinema.name === selectedCinema)
        ?.showtimes &&
        Object.entries(
          movie.locations
            .flatMap((loc) => loc.cinemas)
            .find((cinema) => cinema.name === selectedCinema).showtimes
        ).map(([date, times]) => (
          <div key={date}>
            {date}:{" "}
            {times.map((time) => (
            
            

            <button
            key={time}
            onClick={() =>
              navigate("/seats", {
                state: { movie,time,selectedCinema,selectedCity,
                  movieTitle: movie.title, // ✅ Pass only the title
                  selectedTime: time,
                  selectedDate:date,// ✅ Pass the selected showtime
                },
              })
            }
          >
            {time}
          </button>

                      ))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
   </div>
  );
}

export default BookSection