"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaInfoCircle, FaTimes, FaSearch } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { MdCardTravel } from "react-icons/md";
import { useBundle } from "./context/BundleContext";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { bundle, removeFromBundle, clearBundle } = useBundle();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBundle, setShowBundle] = useState(false);

  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const isSearchPage = pathname === "/search";

  const router = useRouter()

  const handleBundleBook = () => {
    window.alert('Successfully Booked! Check Email For Confirmation.')

    router.push(`/search`);

  }

  return (
    <>
      {/* Slide-out Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Your Trips Modal */}
      <AnimatePresence>
        {showBundle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6 relative"
            >
              <button
                onClick={() => setShowBundle(false)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-lg z-[1000]"
              >
                <FaTimes />
              </button>

              <h3 className="text-lg font-semibold mb-4 text-black">Your Trips</h3>

              {bundle.length === 0 ? (
                <p className="text-gray-500 text-center">No trips added yet</p>
              ) : (
                <ul className="space-y-3 max-h-96 overflow-y-auto">
                  {bundle.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center justify-between gap-2 border-b pb-2"
                    >
                      <div>
                        <p className="font-semibold text-black">{t.title}</p>
                        <p className="text-sm text-gray-500">
                          {t.travelers} travelers · {t.pricing.total}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromBundle(t.id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                  <button 
                  onClick={() => {
                    setMenuOpen(false)
                    setShowBundle(false)
                    clearBundle()
                    handleBundleBook()
                  }}
                  className='px-3 py-1 text-white bg-blue-600 rounded-lg'>{bundle.length === 1 ? 'Book Trip' : 'Book Trips'}</button>
                </ul>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar for Search + About Pages */}
      {isAboutPage || isSearchPage ? (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed bg-transparent text-black w-full top-0 left-0 z-80 flex justify-end items-center py-2 px-2"
        >
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`text-blue-500 border z-[1000] text-lg p-2 rounded-full ${
              menuOpen ? "hover:bg-red-100" : "bg-white hover:bg-[#ddd]"
            } shadow-lg cursor-pointer`}
          >
            {menuOpen ? <FaTimes /> : <HiMenuAlt3 />}
          </button>

          {/* Slide-out Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 right-0 w-64 h-screen bg-white shadow-lg flex flex-col justify-center z-80"
              >
                <Link
                  href="/"
                  className="h-[25%] hover:bg-black/30 flex items-center justify-center gap-2 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaHome className="text-blue-900" />
                  Home
                </Link>
                <Link
                  href="/about"
                  className="h-[25%] border-t hover:bg-black/30 flex items-center justify-center gap-2 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaInfoCircle className="text-blue-900" />
                  About
                </Link>

                <div
                  className="h-[25%] border-t hover:bg-black/30 flex items-center justify-center cursor-pointer"
                  onClick={() => setShowBundle(true)}
                >
                  <PiAirplaneTiltFill className="text-blue-900 mr-2" />
                  Your Trips
                </div>

                <Link
                  href="/search"
                  className="h-[25%] border-t hover:bg-black/30 flex items-center justify-center gap-2 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaSearch className="text-blue-900" />
                  Search
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      ) : (
        /* Full Nav for Home page */
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed bg-gradient-to-r from-white to-white/60 backdrop-blur-xl text-black shadow w-full top-0 left-0 z-60 flex justify-between items-center py-4 px-6 transition-all duration-300"
        >
          {/* Logo */}
          <h2 className="text-2xl font-bold">
            <span className="text-blue-600">Inter</span>
            <span className="text-blue-900">Vest</span>
          </h2>

          {/* Hamburger */}
          <div className="sm:hidden flex items-center z-100">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-blue-500 border p-2 rounded-lg hover:bg-gray-200 transition"
            >
              {menuOpen ? <FaTimes /> : <HiMenuAlt3 />}
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:flex gap-10 items-center">
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
              onClick={() => setShowBundle(true)}
            >
              <PiAirplaneTiltFill className="text-blue-900" />
              Your Trips
            </div>
            <Link
              href="/about"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <FaInfoCircle className="text-blue-900" />
              About
            </Link>
          </div>

          {/* Slide-out Menu for Home, smaller screens */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 right-0 w-64 h-screen bg-white shadow-lg flex flex-col justify-center z-80"
              >
                <Link
                  href="/"
                  className="h-[25%] hover:bg-black/30 flex items-center justify-center gap-2 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaHome className="text-blue-900" />
                  Home
                </Link>
                <Link
                  href="/about"
                  className="h-[25%] border-t hover:bg-black/30 flex items-center justify-center gap-2 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaInfoCircle className="text-blue-900" />
                  About
                </Link>

                <div
                  className="h-[25%] border-t hover:bg-black/30 flex items-center justify-center cursor-pointer"
                  onClick={() => setShowBundle(true)}
                >
                  <PiAirplaneTiltFill className="text-blue-900 mr-2" />
                  Your Trips
                </div>

                <Link
                  href="/search"
                  className="h-[25%] border-t hover:bg-black/30 flex items-center justify-center gap-2 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaSearch className="text-blue-900" />
                  Search
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </>
  );
}
