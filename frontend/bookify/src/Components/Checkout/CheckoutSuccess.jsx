import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './CheckoutSuccess.module.css';

export default function CheckoutSuccess() {
  const location = useLocation();
  const { match, trip, tickets, total, paymentMethod } = location.state || {};

  if (!match && !trip) {
    return <div>No order details found</div>;
  }

  const handleDownloadTickets = () => {
    console.log('Downloading tickets...');
  };

  return (
    <div className={styles.successContainer}>
      <div className={styles.successContent}>
        <div className={styles.successHeader}>
          <div className={styles.checkmark}>✓</div>
          <h1>Payment Successful!</h1>
          <div className={styles.orderNumber}>Order #: {Date.now()}</div>
        </div>

        <div className={styles.orderDetails}>

          {/* Match Booking */}
          {match && (
            <div className={styles.matchInfo}>
              <h2>{match.team1} vs {match.team2}</h2>
              <div className={styles.matchDetails}>{match.tournament} - Match {match.matchNo}</div>
              <div className={styles.matchDetails}>{match.date} at {match.time}</div>
              <div className={styles.venue}>{match.stadium}, {match.city}</div>
            </div>
          )}

          {/* Trip Booking */}

    {trip && (
     <div className={styles.tripInfo}>
      <h2>{trip.name}</h2>
      <div className={styles.tripDetails}>Location: {trip.location}</div>
      <div className={styles.tripDetails}>Date: {trip.date}</div>
      <div className={styles.tripDetails}>Tickets: {tickets}</div>
      <div className={styles.tripDetails}>Total Paid: ${total}</div>
       </div>
    )}

          <div className={styles.nextSteps}>
            <h3>Next Steps</h3>
            <ul>
              {paymentMethod === 'visa' ? (
                <>
                  <li>Download your e-tickets</li>
                  <li>Show them at the entrance</li>
                </>
              ) : (
                <>
                  <li>Visit our ticket office</li>
                  <li>Make the cash payment</li>
                  <li>Collect your tickets</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.actions}>
          {paymentMethod === 'visa' && (
            <button className={styles.downloadButton} onClick={handleDownloadTickets}>
              Download Tickets
            </button>
          )}
          <Link to="/" className={styles.homeButton}>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
