import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./OrderSummary.module.css"; // Create a CSS module for styling
import { useCart } from "../context/CinemaCart/CCContext";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    movie,
    time,
    selectedSeats,
    selectedCity,
    selectedCinema,
    selectedDate,
  } = location.state || {
    movie: {
      title: "Unknown Movie",
      previewImg: "",
      length: "0 min",
    },
    time: "No Time Selected",
    selectedSeats: [],
    selectedCity: "No City Selected",
    selectedCinema: "Unknown Cinema",
    selectedDate: "No Date Selected",
  };

  const ticketPrice = 150;
  const totalPrice = selectedSeats.length * ticketPrice;
  const orderId = Math.floor(Math.random() * 1000000);

  const { addItemToCart } = useCart();

  return (
    <div className={styles.container}>
      <div className={styles.orderSummary}>
        {/* Back Button */}
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ⬅
        </button>

        {/* Movie Poster */}
        <img
          src={movie.previewImg}
          alt={movie.title}
          className={styles.movieImage}
        />

        {/* Movie Title */}
        <h2 className={styles.movieTitle}>{movie.title}</h2>

        {/* Movie Details */}
        <p className={styles.details}>
          <strong>Duration:</strong> {movie.length}
        </p>
        <p className={styles.details}>
          <strong>City:</strong> {selectedCity}
        </p>
        <p className={styles.details}>
          <strong>Cinema:</strong> {selectedCinema}
        </p>
        <p className={styles.details}>
          <strong>Date:</strong> {selectedDate}
        </p>
        <p className={styles.details}>
          <strong>Showtime:</strong> {time}
        </p>

        {/* Order ID */}
        <p className={styles.orderId}>
          <strong>ORDER ID:</strong> {orderId}
        </p>
        <p className={styles.seats}>
          <strong>Seats:</strong> {selectedSeats.join(", ")}
        </p>

        <p className={styles.price}>
          <strong>Price:</strong> 150 EGP × {selectedSeats.length} ={" "}
          {totalPrice} EGP
        </p>

        {/* Buy Button */}
        <button
          className={styles.buyButton}
          onClick={() =>
            addItemToCart(
              movie._id,
              selectedSeats.length,
              selectedCity,
              selectedCinema,
              selectedDate,
              time,
              selectedSeats.join(", ")
            )
          }
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
