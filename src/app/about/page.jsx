"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import NavBar from "../components/NavBar";

import {
  FaUsers,
  FaPlane,
  FaHotel,
  FaHandshake,
  FaChevronDown,
} from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import Footer from "../components/Footer";

// Card content for hero dropdowns
const items = [
  {
    title: "How We Started",
    description:
      "InterVest began with a mission to simplify global property investment. We wanted to make the world feel smaller and more accessible for investors of all levels.",
  },
  {
    title: "What We Stand For",
    description:
      "We believe in transparency, sustainability, and empowerment. Our goal is to help people invest wisely, not just quickly.",
  },
  {
    title: "More About Us",
    description:
      "We are a team of curious travelers, data nerds, and passionate developers dedicated to changing how investment meets adventure.",
  },
];

export default function AboutSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Terms for specific deals 
  const [showTerms, setShowTerms] = useState(false);
  const [showTerms2, setShowTerms2] = useState(false);
  const [showTerms3, setShowTerms3] = useState(false);

  return (
    <div className="w-full mx-auto p-0">
      <NavBar />
      <div className="text-3xl sm:text-4xl md:text-5xl mt-10 md:mt-18 font-bold mb-8 text-center text-blue-900 w-full px-2">
        About <span className="text-blue-600">Inter</span>Vest
      </div>

      {/* ===================== ACCORDION ===================== */}
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="mb-4 rounded-2xl border border-blue-100 shadow-lg overflow-hidden transition-all duration-500 bg-white w-[95%] sm:w-[80%] mx-auto"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-4 sm:px-6 py-4 bg-white/70 backdrop-blur-md hover:bg-white/90 transition-colors duration-300"
            >
              <span className="text-lg sm:text-xl font-semibold mx-auto text-blue-900">
                {item.title}
              </span>
              <FaChevronDown
                className={`text-blue-800 transform transition-transform duration-500 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? "max-h-60 py-4 px-4 sm:px-6" : "max-h-0 py-0 px-4 sm:px-6"
              }`}
            >
              <div className="text-gray-700 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow-inner text-sm sm:text-base">
                {item.description}
              </div>
            </div>
          </div>
        );
      })}

      {/* ===================== INTRO IMAGES ===================== */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 mb-5 p-4">
        {[
          {
            src: "/trips/about/summer-2337955_1280.jpg",
            alt: "summer",
            text: "Global Beginnings",
          },
          {
            src: "/trips/about/amusement-park-237200_1280.jpg",
            alt: "amusement park",
            text: "Joyful Investment",
          },
          {
            src: "/trips/about/valentines-day-background-3098951_1280.jpg",
            alt: "valentines",
            text: "Heart & Vision",
          },
        ].map((img, i) => (
          <div
            key={i}
            className="relative h-40 sm:h-60 w-full sm:w-[30%] rounded-xl overflow-hidden shadow-lg group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
              <h4 className="text-white text-base sm:text-lg font-semibold">
                {img.text}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== FEATURES INTRO ===================== */}
      <section className="relative w-full px-6 sm:px-20 md:px-40 py-20 sm:py-30 md:py-40 bg-gradient-to-b from-white via-blue-200 to-blue-100 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto px-2 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Discover Our <span className="text-blue-600">Exclusive Features</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            From family adventures to big savings on group bookings, InterVest
            brings you hand-crafted travel experiences designed to make every
            trip memorable.
          </p>
        </div>

        <div className="relative mt-12 w-full overflow-hidden">
          <div className="flex gap-8 sm:gap-16 flex-wrap justify-center">
            <MdFamilyRestroom className="text-3xl sm:text-4xl text-blue-600" />
            <FaPlane className="text-3xl sm:text-4xl text-blue-600 hover:scale-125 transition-transform" />
            <FaHotel className="text-3xl sm:text-4xl text-blue-600 hover:scale-125 transition-transform" />
            <FaUsers className="text-3xl sm:text-4xl text-blue-600 hover:scale-125 transition-transform" />
            <FaHandshake className="text-3xl sm:text-4xl text-blue-600 hover:scale-125 transition-transform" />
          </div>

          <div className="p-3 flex flex-col sm:flex-row gap-4 text-white items-center justify-evenly w-full mt-4">
            <a
              href="/about#family-packages"
              className="p-3 bg-blue-700 rounded-lg w-full sm:w-[40%] text-center"
            >
              ↓ Read More
            </a>
            <button className="p-3 bg-blue-700 rounded-lg w-full sm:w-[40%]">
              Search Deals
            </button>
          </div>
        </div>
      </section>

      {/* ===================== FAMILY PACKAGES / BUNDLE / GROUP ===================== */}
      <section
        id="family-packages"
        className="mb-12 rounded-xl h-screen sm:h-screen bg-white flex flex-col gap-4  [@media(min-height:1000px)]:h-[60vh]"
      >
        <div className="relative w-full mx-auto h-[200px] sm:h-[300px] overflow-hidden shadow-lg">
          <Image
            src="/trips/about/family-6475821_1280.jpg"
            alt="Group Discounts"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-center justify-center">
            <h4 className="text-2xl sm:text-4xl font-thin text-white drop-shadow-lg">
              Family Packages
            </h4>
          </div>
        </div>

        <p className="text-black text-base sm:text-xl px-4 sm:px-6 text-center">
          We’ve crafted unique experiences for families, filled with
          kid-friendly adventures and memories that last a lifetime.
        </p>

        <div className="px-4 md:px-0 w-full sm:w-[80%] mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-5 bg-blue-200/50 rounded-xl shadow-md hover:shadow-lg transition">
              <h5 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">
                <span className='mr-2'>🏖</span> Beach Escapes
              </h5>
              <p className="text-gray-600 text-sm sm:text-base">
                Spend a week at a family-friendly beach resort...
              </p>
            </div>
            <div className="p-5 bg-blue-200/50 rounded-xl shadow-md hover:shadow-lg transition">
              <h5 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">
                <span className='mr-2'>🎢</span> Theme Park Adventures
              </h5>
              <p className="text-gray-600 text-sm sm:text-base">
                Enjoy discounted packages for theme parks...
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-center sm:gap-6 gap-2 sm:gap-10 px-4">
          <Link
            className="w-full sm:w-56 mt-4 text-center p-3 bg-blue-800 rounded-lg shadow-md text-white"
            href="/search?q=&duration=&travelers=&price=&familyPackage=true"
          >
            View Family Packages
          </Link>
          <button
            className="w-full sm:w-56 mt-4 text-center p-3 bg-blue-800 rounded-lg shadow-md text-white"
            onClick={() => setShowTerms(true)}
          >
            View Deal Terms
          </button>
        </div>
        {/* Family Package deal terms */}
        {showTerms && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-lg flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-gray-800">
              <h2 className="text-xl font-semibold mb-4">Terms</h2>
              <p className="text-sm leading-relaxed">
                Family Packages are only available when explicity advertised as so. These special packages
                include additions to normal trips to accomodate for family needs and add
                extra fun to help create precious memories that last a lifetime. In the event of a cancellation or reschedule, the Family Package may 
                not be available when rescheduling. The prices for Family Packages are specific to the trips they are listed on. The additions to the 
                Family Package details for each trip can be viewed by adding 5 travelers when booking.
              
              </p>
              <button
                onClick={() => setShowTerms(false)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>

     

      {/* Bundle & Save */}
      <section
        id="bundle-save"
        className="mb-12 rounded-xl h-screen sm:h-screen bg-white flex flex-col gap-4 [@media(min-height:1000px)]:h-[60vh]"
      >
        <div className="relative w-full mx-auto h-[200px] sm:h-[300px] overflow-hidden shadow-lg">
          <Image
            src="/trips/about/plane-513641_1280.jpg"
            alt="Group Discounts"
            fill
            className="object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-center justify-center">
            <h4 className="text-2xl sm:text-4xl font-thin text-white drop-shadow-lg">
              Bundle & Save
            </h4>
          </div>
        </div>
        <p className="text-black text-base sm:text-xl px-4 sm:px-6 text-center">
          Book Two or More Special Trips Together To Save Up To 20% On Your
          Overall Purchase.{" "}
        </p>

        <div className="px-4 md:px-0 w-full sm:w-[80%] mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-5 bg-blue-200/50 rounded-xl shadow-md hover:shadow-lg transition">
              <h5 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">
                <span className='mr-2'>✈️</span> Weekend Getaways
              </h5>
              <p className="text-gray-600 text-sm sm:text-base">
                Save up to 20% by booking roundtrip flights and a hotel stay
              together for a spontaneous weekend trip.
              </p>
            </div>
            <div className="p-5 bg-blue-200/50 rounded-xl shadow-md hover:shadow-lg transition">
              <h5 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">
                <span className='mr-2'>🏨</span> Extended Stays
              </h5>
              <p className="text-gray-600 text-sm sm:text-base">
                Families booking long vacations can combine accommodation +
              flights for major savings hassle-free.
              </p>
            </div>
          </div>
        </div>


        {/* Bundle deal terms */}

        {showTerms2 && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-lg flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-gray-800">
              <h2 className="text-xl font-semibold mb-4">Terms</h2>
              <p className="text-sm leading-relaxed">
                Bundle deals are only available when specifically listed and
                booked as a combined package (e.g., flight + hotel, or hotel +
                activity). Bundle pricing is based on joint purchase and may
                vary depending on availability, seasonality, or other
                promotional factors. Bundle discounts cannot be separated,
                applied retroactively, or combined with other standalone
                promotions. Cancellations or modifications may affect the
                overall bundled price and may result in loss of discount
                eligibility.
              </p>
              <button
                onClick={() => setShowTerms2(false)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col sm:flex-row justify-center sm:gap-6 gap-2 sm:gap-10 px-4">
          <Link
            className="w-full sm:w-56 mt-4 text-center p-3 bg-blue-800 rounded-lg shadow-md text-white"
            href="/search?q=&duration=&travelers=&price=&bundleEligible=true"
          >
            View Bundle Deals
          </Link>
          <button
            className="w-full sm:w-56 mt-4 text-center p-3 bg-blue-800 rounded-lg shadow-md text-white"
            onClick={() => setShowTerms2(true)}
          >
            View Deal Terms
          </button>
        </div>
      </section>
      {/* Group Discounts */}
      <section
        id="group-discounts"
        className="mb-12 rounded-xl h-screen sm:h-screen bg-white flex flex-col gap-4 [@media(min-height:1000px)]:h-[60vh]"
      >
        <div className="relative w-full mx-auto h-[200px] sm:h-[300px] overflow-hidden shadow-lg">
          <Image
            src="/trips/about/group-4668492_1280.jpg"
            alt="Group Discounts"
            fill
            className="object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-center justify-center">
            <h4 className="text-2xl sm:text-4xl font-thin text-white drop-shadow-lg">
              Group Discounts
            </h4>
          </div>
        </div>
        
        <p className="text-black text-base sm:text-xl px-4 sm:px-6 text-center">
          Book Two or More Special Trips Together To Save Up To 20% On Your
          Overall Purchase.{" "}
        </p>
        
        {/* Section Content */}

        <div className="px-4 md:px-0 w-full sm:w-[80%] mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-5 bg-blue-200/50 rounded-xl shadow-md hover:shadow-lg transition">
              <h5 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">
                <span className='mr-2'>🎓</span> School Trips
              </h5>
              <p className="text-gray-600 text-sm sm:text-base">
                Educational tours with group pricing for schools, including
                guided experiences and bundled meals.
              </p>
            </div>
            <div className="p-5 bg-blue-200/50 rounded-xl shadow-md hover:shadow-lg transition">
              <h5 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">
                <span className='mr-2'>🏢</span> Corporate Retreats
              </h5>
              <p className="text-gray-600 text-sm sm:text-base">
                Companies save when planning conferences, team-building
                retreats, and incentive trips for employees.
              </p>
            </div>
          </div>
        </div>


        {/* Group deal terms */}

        {showTerms3 && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-lg flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-gray-800">
              <h2 className="text-xl font-semibold mb-4">Terms</h2>
              <p className="text-sm leading-relaxed">
                Group discounts are only available when booked under a
                qualifying group reservation. Minimum group size requirements
                may apply, and discounts can vary depending on seasonality,
                destination, or availability. Group discounts cannot be applied
                retroactively, are non-transferable, and may not be combined
                with individual promotional offers. Additional terms may apply
                for splitting or reducing the group size after booking.
              </p>
              <button
                onClick={() => setShowTerms3(false)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col sm:flex-row justify-center sm:gap-6 gap-2 sm:gap-10 px-4">
          <Link
            className="w-full sm:w-56 mt-4 text-center p-3 bg-blue-800 rounded-lg shadow-md text-white"
            href="/search?q=&duration=&travelers=&price=&groupDiscounts=true"
          >
            View Group Discounts
          </Link>
          <button
            className="w-full sm:w-56 mt-4 text-center p-3 bg-blue-800 rounded-lg shadow-md text-white"
            onClick={() => setShowTerms3(true)}
          >
            View Deal Terms
          </button>
        </div>
      </section>
      {/* Footer */}{" "}
      <Footer />
    </div>
  );
}
