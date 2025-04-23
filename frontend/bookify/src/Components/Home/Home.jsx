import { useState } from "react";
import {
  Ticket,
  Radius as Stadium,
  Popcorn,
  ArrowRight,
  Search,
  Calendar,
  Plane,
} from "lucide-react";
import Navbar from "../Navbar/Navbar";
import style from "./Home.module.css";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate(); // Add navigation hook

  const handleCardClick = (category) => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
    } else {
      console.log(`${category} card clicked`);
    }
  };

  const handleLoginClick = () => {
    setShowLoginMessage(false);
    navigate("/login"); // Navigate to login page
  };

  const handleCancelClick = () => {
    setShowLoginMessage(false); // Just close the message
  };

  return (
    <>
      <div className={showLoginMessage ? style.faded : ""}>
        <Navbar />
        <div className="bg-gradient-to-br from-gray-0 to-white-40 text-gray-900">
          {/* Hero Section */}
          <main className="relative p-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold text-center m-3 bg-gradient-to-r from-gray-900 to-[#6D83F2] bg-clip-text text-transparent">
                What's Your Next Adventure?
              </h2>
              <p className="text-xl text-center text-gray-600 mb-5">
                Discover and book exclusive events and matches that create lasting
                memories
              </p>

              {/* Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {/* Sports Card */}
                <div
                  className={`${style["card-hover"]} ${style.Sports} relative overflow-hidden rounded-2xl p-8 cursor-pointer`}
                  onClick={() => handleCardClick("Sports")}
                >
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-green-100 rounded-full blur-2xl" />
                  <div className="flex justify-center">
                    <Stadium className="w-16 h-16 mb-4 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Sports</h3>
                  <p className="text-gray-600 mb-4">
                    Get tickets for the biggest matches and tournaments
                  </p>
                </div>

                {/* Movies */}
                <div
                  className={`${style["card-hover"]} ${style.Movies} relative overflow-hidden rounded-2xl bg-white p-8 cursor-pointer`}
                  onClick={() => handleCardClick("Entertainment")}
                >
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-amber-100 rounded-full blur-2xl" />
                  <div className="flex justify-center">
                    <Popcorn className="w-16 h-16 mb-4 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Entertainment</h3>
                  <p className="text-gray-600 mb-4">
                    Experience unforgettable shows and concerts
                  </p>
                </div>

                {/* Events Card */}
                <div
                  className={`${style["card-hover"]} ${style.Events} relative overflow-hidden rounded-2xl bg-white p-8 cursor-pointer`}
                  onClick={() => handleCardClick("Events")}
                >
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-red-100 rounded-full blur-2xl" />
                  <div className="flex justify-center">
                    <Calendar className="w-16 h-16 mb-4 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Events</h3>
                  <p className="text-gray-600 mb-4">
                    Join exclusive gatherings and special occasions
                  </p>
                </div>

                {/* Trips Card */}
                <div
                  className={`${style["card-hover"]} ${style.Trips} relative overflow-hidden rounded-2xl bg-white p-8 cursor-pointer`}
                  onClick={() => handleCardClick("Trips")}
                >
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-blue-100 rounded-full blur-2xl" />
                  <div className="flex justify-center">
                    <Plane className="w-16 h-16 mb-4 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Trips</h3>
                  <p className="text-gray-600 mb-4">
                    Explore urban experience with guided tours
                  </p>
                </div>
              </div>
            </div>
          </main>
          {/* Background Image */}
          <div
            className="fixed inset-0 -z-10 opacity-20"
            style={{
              backgroundImage:
                "url(Bookify/Bookify/frontend/bookify/Imgs/504616.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Footer */}
          <footer className="bottom-0 w-full py-4 px-6 text-center text-gray-600">
            <p>© 2024 Bookify. All rights reserved.</p>
          </footer>
        </div>
      </div>

      {/* Login Warning Overlay */}
      {showLoginMessage && (
        <div className={style.overlay}>
          <div className={style.loginMessage}>
            <p className={style.messageText}>Please log in to book your adventure!</p>
            <div className={style.buttonContainer}>
              <button 
                className={style.loginButton}
                onClick={handleLoginClick}
              >
                Login Now
              </button>
              <button 
                className={style.cancelButton}
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;