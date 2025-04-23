import React, { useState } from "react";
import "./Trips.css";
import BookingModal from "./BookingModal";

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
const trips = [
  {
    id: 1,
    title: "Al Ahrmat",
    image: "/ahrmat.jpg",
    price: "$30",
    description: "Explore the Great Pyramids of Giza.",
    program: "Visit the pyramids, take photos, and enjoy camel rides.",
    availableDays: ["Monday ", "Thursday ", "Saturday "],
  },
  {
    id: 2,
    title: "Al Qalaa",
    image: "/alqal3a.jpg",
    price: "$25",
    description: "Discover the beauty of Cairo Citadel.",
    program: "Guided tour of the citadel and museums.",
    availableDays: ["Sunday ", "Wednesday ", "Friday "],
  },
  {
    id: 3,
    title: "Cairo Tower",
    image: "/towerofcairo.jpg",
    price: "$20",
    description: "Get a breathtaking view of Cairo from above.",
    program: "Ride to the top, enjoy the city view.",
    availableDays: ["Tuesday ", "Thursday ", "Saturday "],
  },
  {
    id: 4,
    title: "Grand Egyptian Museum",
    image: "/egyptianmuseum.jpg",
    price: "$40",
    description: "Witness the largest collection of ancient Egyptian artifacts.",
    program: "Explore exhibitions and see Tutankhamun’s treasures.",
    availableDays: ["Monday ", "Wednesday ", "Friday "],
  },
  {
    id: 5,
    title: "Al Azhar Park",
    image: "/alazharpark.jpg",
    price: "$15",
    description: "Relax in one of the most beautiful parks in Cairo.",
    program: "Walk through gardens and admire Islamic architecture.",
    availableDays: ["Saturday ", "Sunday ", "Tuesday "],
  },
  {
    id: 6,
    title: "Mosque of Muhammed Ali",
    image: "/mosquemuhammedali.jpg",
    price: "$20",
    description: "Admire the Ottoman-style mosque inside the Citadel.",
    program: "Explore the mosque and take scenic photos.",
    availableDays: ["Monday ", "Thursday ", "Friday "],
  },
  {
    id: 7,
    title: "Sharm El Sheikh",
    image: "/sharmelsheikh.jpg",
    price: "$100",
    description: "A Red Sea paradise for relaxation and adventure.",
    program: "Enjoy snorkeling, diving, and safari tours.",
    availableDays: ["Wednesday ", "Saturday "],
  },
  {
    id: 8,
    title: "Ain El Sokhna",
    image: "/ainsokhna.jpg",
    price: "$50",
    description: "A peaceful Red Sea getaway near Cairo.",
    program: "Relax on the beach and enjoy fresh seafood.",
    availableDays: ["Sunday ", "Tuesday ", "Friday "],
  },
];

const Trips = () => {
  const [selectedTrip, setSelectedTrip] = useState(null); 

  const openModal = (trip) => {
    setSelectedTrip(trip);   //ama nft7 el modal byt3rd haget el trip el 3mlnalha select
  };

  const closeModal = () => {
    setSelectedTrip(null);   //lama n2fel el modal trg3 null
  };


  return (
  <>
  <Navbar/>
    <div className="trips-container">
      <h1 className="gradient-text"  data-text="GET YOUR TRIP TICKET" ></h1>
      <p className="sub-heading">You can view each place in a 360-degree view.</p>
      <div className="trips-list">
        {trips.map((trip) => ( //bt-create div le kol trip gowaha el data ely htet3red fel card
          <div className="trip-card" key={trip.id}>
            <img src={trip.image} alt={trip.title} className="trip-image" />
            <h2 className="trip-title">{trip.title}</h2>
            <p className="trip-price">{trip.price}</p>
            <p className="trip-description">{trip.description}</p>
            <p className="trip-program"><strong>Program:</strong> {trip.program}</p>
            <button className="book-button" onClick={() => openModal(trip)}>Book Now</button>
            <button className="vr-button">View VR Tour</button>
          </div>
        ))}
      </div>
      {selectedTrip && <BookingModal trip={selectedTrip} onClose={closeModal} />} {/*  law ekhtarna trip y3red el modal */}
    </div>
    <Footer/>
    </>
  );
};

export default Trips;
