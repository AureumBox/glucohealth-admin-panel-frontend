import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useHotelPerNightId() {
  const navigate = useNavigate();
  const params = useParams();

  const [hotelPerNightId, setHotelPerNightId] = useState<string | null>(null);
  useEffect(() => {
    console.log();
    if (!params.id) {
      navigate("/hotels-per-night");
    }

    setHotelPerNightId(params.id as unknown as string);
  }, [navigate, params.id]);

  return hotelPerNightId;
}
