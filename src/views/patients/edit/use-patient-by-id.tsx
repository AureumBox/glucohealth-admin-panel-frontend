import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function usePatientId() {
  const navigate = useNavigate();
  const params = useParams();

  const [patientId, setPatientId] = useState<string | null>(null);
  useEffect(() => {
    console.log();
    if (!params.id) {
      navigate("/patients");
    }

    setPatientId(params.id as unknown as string);
  }, [navigate, params.id]);

  return patientId;
}
