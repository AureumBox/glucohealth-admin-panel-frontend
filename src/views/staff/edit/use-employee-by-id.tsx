import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useEmployeeId() {
  const navigate = useNavigate();
  const params = useParams();

  const [employeeId, setEmployeeId] = useState<string | null>(null);
  useEffect(() => {
    console.log();
    if (!params.id) {
      navigate("/staff");
    }

    setEmployeeId(params.id as unknown as string);
  }, [navigate, params.id]);

  return employeeId;
}
