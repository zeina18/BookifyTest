import React from "react";
import styles from "./events.module.css";
import video from "../../assets/backvideo.mp4";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img5 from "../../assets/img5.webp";
import img6 from "../../assets/img6.png";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Data = [
  {
    id: 1,
    imgSrc: img1,
    destTitle: "Tamer Ashour Concert",
    location: "Zed Park",
    fees: "Price: 1500 EG",
  },
  {
    id: 2,
    imgSrc: img2,
    destTitle: "Pyramids Sound & Light",
    location: "Giza Pyramids",
    fees: "Price: 900 EG",
  },
  {
    id: 3,
    imgSrc: img3,
    destTitle: "Cairo Opera House",
    location: "Cairo",
    fees: "Price: 300 EG",
  },
  {
    id: 4,
    imgSrc: img5,
    destTitle: "Grand Egyptian Museum",
    location: "Cairo",
    fees: "Price: 300 EG",
  },
  {
    id: 5,
    imgSrc: img6,
    destTitle: "Disney on Ice",
    location: "Cairo",
    fees: "Price: 300 EG",
  },
];

const Events = () => {
  return (
    <>
    <Navbar/>
      <section className={styles.home}>
        <div className={`${styles.homeContent} ${styles.container}`}>

          <div className={` ${styles.grid}`}>
          <h1 className={styles.homeTitle}>Book Your Next Event</h1>
            <div className={styles.destiantionInput}>
              <label htmlFor="city" className={styles.label}>Select city:</label>
              <div className={`${styles.input} ${styles.flex}`}>
                <input type="text" placeholder="city Name" className={styles.inputField} />
              </div>
            </div>
            <div className={styles.destiantionInput}>
              <label htmlFor="date" className={styles.label}>Select your Date:</label>
              <div className={`${styles.input} ${styles.flex}`}>
                <input type="date" className={styles.inputField} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.main} ${styles.container} ${styles.section}`}>
        <div className={styles.secTitle}>
          <h2 className={styles.title}>Trending Now</h2>
        </div>

        <div className={`${styles.secContent} ${styles.grid}`}>
          {Data.map(({ id, imgSrc, destTitle, location, fees }) => (
            <div key={id} className={styles.singleDestination}>
              <div className={styles.imageDiv}>
                <img src={imgSrc} alt={destTitle} className={styles.destinationImage} />
              </div>
              <div className={styles.destinationDetails}>
                <h2 className={styles.destinationTitle}>{destTitle}</h2>
                {location && <p className={styles.location}>{location}</p>}
                <strong className={styles.price}>{fees}</strong>
                <button className={`${styles.btn} ${styles.flex}`}>DETAILS</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Events;