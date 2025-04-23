import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./MatchList.module.css";

export default function MatchList({ matches, onBookClick }) {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedStadium, setSelectedStadium] = useState("");
  const [selectedTournament, setSelectedTournament] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [filteredMatches, setFilteredMatches] = useState(matches);

  const teams = [...new Set(matches.flatMap(match => [match.team1, match.team2]))];
  const stadiums = [...new Set(matches.map(match => match.stadium))];
  const tournaments = [...new Set(matches.map(match => match.tournament))];
  const stages = [...new Set(matches.map(match => match.stage || "Final Stage"))];

  useEffect(() => {
    let result = [...matches];

    if (selectedTeam) {
      result = result.filter(
        (match) => match.team1 === selectedTeam || match.team2 === selectedTeam
      );
    }

    if (selectedStadium) {
      result = result.filter((match) => match.stadium === selectedStadium);
    }

    if (selectedTournament) {
      result = result.filter((match) => match.tournament === selectedTournament);
    }

    if (selectedStage) {
      result = result.filter((match) => (match.stage || "Final Stage") === selectedStage);
    }

    setFilteredMatches(result);
  }, [selectedTeam, selectedStadium, selectedTournament, selectedStage, matches]);

  // دالة إعادة التعيين
  const handleReset = () => {
    setSelectedTeam("");
    setSelectedStadium("");
    setSelectedTournament("");
    setSelectedStage("");
    // setFilteredMatches(matches); // اختياري، لأن useEffect سيتولى ذلك تلقائيًا
  };

  return (
    <>
      <motion.h1
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Matches
      </motion.h1>

      <motion.div
        className={styles.filters}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <select
          className={styles.filterDropdown}
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="">All Teams</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>

        <select
          className={styles.filterDropdown}
          value={selectedStadium}
          onChange={(e) => setSelectedStadium(e.target.value)}
        >
          <option value="">All Stadiums</option>
          {stadiums.map((stadium) => (
            <option key={stadium} value={stadium}>
              {stadium}
            </option>
          ))}
        </select>

        <select
          className={styles.filterDropdown}
          value={selectedTournament}
          onChange={(e) => setSelectedTournament(e.target.value)}
        >
          <option value="">All Tournaments</option>
          {tournaments.map((tournament) => (
            <option key={tournament} value={tournament}>
              {tournament}
            </option>
          ))}
        </select>

        <select
          className={styles.filterDropdown}
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
        >
          <option value="">All Stages</option>
          {stages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>

        <button className={styles.searchButton} onClick={handleReset}>
          Reset
        </button>
      </motion.div>

      <div className={styles.matchesContainer}>
        {filteredMatches.map((match, index) => (
          <motion.div
            key={match.id}
            className={styles.matchCard}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {match.status === "closed" && (
              <motion.div className={styles.headerClosed}>
                Booking Closed
              </motion.div>
            )}
            <div className={styles.teamLogos}>
              <motion.div className={styles.team} whileHover={{ scale: 1.1 }}>
                <img
                    src={`/imgs/${match?.team1?.replace(/\s/g, "-").toLowerCase() || 'default'}.png`}
                  alt={match.team1}
                  className={styles.teamLogo}
                />
                <span>{match.team1}</span>
              </motion.div>
              <div className={styles.vs}>vs</div>
              <motion.div className={styles.team} whileHover={{ scale: 1.1 }}>
                <img
                  src={`/imgs/${match?.team2 ?.replace(/\s/g, "-").toLowerCase() || 'default'}.png`}      
            alt={match.team2}
                  className={styles.teamLogo}
                />
                <span>{match.team2}</span>
              </motion.div>
            </div>
            <div className={styles.matchDetails}>
              <p>
                <strong>Stadium:</strong> {match.stadium}, {match.city}
              </p>
              <p>
                <strong>Date:</strong> {match.date}
              </p>
              <p>
                <strong>Time:</strong> {match.time}
              </p>
            </div>
            <div className={styles.tournamentDetails}>
              <p>
                <strong>Tournament:</strong> {match.tournament}
              </p>
              <p>
                <strong>Stage:</strong> {match.stage}
              </p>
              <p
                className={`${styles.availability} ${
                  match.status === "closed" ? styles.soldOut : ""
                }`}
              >
                {match.status === "available" ? "Available" : "Sold Out"}
              </p>
            </div>
            <motion.button
              className={
                match.status === "available"
                  ? styles.bookButton
                  : styles.closedButton
              }
              disabled={match.status !== "available"}
              whileHover={match.status === "available" ? { scale: 1.05 } : {}}
              whileTap={match.status === "available" ? { scale: 0.95 } : {}}
              onClick={() => onBookClick(match)}
            >
              {match.status === "available" ? "Book Ticket" : "Booking Closed"}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </>
  );
}