import React, { Suspense } from "react";
import SearchPage from "../components/SearchPage"; // move your existing SearchPage here

export default function page() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading trips...</p>}>
      <SearchPage />
    </Suspense>
  );
}
