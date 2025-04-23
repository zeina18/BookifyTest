import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import styles from "./SeatSelection.module.css";

const rows = 5;
const cols = 10;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const initialSeats = Array.from({ length: rows }, (_, rowIndex) =>
  Array.from({ length: cols }, (_, colIndex) => ({
    id: `${rowIndex + 1}${alphabet[colIndex]}`, // e.g., "1A", "1B"
    status: "available", // 'available', 'reserved', 'selected'
  }))
);

function SeatSelection() {
  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();

  const { movie, time, selectedCity ,selectedCinema, selectedDate } = location.state || {
    movie: { _id: "", title: "Unknown Movie", previewImg: "", length: "0 min" },
    time: "No Time Selected",
    selectedCity: "No City Selected",
    selectedCinema: "Unknown Cinema",
    selectedDate: "No Date Selected",
  };

  // ✅ Toggle seat selection
  const toggleSeat = (row, col) => {
    setSeats((prevSeats) =>
      prevSeats.map((seatRow, rowIndex) =>
        seatRow.map((seat, colIndex) =>
          rowIndex === row && colIndex === col
            ? { ...seat, status: seat.status === "selected" ? "available" : "selected" }
            : seat
        )
      )
    );

    const seatId = `${row + 1}${alphabet[col]}`;
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };
  // ✅ Navigate to Order Summary Page
  const handleBook = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }


    navigate("/order-summary", {
      state: {
        movie,
        time,
        selectedSeats,
        selectedCity,
        selectedCinema,
        selectedDate,
      },
    });
  };

  return (
    <div className={styles.container} style={{ backgroundColor: "rgba(3, 0, 18, 0.981)" }}>
      {/* ✅ Movie Title & Showtime */}
       {/* Back Button */}
                <button className={styles.backButton} onClick={() => navigate(-1)}>⬅</button>
      <div className={styles.header}>
        <h2>Seat Selection for {movie.title}</h2>
        <p>Showtime: {time}</p>
      </div>

      <div className={styles.screenContainer}>
        <div className={styles.screen}>SCREEN</div>
      </div>


      {/* ✅ Seat Grid with Row Numbers */}
      <div className={styles.seatGrid}>
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            <span className={styles.rowNumber}>{rowIndex + 1}</span>
            {row.map((seat, colIndex) => (
              <button
                key={seat.id}
                className={`${styles.seat} ${styles[seat.status]}`}
                onClick={() => toggleSeat(rowIndex, colIndex)}
              >
                {seat.id}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* ✅ Book Button */}
      <button className={styles.bookButton} onClick={handleBook}>
        Book
      </button>

      {/* ✅ Seat Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.available}`}></div>
          <span>Available</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.reserved}`}></div>
          <span>Reserved</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.selected}`}></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;