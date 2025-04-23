import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import styles from "./TicketModal.module.css";

export default function TicketModal({
  match,
  selectedTeam,
  onTeamSelect,
  tickets,
  onTicketChange,
  total,
  onClose,
  onProceed
}) {
  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className={styles.modalHeader}>
          <ShoppingBag className={styles.modalIcon} />
          <h2>Add Tickets to Cart</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <div className={styles.teamSelection}>
          <p>Click the logo to choose your team</p>
          <div className={styles.teamLogos}>
            <div
              className={`${styles.teamLogo} ${
                selectedTeam === 'team1' ? styles.selected : ''
              }`}
              onClick={() => onTeamSelect('team1')}
            >
              <img
                src={`/imgs/${match.team1.replace(/\s/g, "-").toLowerCase()}.png`}
                alt={match.team1}
              />
              <span>{match.team1}</span>
            </div>
            <div className={styles.stadiumIconWrapper}>
              <div className={styles.matchInfo}>
                <p>{match.stadium}</p>
                <p>City: {match.city}</p>
                <p>{match.date}</p>
                <p>Time: {match.time}</p>
              </div>
            </div>
            <div
              className={`${styles.teamLogo} ${
                selectedTeam === 'team2' ? styles.selected : ''
              }`}
              onClick={() => onTeamSelect('team2')}
            >
              <img
                src={`/imgs/${match.team2.replace(/\s/g, "-").toLowerCase()}.png`}
                alt={match.team2}
              />
              <span>{match.team2}</span>
            </div>
          </div>
        </div>

        <div className={styles.ticketCategories}>
          <p>Specify the number of tickets</p>
          <p className={styles.ticketLimit}>
            You can book up to only 4 tickets per match.
          </p>
          {tickets.map((ticket, index) => (
            <div key={ticket.name} className={styles.ticketRow}>
              <span className={styles.ticketName}>{ticket.name}</span>
              <span className={styles.ticketPrice}>
                EGP{ticket.price.toFixed(2)}
              </span>
              <input
                type="number"
                min="0"
                max="4"
                value={ticket.count}
                onChange={(e) =>
                  onTicketChange(index, parseInt(e.target.value) || 0)
                }
                className={styles.ticketInput}
              />
            </div>
          ))}
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>EGP{total.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={styles.proceedButton}
            disabled={!selectedTeam || total === 0}
            onClick={onProceed}
          >
            Proceed
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}