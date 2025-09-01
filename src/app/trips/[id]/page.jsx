import TripPage from "../../components/TripPage";
import trips from "../../components/data/trips";

export default function TripDetailPage({ params }) {
  const tripId = parseInt(params.id);
  const trip = trips.find((t) => t.id === tripId);

  return <TripPage trip={trip} />;
}
