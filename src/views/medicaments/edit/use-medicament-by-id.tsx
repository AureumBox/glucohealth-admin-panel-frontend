import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useMedicamentId() {
  const navigate = useNavigate();
  const params = useParams();

  const [medicamentId, setMedicamentId] = useState<string | null>(null);
  useEffect(() => {
    console.log();
    if (!params.id) {
      navigate("/medicaments");
    }

    setMedicamentId(params.id as unknown as string);
  }, [navigate, params.id]);

  return medicamentId;
}
