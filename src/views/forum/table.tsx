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
import deleteMedicament from "services/medicaments/delete-medicament";
import DialogDelete from "components/dialogDelete";
import { Medicament } from "types/medicament";

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
  const [medicamentId, setMedicamentId] = useState<string>("");

  const handleOpen = useCallback((medicamentId: string) => {
    setOpen(true);
    setMedicamentId(medicamentId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setMedicamentId("");
  }, []);

  const onDelete = useCallback(
    async (medicamentId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deleteMedicament(medicamentId!);
        //navigate('/medicaments');
        dispatch(setSuccessMessage(`Medicamento eliminado correctamente`));
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
            columnLabel: "Nombre",
            fieldName: "tradeName",
            cellAlignment: "left",
          },       
          {
            columnLabel: "Descripción",
            fieldName: "description",
            cellAlignment: "left",
          },
        ]}
        rows={items}
        components={[
          (row: Medicament) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/medicaments/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Medicament) => (
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
          onDelete(medicamentId);
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
  items: Medicament[];
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
