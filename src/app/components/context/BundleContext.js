"use client";
import { createContext, useContext, useState } from "react";

const BundleContext = createContext();

export const BundleProvider = ({ children }) => {
  const [bundle, setBundle] = useState([]); // stores trips added, initialized as empty

  // Adding or removing from bundle logic
  const addToBundle = (trip) => {
    setBundle((prev) => [...prev, trip]);
  };

  const removeFromBundle = (id) => {
    setBundle((prev) => prev.filter((t) => t.id !== id));
  };

  const clearBundle = () => {
  setBundle([]); // wipes the whole bundle
};

  return (
    <BundleContext.Provider value={{ bundle, addToBundle, removeFromBundle, clearBundle }}>
      {children}
    </BundleContext.Provider>
  );
};

export const useBundle = () => useContext(BundleContext);
