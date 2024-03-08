import { Button, Pagination } from "@mui/material";
import DynamicTable from "components/DynamicTable";
import { Customer } from "core/customers/types";
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
import deleteCustomer from "services/customers/delete-customer";
import DialogDelete from "components/dialogDelete";

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
  const [customerId, setCustomerId] = useState<string>("");

  const handleOpen = useCallback((customerId: string) => {
    setOpen(true);
    setCustomerId(customerId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setCustomerId("");
  }, []);

  const onDelete = useCallback(
    async (customerId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deleteCustomer(customerId!);
        //navigate('/clients');
        dispatch(setSuccessMessage(`Cliente eliminado correctamente`));
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
            columnLabel: "DNI",
            fieldName: "dni",
            cellAlignment: "left",
          },
          {
            columnLabel: "Nombre",
            fieldName: "firstName",
            cellAlignment: "left",
          },
          {
            columnLabel: "Apellido",
            fieldName: "lastName",
            cellAlignment: "left",
          },
          {
            columnLabel: "Correo electrónico",
            fieldName: "email",
            cellAlignment: "left",
          },
          {
            columnLabel: "Número telefónico",
            fieldName: "phoneNumber",
            cellAlignment: "left",
          },
          {
            columnLabel: "Nacionalidad",
            fieldName: "citizenship",
            cellAlignment: "left",
          },
          {
            columnLabel: "Dirección",
            fieldName: "address",
            cellAlignment: "left",
          },
          {
            columnLabel: "Fecha de nacimiento",
            cellAlignment: "left",
            onRender: (row: Customer) => {
              return new Date(row.birthdate).toISOString().split("T")[0];
            },
          },
        ]}
        rows={items}
        components={[
          (row: Customer) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/clients/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Customer) => (
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
          onDelete(customerId);
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
  items: Customer[];
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
