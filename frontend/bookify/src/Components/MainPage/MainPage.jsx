import { useState } from "react";
import { Link } from "react-router-dom";
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
import style from "./MainPage.module.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-gray-0 to-white-40 text-gray-900">
        {/* Hero Section */}
        <main className="relative pt-5 pb-5 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl pb-5 md:text-7xl font-bold text-center m-3 bg-gradient-to-r from-gray-900 to-[#6D83F2] bg-clip-text text-transparent">
              Explore Now
            </h2>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {/* Sports Card */}
              <div
                className={`${style["card-hover"]} ${style.Sports} relative overflow-hidden rounded-2xl bg-white p-8 flex flex-col items-center justify-center`}
              >
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-green-100 rounded-full blur-2xl" />
                <Stadium className="w-16 h-16 mb-4 text-green-500" />
                <h3 className="text-2xl font-bold mb-2 text-center">Sports</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Get tickets for the biggest matches and tournaments
                </p>
                <Link
                  className={`${style.btn} ${style.sportsBtn} flex items-center gap-2 text-green-500`}
                  to="/sports"
                >
                  Book Now <ArrowRight className={style.arrow} />
                </Link>
              </div>

              {/* Movies Card */}
              <div
                className={`${style["card-hover"]} ${style.Movies} relative overflow-hidden rounded-2xl bg-white p-8 flex flex-col items-center justify-center`}
              >
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-amber-100 rounded-full blur-2xl" />
                <Popcorn className="w-16 h-16 mb-4 text-amber-500" />
                <h3 className="text-2xl font-bold mb-2 text-center">Movies</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Experience unforgettable shows and concerts
                </p>
                <Link
                  className={`${style.btn} ${style.moviesBtn} flex items-center gap-2 text-amber-500`}
                  to="/Movies"
                >
                  Explore Events <ArrowRight className={style.arrow} />
                </Link>
              </div>

              {/* Events Card */}
              <div
                className={`${style["card-hover"]} ${style.Events} relative overflow-hidden rounded-2xl bg-white p-8 flex flex-col items-center justify-center`}
              >
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-red-100 rounded-full blur-2xl" />
                <Calendar className="w-16 h-16 mb-4 text-red-500" />
                <h3 className="text-2xl font-bold mb-2 text-center">Events</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Join exclusive gatherings and special occasions
                </p>
                <Link
                  className={`${style.btn} ${style.eventsBtn} flex items-center gap-2 text-red-500`}
                  to="/events"
                >
                  View Calendar <ArrowRight className={style.arrow} />
                </Link>
              </div>

              {/* Trips Card */}
              <div
                className={`${style["card-hover"]} ${style.Trips} relative overflow-hidden rounded-2xl bg-white p-8 flex flex-col items-center justify-center`}
              >
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-blue-100 rounded-full blur-2xl" />
                <Plane className="w-16 h-16 mb-4 text-blue-500" />
                <h3 className="text-2xl font-bold mb-2 text-center">Trips</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Explore urban experience with guided tours
                </p>
                <Link
                  className={`${style.btn} ${style.tripsBtn} flex items-center gap-2 text-blue-500`}
                  to="/trips"
                >
                  Start Journey <ArrowRight className={style.arrow} />
                </Link>
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
    </>
  );
}
export default Home;