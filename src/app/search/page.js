"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import trips from "../components/data/trips";
import Link from "next/link";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaGlobe,
  FaUserFriends,
  FaTags,
  FaSearch,
  FaRegCheckSquare,
} from "react-icons/fa";
import { MdFamilyRestroom, MdGroups } from "react-icons/md";
import dynamic from "next/dynamic";

const BookNow = dynamic(() => import("../components/actions/BookNow"), {
  ssr: false,
  loading: () => <p>Loading booking form...</p>,
});


const SearchPage = () => {
  const searchParams = useSearchParams();

  // --- Read query params from URL ---
  const initialQuery = searchParams.get("q") || "";
  const initialDuration = searchParams.get("duration") || "";
  const initialTravelers = searchParams.get("travelers") || "";
  const initialPrice = searchParams.get("price") || "";

  let initialDeal = "";
  if (searchParams.get("familyPackage") === "true") initialDeal = "family";
  if (searchParams.get("bundleEligible") === "true") initialDeal = "bundle";
  if (searchParams.get("groupDiscounts") === "true") initialDeal = "group";

  // --- State ---
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [people, setPeople] = useState(1);
  const [showBooking, setShowBooking] = useState(false);

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [duration, setDuration] = useState(initialDuration);
  const [travelers, setTravelers] = useState(initialTravelers);
  const [price, setPrice] = useState(initialPrice);
  const [deal, setDeal] = useState(initialDeal);

  // floating button 
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // ref
  const topBarRef = useRef(null); // original top filters bar

  useEffect(() => {
    const onScroll = () => {
      if (!topBarRef.current) return;

      const rect = topBarRef.current.getBoundingClientRect();
      const scrolledPast = rect.bottom <= 0; // bar is fully above the viewport

      setShowFloatingButton(scrolledPast);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // book click and close booking logic

  const handleBookClick = (trip) => {
    setSelectedTrip(trip);
    setShowBooking(true);
  };

  const handleClose = () => {
    setSelectedTrip(null);
    setShowBooking(false);
  };

  // --- Filtering Logic ---
  const filteredTrips = trips.filter((trip) => {
    const matchesQuery =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      trip.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      trip.description.toLowerCase().includes(searchQuery.toLowerCase());

    const tripDays = trip.itinerary?.length || 0;
    let matchesDuration = true;
    if (duration === "1-3") matchesDuration = tripDays >= 1 && tripDays <= 3;
    if (duration === "4-7") matchesDuration = tripDays >= 4 && tripDays <= 7;
    if (duration === "8+") matchesDuration = tripDays >= 8;

    let matchesTravelers = true;
    if (travelers === "1") matchesTravelers = trip.pricing[1] !== undefined;
    if (travelers === "2") matchesTravelers = trip.pricing[2] !== undefined;
    if (travelers === "3-5")
      matchesTravelers =
        trip.pricing[3] !== undefined ||
        trip.pricing[4] !== undefined ||
        trip.pricing[5] !== undefined;
    if (travelers === "6+")
      matchesTravelers = Object.keys(trip.pricing).some((k) =>
        ["6", "family"].includes(k)
      );

    let matchesPrice = true;
    const totalPrice =
      Number(trip.pricing[1]?.total?.replace(/[^0-9]/g, "")) || 0;
    if (price === "low") matchesPrice = totalPrice < 500;
    if (price === "mid") matchesPrice = totalPrice >= 500 && totalPrice <= 1000;
    if (price === "high") matchesPrice = totalPrice > 1000;

    let matchesDeals = true;
    if (deal === "family") matchesDeals = trip.familyPackage === true;
    if (deal === "bundle") matchesDeals = trip.bundleEligible === true;
    if (deal === "group") matchesDeals = trip.groupDiscounts === true;

    return (
      matchesQuery &&
      matchesDuration &&
      matchesTravelers &&
      matchesPrice &&
      matchesDeals
    );
  });

  return (
    <div className="p-6 w-full">
      <NavBar />

      {/*  Filters + Search  */}
      <motion.div
        ref={topBarRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="m-auto mb-6 z-20 w-full p-4 bg-gradient-to-r from-white to-black/5 border border-gray-400 shadow-2xl backdrop-blur-xl rounded-md flex flex-col justify-center items-center gap-4"
      >
        <div className="flex w-full justify-center items-center gap-4 flex-wrap">
          {/* Search Input */}
          <div className="flex flex-col flex-[2]">
            <label className="mb-1 text-sm w-full font-medium text-gray-700 flex items-center gap-2">
              <FaGlobe className="text-blue-500" />
              By Keyword
            </label>
            <input
              type="text"
              placeholder="Try 'Italy', 'beach', or 'mountain'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-full px-2 border border-gray-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2  focus:ring-blue-500 text-xs"
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col flex-1">
            <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="h-8 px-2 border border-gray-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any length</option>
              <option value="1-3">1-3 Days</option>
              <option value="4-7">4-7 Days</option>
              <option value="8+">8+ Days</option>
            </select>
          </div>

          {/* Travelers */}
          <div className="flex flex-col flex-1">
            <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaUserFriends className="text-blue-500" />
              Travelers
            </label>
            <select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="h-8 px-2 border border-gray-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">1 or More</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3-5">3-5 People</option>
              <option value="6+">6+ People</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col flex-1">
            <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaDollarSign className="text-blue-500" />
              Price
            </label>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-8 px-2 border border-gray-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Price</option>
              <option value="low">Under $500</option>
              <option value="mid">$500–$1000</option>
              <option value="high">$1000+</option>
            </select>
          </div>

          {/* Deals */}
          <div className="flex flex-col flex-1">
            <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaTags className="text-blue-500" />
              Deals
            </label>
            <select
              value={deal}
              onChange={(e) => setDeal(e.target.value)}
              className="h-8 px-2 border border-gray-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">None Selected</option>
              <option value="family">Family Package</option>
              <option value="bundle">Bundle Eligible</option>
              <option value="group">Group Discount</option>
            </select>
          </div>
        </div>
      </motion.div>


      {/*  Floating circular search button */}
      {showFloatingButton && (
        <motion.button
          
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-blue-500 fixed top-2 left-2 border text-lg text-thin z-100 p-2 rounded-full bg-white hover:bg-[#ddd] duration-900 shadow-lg cursor-pointer backdrop-blur-lg"
        
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          
          aria-label="Open search"
        >
          <FaSearch size={18} />
        </motion.button>
      )}

      {/* Trip Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => {
            const pricing = trip.pricing[people] ||
              trip.pricing[1] || { perPerson: "N/A", total: "N/A" };
            const durationDays = trip.itinerary?.length || "—";

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: Number(trip.id) * 0.1 || 0,
                }}
                key={trip.id}
                className="flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="relative">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 w-full h-20 object-cover bg-gradient-to-bl from-blue-700/30 to-transparent"></div>

                  {trip.bundleEligible === true && (
                    <div className="absolute top-0 right-0 border-b-2 border-l-2 bg-blue-600 text-sm rounded-bl-md text-white px-2 py-1 gap-2 flex items-center">
                      <FaRegCheckSquare
                        title="Eligible for bundle"
                        className="text-lg"
                      />
                      Eligible For Bundling
                    </div>
                  )}

                  {trip.familyPackage === true && (
                    <div className="absolute top-0 right-0 border-b-2 border-l-2 bg-blue-600 text-sm rounded-bl-md text-white px-2 py-1 gap-2 flex items-center">
                      <MdFamilyRestroom
                        title="Family Package Available"
                        className="text-lg"
                      />
                      Family Package Included
                    </div>
                  )}

                  {trip.groupDiscounts === true && (
                    <div className="absolute top-0 right-0 border-b-2 border-l-2 bg-blue-600 text-sm rounded-bl-md text-white px-2 py-1 gap-2 flex items-center">
                      <MdGroups
                        title="Group Discount Available"
                        className="text-lg"
                      />
                      Group Discounts
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold">{trip.title}</h3>

                  {/* Clamp description so cards stay even */}
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {trip.description}
                  </p>

                  <p className="text-sm text-gray-500">
                    Duration:{" "}
                    <span className="font-semibold">{durationDays} days</span>
                  </p>

                  <div className="flex flex-wrap gap-2 my-2">
                    {trip.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Push price + button down to bottom */}
                  <div className="mt-auto">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-md text-gray-500">
                          Price per person:{" "}
                          <span className="font-semibold">
                            {pricing.perPerson}
                          </span>
                        </p>
                        <p className="text-md text-gray-700 font-bold">
                          Total: {pricing.total}
                        </p>
                      </div>
                      <div className="text-md hover:underline cursor-pointer">
                        <Link key={trip.id} href={`/trips/${trip.id}`} passHref>
                          View Offer
                        </Link>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookClick(trip)}
                      className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-md"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No trips found matching your filters.
          </p>
        )}
      </div>

      {/* Booking Card */}

      {showBooking && selectedTrip && (
        <BookNow
          trip={selectedTrip}
          people={people}
          perPerson={
            (selectedTrip.pricing[people] || selectedTrip.pricing[1]).perPerson
          }
          total={
            (selectedTrip.pricing[people] || selectedTrip.pricing[1]).total
          }
          date={
            (selectedTrip.availability[0])
          }
          onBundle={handleClose}
          onClose={handleClose}
          onBook={() => {
            alert(`You have successfully booked your ${selectedTrip.title} trip! Check your email for more details.` );
            handleClose();
          }}
        />
      )}
    </div>
  );
};

export default SearchPage;

export const SearchPageWrapper = () => {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading trips...</p>}>
      <SearchPage />
    </Suspense>
  );
};









