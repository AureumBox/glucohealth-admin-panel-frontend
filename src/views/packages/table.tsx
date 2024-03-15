import { Button, Pagination } from "@mui/material";
import DynamicTable from "components/DynamicTable";
import styled from "styled-components";
// Own
import { useAppDispatch } from "store/index";
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage,
} from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import { FunctionComponent, useCallback, useState } from "react";
import { PaginateData } from "services/types";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router";
import DialogDelete from "components/dialogDelete";
import { Package } from "types/package";
import deletePackage from "services/packages/delete-package";

const Table: FunctionComponent<Prop> = ({
  items,
  paginate,
  className,
  onChange,
  fetchItems,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [packageId, setPackageId] = useState<string>("");

  const handleOpen = useCallback((packageId: string) => {
    setOpen(true);
    setPackageId(packageId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setPackageId("");
  }, []);

  const onDelete = useCallback(
    async (packageId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deletePackage(packageId!);
        dispatch(setSuccessMessage(`Paquete eliminado correctamente`));
      } catch (error) {
        if (error instanceof BackendError) {
          dispatch(setErrorMessage(error.getMessage()));
        }
      } finally {
        dispatch(setIsLoading(false));
        handleClose();
        fetchItems();
      }
    },
    [dispatch, fetchItems, handleClose]
  );

  return (
    <div className={className}>
      <DynamicTable
        headers={[
          {
            columnLabel: "Nombre",
            fieldName: "name",
            cellAlignment: "left",
          },
          {
            columnLabel: "Descripción",
            fieldName: "description",
            cellAlignment: "left",
          },
          {
            columnLabel: "Descuento",
            fieldName: "appliedDiscountPercentage",
            cellAlignment: "left",
          },
          {
            columnLabel: "Servicios",
            cellAlignment: "left",
            onRender: (row) => {
              return row.containedServices
                .map(
                  (s: any) => `${s.service.serviceName} (${s.amountContained})`
                )
                .join(", ");
            },
          },
          {
            columnLabel: "Precio",
            fieldName: "price",
            cellAlignment: "left",
          },
        ]}
        rows={items}
        components={[
          (row: Package) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/packages/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Package) => (
            <Button
              color="secondary"
              onClick={() => handleOpen(row.id)}
              startIcon={<IconTrash />}
            >
              Eliminar
            </Button>
          ),
        ]}
      />
      <DialogDelete
        handleClose={handleClose}
        onDelete={() => {
          onDelete(packageId);
        }}
        open={open}
      />

      <div className={"paginator-container"}>
        <Pagination
          count={paginate.pageCount}
          page={paginate.pageIndex}
          variant="outlined"
          shape="rounded"
          color="primary"
          onChange={(event, page) => {
            onChange(page);
          }}
        />
      </div>
    </div>
  );
};

interface Prop {
  items: Package[];
  paginate: PaginateData;
  className?: string;
  onChange: (page: number) => void;
  fetchItems: () => void;
}

export default styled(Table)`
  display: flex;
  flex-direction: column;

  .paginator-container {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`;
