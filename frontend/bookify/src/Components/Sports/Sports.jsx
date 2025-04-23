import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "./Sports.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import MatchList from "./MatchList";
import TicketModal from "./TicketModal";
import TicketAssignment from "./TicketAssignment";
import { BASE_URL } from "../constants/baseUrl";
import { ArrowLeft } from "lucide-react"; // Import ArrowLeft icon

const initialTickets = [
  { name: 'VIP', price: 300, count: 0 },
  { name: 'CAT1 Left - Lower', price: 125, count: 0 },
  { name: 'CAT3 Left Upper', price: 75, count: 0 },
  { name: 'CAT3 Left Lower', price: 75, countA: 0 },
];

export default function Sports() {
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showAssignment, setShowAssignment] = useState(false);
  const [tickets, setTickets] = useState([...initialTickets]);
  const [assignedTickets, setAssignedTickets] = useState([]);
  
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/sport`);
        const data = await response.json();
        setMatches(data);
        setFilteredMatches(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, []);

  const calculateTotal = () => {
    return tickets.reduce((sum, ticket) => sum + ticket.price * ticket.count, 0);
  };

  const handleTicketChange = (index, value) => {
    const newTickets = [...tickets];
    newTickets[index].count = Math.max(0, Math.min(4, value));
    setTickets(newTickets);
  };

  const handleBookClick = (match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
    setShowAssignment(false);
    setTickets(initialTickets.map(ticket => ({ ...ticket })));
    setSelectedTeam(null);
  };

  const handleProceed = () => {
    if (selectedTeam && calculateTotal() > 0) {
      const newAssignedTickets = tickets.flatMap(ticket => 
        Array.from({ length: ticket.count }, (_, i) => ({
          type: ticket.name,
          price: ticket.price,
          assignedTo: "",
          id: `${ticket.name}-${i}-${Date.now()}`
        }))
      );
      
      setAssignedTickets(newAssignedTickets);
      setIsModalOpen(false);
      setShowAssignment(true);
    }
  };

  const handleAssignChange = (id, value) => {
    setAssignedTickets(assignedTickets.map(ticket => 
      ticket.id === id ? { ...ticket, assignedTo: value } : ticket
    ));
  };

  const handleDeleteTicket = (id) => {
    setAssignedTickets(assignedTickets.filter(ticket => ticket.id !== id));
  };

  const resetSelection = () => {
    setIsModalOpen(false);
    setShowAssignment(false);
    setSelectedMatch(null);
    setSelectedTeam(null);
    setTickets(initialTickets.map(ticket => ({ ...ticket })));
    setAssignedTickets([]);
  };

  const handleCheckout = () => {
    navigate('/checkout', { 
      state: { 
        match: selectedMatch,
        tickets: assignedTickets,
        total: calculateTotal()
      }
    });
  };

  const handleBackClick = () => {
    navigate('/mainpage'); 
  };

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
          <button 
            className={styles.backButton}
            onClick={handleBackClick}
            aria-label="Back to Home"
          >
            <ArrowLeft className={styles.backIcon} />
          </button>

        {!showAssignment ? (
          <MatchList 
            matches={matches} 
            onBookClick={handleBookClick} 
          />
        ) : (
          <TicketAssignment
            match={selectedMatch}
            assignedTickets={assignedTickets}
            onAssignChange={handleAssignChange}
            onDeleteTicket={handleDeleteTicket}
            onAddMore={() => {
              setIsModalOpen(true);
              setShowAssignment(false);
            }}
            onCancel={resetSelection}
            onCheckout={handleCheckout}
            total={calculateTotal()}
          />
        )}

        <AnimatePresence>
          {isModalOpen && selectedMatch && (
            <TicketModal
              match={selectedMatch}
              selectedTeam={selectedTeam}
              onTeamSelect={setSelectedTeam}
              tickets={tickets}
              onTicketChange={handleTicketChange}
              total={calculateTotal()}
              onClose={() => setIsModalOpen(false)}
              onProceed={handleProceed}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}