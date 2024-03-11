import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import { Package } from "types/package";
import getPackage from "services/packages/get-package";

export default function usePackageById(packageId: string | null) {
  const dispatch = useAppDispatch();
  const [domainPackage, setDomainPackage] = useState<Package | null>(null);

  const fetchPackage = useCallback(
    async (id: string) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getPackage(id);
        console.log(response);
        setDomainPackage(response);
      } catch (error) {
        if (error instanceof BackendError)
          dispatch(setErrorMessage(error.getMessage()));
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (packageId) fetchPackage(packageId);
  }, [fetchPackage, packageId]);

  return domainPackage;
}
