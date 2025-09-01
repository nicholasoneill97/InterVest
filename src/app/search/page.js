// app/search/page.jsx or wherever your page is
import ClientOnly from "../components/ClientOnly";
import SearchPage from "../components/SearchPage"; // your existing component

export default function Page() {
  return (
    <ClientOnly>
      <SearchPage />
    </ClientOnly>
  );
}
