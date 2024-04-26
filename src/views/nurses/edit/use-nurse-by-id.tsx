import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useNurseId() {
  const navigate = useNavigate();
  const params = useParams();

  const [nurseId, setNurseId] = useState<string | null>(null);
  useEffect(() => {
    console.log();
    if (!params.id) {
      navigate("/nurses");
    }

    setNurseId(params.id as unknown as string);
  }, [navigate, params.id]);

  return nurseId;
}
