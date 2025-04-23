import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import "./BookingModal.css";

const BookingModal = ({ trip, onClose }) => { 
  const navigate = useNavigate();  
  const [selectedDay, setSelectedDay] = useState("");
  const [tickets, setTickets] = useState(1);

  const handleConfirmBooking = () => {
    if (!selectedDay) {
      alert("Please select a day!");
      return;
    }
    if (tickets <= 0) {
      alert("Please select at least 1 ticket.");
      return;
    }

    // Calculate total price
    const price = parseFloat(trip.price.replace('$', ''));
    const total = price * tickets;

    navigate("/checkout", { 
      state: { 
        trip: {
          name: trip.title,
          location: trip.description,
          date: selectedDay,
          price: trip.price
        },
        tickets,
        total
      } 
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Book Your Trip: {trip.title}</h2>
        <form>
          <label>Select Day:</label>
          <select 
            value={selectedDay} 
            onChange={(e) => setSelectedDay(e.target.value)}
            required
          >
            <option value="" disabled>Select a day</option>
            {trip.availableDays.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>

          <label>Number of Tickets:</label>
          <input 
            type="number" 
            min="1" 
            max="10" 
            value={tickets} 
            onChange={(e) => setTickets(parseInt(e.target.value))}
            required
          />

          <button 
            type="button" 
            className="confirm-button" 
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button>
          <button 
            type="button" 
            className="close-button" 
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;