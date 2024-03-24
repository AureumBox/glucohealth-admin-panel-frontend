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
import deleteCustomer from "services/customers/delete-customer";
import DialogDelete from "components/dialogDelete";
import { Employee } from "types/employee";
import { occupationsWithLabel } from "core/occupations/use-occupations-options";

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
  const [employeeId, setEmployeeId] = useState<string>("");

  const handleOpen = useCallback((employeeId: string) => {
    setOpen(true);
    setEmployeeId(employeeId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setEmployeeId("");
  }, []);

  const onDelete = useCallback(
    async (employeeId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deleteCustomer(employeeId!);
        //navigate('/customers');
        dispatch(setSuccessMessage(`Empleado eliminado correctamente`));
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
            columnLabel: "Salario",
            cellAlignment: "left",
            onRender: (row: Employee) => `$ ${row.salary}`,
          },
          {
            columnLabel: "Cargo",
            cellAlignment: "left",
            onRender: (row: Employee) =>
              row.occupations
                .map((o) => occupationsWithLabel[o.occupationName])
                .join(", "),
          },
          {
            columnLabel: "Fecha de nacimiento",
            cellAlignment: "left",
            onRender: (row: Employee) => {
              return new Date(row.birthdate).toISOString().split("T")[0];
            },
          },
        ]}
        rows={items}
        components={[
          (row: Employee) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/staff/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Employee) => (
            <Button
              color="error"
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
          onDelete(employeeId);
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
  items: Employee[];
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
