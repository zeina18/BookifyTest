import React from "react";
import { Plus, X, Building2, Calendar, AlertCircle } from "lucide-react";
import styles from "./TicketAssignment.module.css";

export default function TicketAssignment({
  match,
  assignedTickets,
  onAssignChange,
  onDeleteTicket,
  onAddMore,
  onCancel,
  onCheckout,
  total
}) {
  return (
    <div className={styles.assignmentContainer}>
      <div className={styles.assignmentHeader}>
        <h1>Ticket Assignment</h1>
        <button 
          className={styles.addMoreButton}
          onClick={onAddMore}
        >
          <Plus size={20} />
          Add More Tickets
        </button>
      </div>

      <div className={styles.assignmentContent}>
        <div className={styles.ticketList}>
          {assignedTickets.length > 0 ? (
            assignedTickets.map((ticket) => (
              <div key={ticket.id} className={styles.ticketAssignmentRow}>
                <div className={styles.ticketType}>
                  <div className={styles.ticketTypeIndicator} style={{ backgroundColor: '#FFB74D' }} />
                  <span>{ticket.type}</span>
                  <span className={styles.ticketPrice}>EGP{ticket.price.toFixed(2)}</span>
                </div>
                <div className={styles.assignmentInput}>
                  <input
                    type="text"
                    placeholder="Assign Ticket to Fan"
                    value={ticket.assignedTo}
                    onChange={(e) => onAssignChange(ticket.id, e.target.value)}
                  />
                  <button 
                    className={styles.deleteButton}
                    onClick={() => onDeleteTicket(ticket.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noTickets}>No tickets to assign</div>
          )}
        </div>

        <div className={styles.matchDetailsPanel}>
          <h2>Match Details</h2>
          <div className={styles.teamFlags}>
            <img
              src={`/imgs/${match.team1.replace(/\s/g, "-").toLowerCase()}.png`}
              alt={match.team1}
              className={styles.teamFlag}
            />
            <img
              src={`/imgs/${match.team2.replace(/\s/g, "-").toLowerCase()}.png`}
              alt={match.team2}
              className={styles.teamFlag}
            />
          </div>
          <div className={styles.venueInfo}>
            <div className={styles.venueDetail}>
              <Building2 size={20} />
              <span>{match.stadium}, {match.city}</span>
            </div>
            <div className={styles.venueDetail}>
              <Calendar size={20} />
              <span>{match.date}, {match.time}</span>
            </div>
          </div>
          <div className={styles.reminder}>
            <AlertCircle size={20} />
            <p>A tournament subscription fee will be added to each fan booking for the first time</p>
          </div>
        </div>
      </div>

      <div className={styles.assignmentFooter}>
        <div className={styles.totalAmount}>
          <span>Total:</span>
          <span>EGP{total.toFixed(2)}</span>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button 
            className={styles.checkoutButton}
            onClick={onCheckout}
            disabled={assignedTickets.length === 0 || assignedTickets.some(t => !t.assignedTo)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}