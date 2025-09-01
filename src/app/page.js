"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import TripCards from "./components/TripCards";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";


import {
  FaSearch,
  FaUserFriends,
  FaCalendarAlt,
  FaDollarSign,
  FaGlobe,
  FaUmbrellaBeach,
  FaMoneyBillWave,
  FaPlaneDeparture,
  FaEnvelope,
  FaRocket,
} from "react-icons/fa";

export default function Home() {
  //Search Logic
  const [query, setQuery] = useState("");
  const [duration, setDuration] = useState("");
  const [travelers, setTravelers] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();

  const [bundleEligible, setBundleEligible] = useState(false);
  const [familyPackage, setFamilyPackage] = useState(false);
  const [groupDiscounts, setGroupDiscount] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams({
      q: query,
      duration,
      travelers,
      price,
    });

    if (bundleEligible) params.append("bundleEligible", "true");
    if (familyPackage) params.append("familyPackage", "true");
    if (groupDiscounts) params.append("groupDiscounts", "true");

    router.push(`/search?${params.toString()}`);
  };

  //Random Hero Image Logic
  const heroGallery = [
    "/hero/nature-4998424_1280.jpg",
    "/hero/waterfall-5820721_1280.jpg",
    "/hero/bachalpsee-7572681_1280.jpg",
    "/hero/niagara-falls-2760499_1280.jpg",
  ];

  const [randomImage] = useState(() => {
    return heroGallery[Math.floor(Math.random() * heroGallery.length)];
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <NavBar />

      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden flex flex-col items-center justify-center">
        <Image
          src={randomImage}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
          className="z-0 brightness-80"
        />

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className=" tracking-wider z-50 text-2xl sm:text-5xl  mb-4 font-semibold abril text-stroke drop-shadow-[2px_2px_0px_black] text-gray-200 mt-10 px-4 text-center max-[400px]:pt-10"
        >
          Find Your Next Getaway
        </motion.h2>

        {/* Filters + Search */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="z-20 w-[95%] sm:max-w-[90%] p-6 sm:p-8 bg-white shadow-2xl rounded-2xl flex flex-col gap-4 overflow-auto"
        >
          <div className="flex flex-col lg:flex-row w-full items-stretch lg:items-end gap-4 flex-wrap min-[0px]:max-[550px]:flex-row">
            {/* Search Input */}
            <div className="flex flex-col w-full lg:w-auto">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaGlobe className="text-blue-500" />
                Search by Keyword
              </label>
              <input
                type="text"
                placeholder="Try 'Italy', 'beach', or 'mountain'"
                maxlength="30"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 w-full lg:w-[250px] px-4 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Duration */}
            <div className="flex flex-col flex-1 min-[0px]:max-[550px]:w-[48%]">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="h-10 px-4 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any length</option>
                <option value="1-3">1-3 Days</option>
                <option value="4-7">4-7 Days</option>
                <option value="8+">8+ Days</option>
              </select>
            </div>

            {/* Travelers */}
            <div className="flex flex-col flex-1 min-[0px]:max-[550px]:w-[48%]">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaUserFriends className="text-blue-500" />
                Travelers
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="h-10 px-4 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">1 or More</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3-5">3-5 People</option>
                <option value="6+">6+ People</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col flex-1 min-[0px]:max-[550px]:w-[48%]">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaDollarSign className="text-blue-500" />
                Price
              </label>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-10 px-4 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Price</option>
                <option value="low">Under $500</option>
                <option value="mid">$500–$1000</option>
                <option value="high">$1000+</option>
              </select>
            </div>

            {/* Deals Dropdown */}
            <div className="flex flex-col flex-1 min-[0px]:max-[550px]:w-[48%]">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaMoneyBillWave className="text-blue-500" />
                Deals
              </label>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  setBundleEligible(false);
                  setFamilyPackage(false);
                  setGroupDiscount(false);

                  if (value === "bundle") setBundleEligible(true);
                  if (value === "family") setFamilyPackage(true);
                  if (value === "discount") setGroupDiscount(true);
                }}
                className="h-10 px-4 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Deal</option>
                <option value="family">Family Package</option>
                <option value="bundle">Bundle Eligible</option>
                <option value="discount">Group Discount</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex flex-col flex-none w-full sm:w-auto">
              <button
                type="button"
                onClick={handleSearch}
                className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition flex items-center justify-center gap-2"
              >
                <FaSearch />
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="w-full bg-white py-10 flex flex-wrap justify-center gap-6 sm:gap-10">
        {[
          {
            icon: FaUmbrellaBeach,
            title: "Curated Spots",
            description:
              "Discover hand-selected locations tailored to your goals and interests.",
            special: false,
          },
          {
            icon: FaMoneyBillWave,
            title: "Best Price Assurance",
            description:
              "Competitive pricing with guaranteed transparency—no hidden fees.",
            special: false,
          },
          {
            icon: FaPlaneDeparture,
            title: "Trip Management",
            description:
              "Flights, hotels, excursions—we handle every detail with precision.",
          },
          {
            icon: FaEnvelope,
            title: "Stay In The Loop For New Trips",
            description:
              "Stay updated and informed with our latest travel deals and tips.",
            special: true,
            buttonText: "Subscribe",
          },
          {
            icon: FaRocket,
            title: "Get Early Access To Adventures",
            description:
              "Be the first to know about new adventures and features.",
            special: true,
            buttonText: "Get Started",
          },
        ].map((card, i) => {
          const Icon = card.icon;

          return card.special ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: .8, delay: i * 0.2 }}
              className="w-[90%] sm:w-[70%] md:w-[45%] lg:w-[40%] [@media(max-width:800px)]:w-[90%] bg-gradient-to-br from-black/10 to-gray-100 backdrop-blur-md border border-white/30 rounded-lg p-6 text-black text-left shadow-md hover:shadow-xl transition"
            >
              <div className="flex align-center justify-center mb-4">
                <Icon className="text-blue-300 text-6xl sm:text-8xl mb-2" />
                <h3 className="text-lg sm:text-xl font-thin m-auto min-[0px]:max-[450px]:ml-3">
                  {card.title}
                </h3>
              </div>
              <p className="text-sm">{card.description}</p>
              <div className="w-full flex mt-4">
                <input
                  placeholder="Enter Email Address"
                  className="p-2 bg-white w-[60%] rounded-tl-lg rounded-bl-lg border border-r-0"
                  required
                />
                <button
                  type='submit'
                  onClick={() => {window.alert(card.buttonText === 'Get Started' ? 'Signed Up For Early Access, Check Your Email For Next Steps!' : 'Successfully Subscribed To Our Newsletter, Check Email For More Details!')}}
                  className="p-2 text-center bg-[#ddd] w-[40%] rounded-tr-lg rounded-br-lg border hover:brightness-90"
                >
                  {card.buttonText}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: .8, delay: i * 0.2 }}
              className="w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%] bg-gradient-to-br from-black/10 to-gray-100 backdrop-blur-md border border-white/30 rounded-lg p-6 text-black text-left shadow-md hover:shadow-xl transition"
            >
              <div className="flex align-center justify-center mb-4">
                <Icon className="text-blue-300 text-6xl sm:text-8xl mb-2" />
                <h3 className="text-lg sm:text-xl font-thin m-auto">
                  {card.title}
                </h3>
              </div>
              <p className="text-sm">{card.description}</p>
            </motion.div>
          );
        })}
      </section>

      {/* TripCards Section */}
      <div>
        <TripCards />
      </div>

      {/* Promo Cards Section */}
      <section className="w-full py-16 bg-white flex flex-wrap justify-center gap-6 sm:gap-10">
        {[
          {
            title: "Family Packages",
            description:
              "Tailored experiences designed for families, including kid-friendly activities.",
            image: "/beach-1867271_1280.jpg",
            link: "/about#family-packages",
          },
          {
            title: "Bundle & Save",
            description:
              "Book flights and hotels together and unlock exclusive discounts for your family.",
            image: "/island-2722471_1280.jpg",
            link: "/about#bundle-save",
          },
          {
            title: "Group Discounts",
            description:
              "Travel with friends or extended family and enjoy savings on group bookings.",
            image: "/roller-coaster-8551651_1280.jpg",
            link: "/about#group-discounts",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%] bg-[#ddd] border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col sm:flex-row"
          >
            <div className="relative h-48 sm:h-auto sm:w-1/2">
              <Image
                src={card.image}
                alt={card.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-t-2xl sm:rounded-tr-none sm:rounded-bl-2xl"
              />
            </div>
            <div className="p-6 flex flex-col align-center justify-evenly gap-4">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-600">
                {card.title}
              </h3>
              <p className="text-gray-700 text-sm">{card.description}</p>
              <a
                href={card.link}
                className="self-start bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
