"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdFamilyRestroom, MdGroups } from "react-icons/md";

const TripCard = ({ trip, people, onBook }) => {
  const pricing = trip.pricing[people] || trip.pricing[1] || { perPerson: "N/A", total: "N/A" };
  const durationDays = trip.itinerary?.length || "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Number(trip.id) * 0.1 || 0 }}
      className="flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
    >
      <div className="relative">
        <img src={trip.image} alt={trip.title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 w-full h-20 object-cover bg-gradient-to-bl from-blue-700/30 to-transparent"></div>

        {trip.bundleEligible && (
          <div className="absolute top-0 right-0 border-b-2 border-l-2 bg-blue-600 text-sm rounded-bl-md text-white px-2 py-1 gap-2 flex items-center">
            <FaRegCheckSquare title="Eligible for bundle" className="text-lg" />
            Eligible For Bundling
          </div>
        )}

        {trip.familyPackage && (
          <div className="absolute top-0 right-0 border-b-2 border-l-2 bg-blue-600 text-sm rounded-bl-md text-white px-2 py-1 gap-2 flex items-center">
            <MdFamilyRestroom title="Family Package Available" className="text-lg" />
            Family Package Included
          </div>
        )}

        {trip.groupDiscounts && (
          <div className="absolute top-0 right-0 border-b-2 border-l-2 bg-blue-600 text-sm rounded-bl-md text-white px-2 py-1 gap-2 flex items-center">
            <MdGroups title="Group Discount Available" className="text-lg" />
            Group Discounts
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold">{trip.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{trip.description}</p>
        <p className="text-sm text-gray-500">
          Duration: <span className="font-semibold">{durationDays} days</span>
        </p>

        <div className="flex flex-wrap gap-2 my-2">
          {trip.tags.map((tag, i) => (
            <span key={i} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">{tag}</span>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-md text-gray-500">
                Price per person: <span className="font-semibold">{pricing.perPerson}</span>
              </p>
              <p className="text-md text-gray-700 font-bold">Total: {pricing.total}</p>
            </div>
            <div className="text-md hover:underline cursor-pointer">
              <Link key={trip.id} href={`/trips/${trip.id}`} passHref>View Offer</Link>
            </div>
          </div>

          <button
            onClick={() => onBook(trip)}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-md"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TripCard;
