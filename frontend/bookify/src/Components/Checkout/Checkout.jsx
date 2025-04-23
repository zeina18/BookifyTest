import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { match, tickets, total, trip } = location.state || {}; // Ensure trip is included

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [showCardForm, setShowCardForm] = useState(false);
  const [errors, setErrors] = useState({});

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setShowCardForm(method === 'visa');
    setErrors({});
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateCardDetails = () => {
    const newErrors = {};
    if (!cardDetails.cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!cardDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    if (!cardDetails.cvv.match(/^\d{3}$/)) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV';
    }
    if (!cardDetails.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'visa') {
      const validationErrors = validateCardDetails();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    // Navigate to success page with trip or match details
    navigate('/checkout-success', {
      state: {
        match,
        trip, 
        tickets,
        total,
        paymentMethod
      }
    });
  };

  if (!match && !trip) {
    return <div>No order details found</div>;
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutContent}>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>

          {/* Match Booking */}
          {match && (
            <div className={styles.matchInfo}>
              <h3>{match.team1} vs {match.team2}</h3>
              <div className={styles.matchDetails}>{match.tournament} - Match {match.matchNo}</div>
              <div className={styles.matchDetails}>{match.date} at {match.time}</div>
              <div className={styles.venue}>{match.stadium}, {match.city}</div>
            </div>
          )}

          {/* Trip Booking */}
          {trip && (
             <div className={styles.tripInfo}>
             <h3>{trip.name}</h3>
             <div className={styles.tripDetails}>Location: {trip.location}</div>
             <div className={styles.tripDetails}>Date: {trip.date}</div>
            <div className={styles.tripDetails}>Tickets: {tickets} x {trip.price}</div>
              </div>
           )}
           
          <div className={styles.totalSection}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span>EGP{total}</span>
            </div>
            <div className={styles.total}>
              <span>Total</span>
              <span>EGP{total}</span>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className={styles.paymentSection}>
          <h2>Payment Method</h2>
          <div className={styles.paymentMethods}>
            <div 
              className={`${styles.paymentMethod} ${paymentMethod === 'cash' ? styles.selected : ''}`}
              onClick={() => handlePaymentMethodSelect('cash')}
            >
              💵 Cash
            </div>
            <div 
              className={`${styles.paymentMethod} ${paymentMethod === 'visa' ? styles.selected : ''}`}
              onClick={() => handlePaymentMethodSelect('visa')}
            >
              💳 Visa
            </div>
          </div>

          <button 
            className={styles.payButton}
            onClick={handleSubmit}
            disabled={!paymentMethod || (paymentMethod === 'visa' && !cardDetails.cardNumber)}
          >
            {paymentMethod === 'visa' ? 'Pay Now' : 'Confirm Cash Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}
