import React from 'react'

export const Footer = () => {
  return (
    <footer className="mt-auto flex flex-col sm:flex-row justify-center sm:justify-around items-center text-xs sm:text-sm gap-8 sm:gap-0 w-full bg-[#ddd] text-black p-6 sm:p-10">
        <ul className="flex flex-col gap-2 min-w-[100px] sm:min-w-[120px]">
          <li className="text-xl sm:text-2xl text-blue-500 m-0 p-0">
            Inter<span className="text-blue-800 m-0">Vest</span>
          </li>
          <li>Trips</li>
          <li>Adventures</li>
          <li>Escapes</li>
        </ul>
        <ul className="flex flex-col gap-2 min-w-[100px] sm:min-w-[120px]">
          <li>Search</li>
          <li>Contact Us</li>
          <li>Payments</li>
          <li>FAQ</li>
        </ul>
        <ul className="flex flex-col gap-2 min-w-[100px] sm:min-w-[120px]">
          <li>Blog</li>
          <li>Your Map</li>
          <li>Privacy Policy</li>
          <li>Support</li>
        </ul>
      </footer>
  )
}

export default Footer
