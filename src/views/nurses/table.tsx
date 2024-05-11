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
import deleteNurse from "services/nurses/delete-nurse";
import DialogDelete from "components/dialogDelete";
import { Nurse } from "types/nurse";

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
  const [nurseId, setNurseId] = useState<string>("");

  const handleOpen = useCallback((nurseId: string) => {
    setOpen(true);
    setNurseId(nurseId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setNurseId("");
  }, []);

  const onDelete = useCallback(
    async (nurseId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deleteNurse(nurseId!);
        //navigate('/nurses');
        dispatch(setSuccessMessage(`Enfermero eliminado correctamente`));
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
        ]}
        rows={items}
        components={[
          (row: Nurse) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/nurses/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Nurse) => (
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
          onDelete(nurseId);
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
  items: Nurse[];
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
