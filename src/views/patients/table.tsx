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
import deletePatient from "services/patients/delete-patient";
import DialogDelete from "components/dialogDelete";
import { Patient } from "types/patient";

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
  const [patientId, setPatientId] = useState<string>("");

  const handleOpen = useCallback((patientId: string) => {
    setOpen(true);
    setPatientId(patientId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setPatientId("");
  }, []);

  const onDelete = useCallback(
    async (patientId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deletePatient(patientId!);
        //navigate('/patients');
        dispatch(setSuccessMessage(`Paciente eliminado correctamente`));
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
            columnLabel: "ID",
            fieldName: "id",
            cellAlignment: "left",
          },
          {
            columnLabel: "Nombre completo",
            fieldName: "fullName",
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
            columnLabel: "NUI",
            fieldName: "nationalId",
            cellAlignment: "left",
          },
          {
            columnLabel: "Edad",
            fieldName: "age",
            cellAlignment: "left",
          },
          {
            columnLabel: "Peso en kg",
            fieldName: "weightInKg",
            cellAlignment: "left",
          },
          {
            columnLabel: "Altura en cm",
            fieldName: "heightInCm",
            cellAlignment: "left",
          },
        ]}
        rows={items}
        components={[
          (row: Patient) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/patients/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Patient) => (
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
          onDelete(patientId);
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
  items: Patient[];
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
