import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useClientDni() {
  const navigate = useNavigate();
  const params = useParams();

  const [clientDni, setClientDni] = useState<string | null>(null);
  useEffect(() => {
    console.log();
    if (!params.id) {
      navigate("/customers");
    }

    setClientDni(params.id as unknown as string);
  }, [navigate, params.id]);

  return clientDni;
}
