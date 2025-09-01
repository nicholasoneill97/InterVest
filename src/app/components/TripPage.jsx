"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";

import { useBundle } from "./context/BundleContext";
import Footer from "./Footer";
import BookNow from "./actions/BookNow";

import { AiFillUpCircle } from "react-icons/ai";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegCheckSquare,
  FaTimes,
} from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { GiPartyPopper } from "react-icons/gi";
import { FaListCheck } from "react-icons/fa6";
import { MdFamilyRestroom, MdGroups } from "react-icons/md";

export default function TripPage({ trip }) {
  const [isViewable, setIsViewable] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [travelers, setTravelers] = useState(1);
  const [seeBookNow, setSeeBookNow] = useState(false);
  const targetRef = useRef(null);
  const images = trip.gallery;

  // image slider button logic

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // more details button logic

  const scrollToElement = () => {
    if (targetRef.current) {
      const y = targetRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  //floating search button logic

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // no trip fall back
  if (!trip)
    return <div className="text-white text-center mt-10">Trip not found.</div>;

  //traveler amount + price logic for increment and decrement
  const maxTravelers = Math.max(
    ...Object.keys(trip.pricing)
      .filter((k) => !isNaN(k))
      .map(Number)
  );

  const handleIncrement = () =>
    setTravelers((prev) => Math.min(prev + 1, maxTravelers));
  const handleDecrement = () => setTravelers((prev) => Math.max(prev - 1, 1));

  const pricingKey =
    travelers in trip.pricing ? travelers : Math.min(travelers, maxTravelers);
  const perPerson = trip.pricing[pricingKey].perPerson;
  const total = trip.pricing[pricingKey].total;

  //date range initialization passed in to book now
  const date = trip.availability[0];

  return (
    <section className="flex min-h-screen flex-col bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <div className="absolute top-4 left-4 z-50 flex gap-6 text-sm sm:text-base">
        <Link href="/search" className="text-white hover:underline">
          ← Back To Search
        </Link>
        <Link href="/" className="text-white hover:underline">
          Home
        </Link>
      </div>
      {/* Deal Tags */}
      {trip.groupDiscounts && (
        <div className=" z-60 absolute right-0 top-4 bg-gradient-to-br from-blue-200 to-blue-300 text-xs sm:text-sm text-black px-3 py-1 h-auto rounded-bl-lg rounded-tl-lg shadow border border-blue-600 flex items-center gap-1">
          <MdGroups className="text-base" />
          Group Discounts
        </div>
      )}

      {trip.bundleEligible && (
        <div className="z-20 absolute right-0 top-4 bg-gradient-to-br from-blue-200 to-blue-300 text-xs sm:text-sm text-black px-3 py-1 h-auto rounded-bl-lg rounded-tl-lg shadow border border-blue-600 flex items-center gap-1">
          <FaRegCheckSquare className="text-base" />
          Bundling
        </div>
      )}

      {trip.familyPackage && (
        <div className=" z-40 absolute right-0 top-4 bg-gradient-to-br from-blue-200 to-blue-300 text-xs sm:text-sm text-black px-3 py-1 h-auto rounded-bl-lg rounded-tl-lg shadow border border-blue-600 flex items-center gap-1">
          <MdFamilyRestroom className="text-base" />
          Family
        </div>
      )}

      {/* Top Hero Section with Background */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          quality={100}
          className="object-cover brightness-[0.5]"
        />

        {!isViewable && (
          // "View Photos" button inside hero
          <div className="absolute inset-0 flex justify-center items-center z-20">
            <button
              onClick={() => setIsViewable(true)}
              className="bg-black/30 px-4 py-2 rounded-full border cursor-pointer hover:scale-105 hover:bg-black/50 text-sm sm:text-base"
            >
              View Photos
            </button>
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      {isViewable && (
        <>
          <div className="fixed inset-0 flex justify-center items-center z-50 px-2">
            <div className="relative w-full sm:w-[80%] md:w-[70%] h-[80vh] sm:h-[90vh]">
              <Image
                src={images[currentIndex]}
                alt={`${trip.title} image ${currentIndex + 1}`}
                fill
                quality={100}
                className="object-cover rounded-xl brightness-75"
              />

              {/* Next Arrow */}
              <div
                onClick={handleNext}
                className="absolute top-1/2 cursor-pointer right-0 px-3 sm:px-4 transform -translate-y-1/2 text-white text-2xl sm:text-4xl duration-500 bg-white/10 hover:bg-white/20 h-full flex items-center rounded-tr-lg rounded-br-lg"
              >
                <FaArrowRight className="text-xl text-gray-200" />
              </div>

              {/* Previous Arrow */}
              <div
                onClick={handlePrevious}
                className="absolute top-1/2 cursor-pointer left-0 px-3 sm:px-4 transform -translate-y-1/2 text-white text-2xl sm:text-4xl duration-500 bg-white/10 hover:bg-white/20 h-full flex items-center rounded-tl-lg rounded-bl-lg"
              >
                <FaArrowLeft className="text-xl text-gray-200" />
              </div>

              {/* Close */}
              <div
                onClick={() => setIsViewable(false)}
                className="absolute top-3 left-[50%] transform translate-x-[-50%] cursor-pointer p-1 border rounded-full text-white sm:text-lg text-lg"
              >
                <FaTimes />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-6 w-[90%] flex justify-center gap-2 sm:gap-4">
              {images.map((src, idx) => (
                <Image
                  key={idx}
                  src={src}
                  width={50}
                  height={50}
                  alt={`Gallery ${idx + 1}`}
                  className={`rounded-md shadow-lg border object-cover ${
                    currentIndex === idx
                      ? "border-blue-400 scale-105"
                      : "border-white"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Dark Overlay */}
          <div
            className="fixed top-0 h-screen z-40 w-full bg-black/40"
            onClick={() => setIsViewable(false)}
          ></div>
        </>
      )}

      {/* Details */}
      <div
        ref={targetRef}
        className="relative z-20 bg-white text-black rounded-t-3xl shadow-xl px-4 sm:px-6 md:px-12 py-8 md:py-10 max-w-screen-xl mx-auto -mt-10"
      >
        {/* Title & Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div className="flex sm:flex-row justify-between gap-3 sm:gap-6">
            <h1 className="text-xl md:text-3xl font-extrabold tracking-tight m-0 p-0 ">
              {trip.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSeeBookNow(!seeBookNow)}
              className="cursor-pointer bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-transform text-sm sm:text-base w-fit "
            >
              Book Now
            </button>
            <button
              onClick={scrollToElement}
              className="cursor-pointer bg-[#ddd] text-black px-4 sm:px-5 py-2 rounded-full shadow hover:scale-105 transition-transform text-sm sm:text-base w-fit"
            >
              ↓ More Details
            </button>
          </div>
        </div>
        {/* book now card */}
        {seeBookNow && (
          <BookNow
            trip={trip}
            people={travelers}
            perPerson={perPerson}
            total={total}
            date={date}
            onClose={() => setSeeBookNow(false)}
            onBook={() => {
              alert("Booking confirmed! ✅");
              setSeeBookNow(false);
            }}
            className="z-100"
          />
        )}

        {/* Description */}
        <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-6">
          {trip.description}
        </p>

        {/* Price Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 bg-gradient-to-br from-blue-100 to-blue-300 text-black px-4 sm:px-6 py-4 rounded-xl mb-8 shadow-md border border-blue-400 text-base sm:text-xl font-semibold">
          {/* Travelers */}
          <div className="relative border-b border-gray-600 pb-4 sm:pb-0 sm:border-0 flex items-center justify-center gap-2 w-full sm:w-[30%]">
            <button
              onClick={handleDecrement}
              className="absolute left-0 bg-blue-400 hover:bg-blue-500 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
            >
              -
            </button>
            <span className="text-center">
              {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
            </span>
            <button
              onClick={handleIncrement}
              className="absolute right-0 bg-blue-400 hover:bg-blue-500 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
            >
              +
            </button>
          </div>

          {/* Pricing */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 justify-center sm:justify-start">
            {travelers > 1 && (
              <div className="text-center">
                Per Person: <span className="font-bold">{perPerson}</span>
              </div>
            )}
            <div className="text-center">
              Total: <span className="font-bold">{total}</span>
            </div>
          </div>

          {/* Duration */}
          <div className="text-xs sm:text-sm tracking-wide italic">
            {trip.itinerary.length} Day Trip
          </div>

          {/* Family Package Marker */}
          {trip.familyPackage && travelers >= 5 && (
            <div className="border rounded-lg bg-white text-xs sm:text-sm text-black px-3 sm:px-4 py-1 flex items-center gap-1">
              <MdFamilyRestroom className="text-lg" />
              Family Package
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {/* Itinerary */}
          <div className="bg-white shadow-xl border border-gray-200 p-4 sm:p-6 rounded-2xl">
            <h3 className="text-xl flex items-center gap-4 sm:text-xl font-semibold mb-4">
              <FaListUl /> Itinerary
            </h3>
            <div className="flex flex-col gap-2">
              {trip.itinerary.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-blue-100 text-blue-900 text-sm tracking-wide px-4 py-2 sm:px-6 sm:py-3 rounded-sm shadow-sm"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Deals, Availability & Vibes */}
          <div className="flex flex-col gap-6 md:gap-8">
            {trip.familyPackage && (
              <div className="bg-white shadow-xl border border-gray-200 p-4 sm:p-6 rounded-2xl">
                <h3 className="text-xl flex items-center gap-4 sm:text-xl font-semibold mb-4">
                  <MdFamilyRestroom className="text-3xl" />
                  Family Package Additions
                </h3>
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <div className="flex flex-col gap-2">
                  <p className="text-xs mb-2">
                    <span className="text-blue-800 text-md mr-1">*</span>Only
                    Available When Selecting 5 Passengers
                  </p>
                  <div className="bg-gradient-to-br from-blue-300 to-white text-black px-3 sm:px-4 py-2 rounded-full text-xs shadow border border-gray-300">
                    - Special 2 Day Pass To Water Park
                  </div>
                  <div className="bg-gradient-to-br from-blue-300 to-white text-black px-3 sm:px-4 py-2 rounded-full text-xs shadow border border-gray-300">
                    - Golf Cart (Seats 5 People) + $100 Gas Card
                  </div>
                </div>
              </div>
            )}
            {trip.bundleEligible && (
              <div className="bg-white shadow-xl border border-gray-200 p-4 sm:p-6 rounded-2xl">
                <h3 className="text-xl flex items-center gap-4 sm:text-xl font-semibold mb-4">
                  <FaRegCheckSquare />
                  This Trip Can Be Bundled
                </h3>
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <div className="flex flex-col gap-2">
                  <div>
                    This trip can be combined with other eligible trips to get
                    special discounts.
                  </div>
                </div>
              </div>
            )}
            {trip.groupDiscounts && (
              <div className="bg-white shadow-xl border border-gray-200 p-4 sm:p-6 rounded-2xl">
                <h3 className="text-xl flex items-center gap-4 sm:text-xl font-semibold mb-4">
                  <MdGroups className="text-3xl" /> Group Discounts Included
                </h3>
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <div className="flex flex-col gap-2">
                  <div>
                    Special Discounts Available For Groups of 5 or More
                    Travelers
                  </div>
                </div>
              </div>
            )}
            <div className="bg-white shadow-xl border border-gray-200 p-4 sm:p-6 rounded-2xl">
              <h3 className="text-xl flex items-center gap-4 sm:text-xl font-semibold mb-4">
                <GrSchedules /> Availability
              </h3>
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <div className="flex flex-col gap-2">
                {trip.availability.map((range, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-900 px-3 sm:px-4 py-2 rounded-sm text-xs sm:text-sm text-center shadow-sm border border-blue-200"
                  >
                    {range}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-xl border border-gray-200 p-4 sm:p-6 rounded-2xl">
              <h3 className="text-xl flex items-center gap-4 sm:text-xl font-semibold mb-4">
                <GiPartyPopper /> Vibes
              </h3>
              <div className="flex flex-wrap gap-2">
                {trip.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-br from-blue-300 to-white text-black px-3 sm:px-4 py-2 rounded-full text-xs shadow border border-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white shadow-xl border border-gray-200 p-4 sm:p-6 rounded-2xl">
            <h3 className="text-xl sm:text-xl font-semibold mb-4 flex items-center gap-4">
              <FaListCheck /> What's Included
            </h3>
            <ul className="flex flex-col gap-2">
              {trip.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="bg-blue-100 px-3 sm:px-4 py-2 rounded-sm shadow-sm border border-blue-300 text-gray-900 text-xs sm:text-sm"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-6 p-6 bg-white">
        <button
          onClick={() => setSeeBookNow(!seeBookNow)}
          className="w-full [@media(max-width:800px)]:block [@media(max-width:800px)]: hidden cursor-pointer bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-transform text-sm sm:text-base"
        >
          Book Now
        </button>
        <div className=" w-full flex gap-4 justify-center items-center">
          <div
            onClick={scrollTop}
            className="w-full mx-auto [@media(max-width:800px)]:flex hidden cursor-pointer bg-transparent border border-blue-900 text-white px-4 sm:px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-transform text-sm sm:text-base justify-evenly items-center"
          >
            <AiFillUpCircle className="text-blue-500 h-full" />
            <div className="ml-2 text-black">Back To Top</div>
          </div>
          <Link
            href="/search"
            className="w-full mx-auto text-black [@media(max-width:800px)]:flex hidden cursor-pointer bg-black/10 border px-4 sm:px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition-transform text-sm sm:text-base justify-center items-center"
          >
            Back To Search
          </Link>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </section>
  );
}
