import React, { useState } from "react";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdFamilyRestroom, MdGroups } from "react-icons/md";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useBundle } from "../context/BundleContext";

const BookNow = ({ trip, onClose, onBundle, onBook, people }) => {
  if (!trip) return null;

  // Stores payment method they have selected, initialized as credit
  const [selectedPayment, setSelectedPayment] = useState("credit");


  //  Track traveler count locally (start at 1)
  const [travelerCount, setTravelerCount] = useState(people);

  //  Compute current pricing from trip.pricing
  const currentPricing = trip.pricing[travelerCount] || trip.pricing[1];

  // Payment methods available
  const paymentMethods = [
    { id: "credit", label: "Credit / Debit Card", icon: "💳" },
    { id: "paypal", label: "PayPal", icon: "🅿️" },
    { id: "crypto", label: "Crypto (BTC, ETH)", icon: "₿" },
    { id: "bank", label: "Bank Transfer", icon: "🏦" },
  ];

  //  Traveler count change handlers
  const handleIncrease = () => {
    if (travelerCount < Object.keys(trip.pricing).length) {
      setTravelerCount((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (travelerCount > 1) {
      setTravelerCount((prev) => prev - 1);
    }
  };

  const router = useRouter(); // ✅ setup router

  const handleRedirect = () => {
    router.push(`/search`);
  };

  // Grabs useBundle for adding trips to it

  const { bundle, addToBundle } = useBundle();

  // This checks to see if a trip is in the bundle or not
  const isInBundle = bundle.some((t) => t.id === trip.id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white text-black rounded-2xl shadow-xl p-8 w-[85%] max-w-lg max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 left-2 text-gray-500 hover:text-black text-3xl"
        >
          ×
        </button>

        {/* Trip Details */}
        <h2 className="text-3xl font-bold mb-2 mt-6">{trip.title}</h2>
        <p className="mb-4 text-gray-600">{trip.description}</p>

        {/* Deal Tags */}
        {trip.bundleEligible === true && (
          <div className="absolute top-0 right-0 border-b-2 border-l-2 bg-blue-600 text-sm rounded-bl-md text-white px-2 py-2 gap-2 flex items-center">
            <FaRegCheckSquare title="Eligible for bundle" className="text-lg" />
            Eligible For Bundling
          </div>
        )}

        {trip.familyPackage === true && (
          <div className="absolute top-0 right-0 border-b-2 border-l-2 bg-blue-600 text-sm rounded-bl-md text-white px-2 py-2 gap-2 flex items-center">
            <MdFamilyRestroom
              title="Family Package Available"
              className="text-lg"
            />
            Family Package Included
          </div>
        )}

        {trip.groupDiscounts === true && (
          <div className="absolute top-0 right-0 border-b-2 border-l-2 bg-blue-600 text-sm rounded-bl-md text-white px-2 py-2 gap-2 flex items-center">
            <MdGroups title="Group Discount Available" className="text-lg" />
            Group Discounts
          </div>
        )}
        <div>
          {/* Specific Trip Dates and Duration */}
          <div>
            {trip.availability[0]}
          </div>
          <p className="mb-6 text-blue-600 font-semibold">
            Duration: {trip.itinerary.length} days
          </p>

          {/* Bundle button with details passed in. Redirects to search page. */}
          {trip.bundleEligible && (
            <div
              onClick={() => {
                if (!isInBundle) {
                  addToBundle({
                    id: trip.id,
                    title: trip.title,
                    image: trip.image,
                    pricing: currentPricing,
                    travelers: travelerCount,
                  });
                } else {
                  window.alert("Trip Already Booked");
                }

                handleRedirect();
              }}
              className={`w-full font-semibold py-3 rounded-lg shadow-md flex items-center justify-center mb-4
            ${
              isInBundle
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
            >
              <IoAdd className="text-lg" />
              <div className="text-sm  flex justify-evenly flex-wrap">
                {isInBundle
                  ? "Added to Bundle"
                  : "Add To Bundle & Keep Shopping"}
              </div>
            </div>
          )}
        </div>

        {/* Booking Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold mb-2">Booking Summary</h3>
          <p>
            Trip Selected: <span className="font-semibold">{trip.title}</span>
          </p>

          {/* Traveler Count with + / - */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-gray-700">Travelers:</span>
            <button
              onClick={handleDecrease}
              className="px-2 py-1 bg-gray-200 border border-gray-600 rounded hover:bg-gray-300"
            >
              –
            </button>
            <span className="font-semibold">{travelerCount}</span>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 bg-gray-200 border border-gray-600 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
          {/* Family Package Breakdown */}
          {trip.familyPackage && travelerCount >= 5 && (
            <span className="text-sm text-blue-700 font-normal">
              2 Adults + 3 Children
            </span>
          )}
          {/* Group Discounts display pricing differently */}
          {travelerCount > 1 && (
            <p className="mt-2">
              <span
                className={`tracking-wide mr-1 ${
                  trip.groupDiscounts && travelerCount >= 5
                    ? "text-blue-600"
                    : "text-black"
                }`}
              >
                {currentPricing.perPerson}
              </span>
              Per Person{" "}
            </p>
          )}

          <p
            className={`w-full text-lg font-semibold mt-2 flex items-center ${
              trip.groupDiscounts && travelerCount >= 5
                ? "text-black/90"
                : "text-black"
            }`}
          >
            
            <span className="text-lg text-blue-800 font-semibold mr-1">
                {currentPricing.total}
            </span>
            Total
            {/* Deal Tags when amount of travelers corresponds */}
            {trip.groupDiscounts && travelerCount >= 5 && (
              <span className="ml-4 text-xs text-blue-700 font-normal">
                Deal Applied
              </span>
            )}
            {trip.familyPackage && travelerCount >= 5 && (
              <span className="ml-2 text-xs text-blue-700 font-normal">
                Fam Package
              </span>
            )}
          </p>
        </div>
        {trip.familyPackage && travelerCount >= 5 && (
          <div className="bg-gradient-to-br from-blue-700 to-blue-400 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg text-white font-bold mb-2">
              Family Package Includes
            </h3>
            <p className="text-gray-200">
              - Special 2 Day Pass To Safari Water Park
            </p>
            <p className="text-gray-200">- Golf Cart That Seats 5 Passengers</p>
          </div>
        )}

        {/* Traveler Info (mock) */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold mb-2">Traveler Information</h3>
          <p className="text-gray-600">Full Name, Passport, Contact Info</p>
          <p className="text-gray-400 text-sm">
            (This is just a preview — in a real booking, you'd fill this in)
          </p>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">Select Payment Method</h3>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`p-4 border rounded-lg flex items-center justify-center gap-2 transition ${
                  selectedPayment === method.id
                    ? "border-blue-500 bg-blue-100 text-blue-600"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{method.icon}</span>
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() =>
            onBook({
              travelers: travelerCount,
              payment: selectedPayment,
              pricing: currentPricing,
            })
          }
          className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
        >
          Confirm & Book with{" "}
          {paymentMethods.find((m) => m.id === selectedPayment)?.label}
        </button>
        {/* Another add to bundle button, passes in details */}
        {trip.bundleEligible && (
          <div
            onClick={() => {
              if (!isInBundle) {
                addToBundle({
                  id: trip.id,
                  title: trip.title,
                  image: trip.image,
                  pricing: currentPricing,
                  travelers: travelerCount,
                });
              } else {
                window.alert("Trip Already Booked");
              }
              handleRedirect();
            }}
            className={`w-full text-sm font-semibold py-3 rounded-lg shadow-md flex items-center justify-center mb-4
            ${
              isInBundle
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            <IoAdd className="text-lg" />
            {isInBundle
              ? "Added to Bundle"
              : "Add To Bundle & Keep Shopping"}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookNow;
