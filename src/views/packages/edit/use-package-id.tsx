import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function usePackageId() {
  const navigate = useNavigate();
  const params = useParams();

  const [packageId, setPackageId] = useState<string | null>(null);
  useEffect(() => {
    console.log();
    if (!params.id) {
      navigate("/packages");
    }

    setPackageId(params.id as unknown as string);
  }, [navigate, params.id]);

  return packageId;
}
