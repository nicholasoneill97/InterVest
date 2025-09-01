import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import trips from "./data/trips";

import { FaRegCheckSquare } from "react-icons/fa";
import { MdGroups, MdFamilyRestroom } from "react-icons/md";

// Scrollbar styles
import "../styles/scroll.css";

export default function TripCards() {
  return (
    <section className="py-12 px-6 max-w-[100%] bg-gradient-to-r from-white to-black/10">
      <motion.h3
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="text-3xl bg-gradient-to-b from-gray-600 to-gray-800 bg-clip-text text-transparent drop-shadow-lg mb-3"
      >
        Featured Trips
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="mb-2 text-black"
      >
        We picked out some of the best trips that are looking extra special.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="w-80 h-[1px] bg-[#ddd] mb-4"
      ></motion.div>

      {/* All Trips */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="flex flex-nowrap gap-6 overflow-x-auto custom-scrollbar px-1 py-1 mb-4 align-baseline"
      >
        {trips.map((trip, index) => (
          <Link
            key={trip.id}
            href={`/trips/${trip.id}`}
            passHref
            className="hover:scale-[1.02] transition-transform ease duration-400"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative snap-start w-[250px] h-[275px] rounded-xl overflow-hidden shadow-md border border-gray-700 hover:shadow-xl transition-shadow duration-900 mb-2"
            >
              {/* Image */}
              <Image
                src={trip.image}
                alt={trip.title}
                fill
                className="object-cover brightness-80 hover:brightness-90 duration-600"
              />

              {/* Overlay Text */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/60 hover:to-transparent text-white px-4 py-4">
                <div>
                  <h4 className="text-xl font-semibold">{trip.title}</h4>
                </div>
                <div className="flex justify-baseline items-center">
                  <p className="text-sm text-blue-200">
                    {trip.pricing[1].perPerson} / Person
                  </p>
                  {trip.bundleEligible === true && (
                    <div className=" text-clip hover:text-white text-blue-300 px-2 py-1 gap-2 text-lg">
                      <FaRegCheckSquare title="eligible for bundle" />
                    </div>
                  )}

                  {trip.familyPackage === true && (
                    <div className="text-clip hover:text-white text-blue-300 px-2 py-1 gap-2 text-lg">
                      <MdFamilyRestroom title="Family Package Available" />
                    </div>
                  )}

                  {trip.groupDiscounts === true && (
                    <div className="text-clip hover:text-white text-blue-300 px-2 py-1 gap-2 text-lg">
                      <MdGroups title="Group Discount Available" />
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span>{trip.itinerary.length} Day Trip </span>
                  <span className="font-semibold hover:underline hover:text-[#ddd]">
                    View Offer
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
      <Link
        href="/search"
        className="cursor-pointer hover:bg-blue-800 py-3 px-6 bg-blue-500 rounded-xl text-white min-[0px]:max-[399px]:mx-auto"
      >
        View All
      </Link>
    </section>
  );
}
