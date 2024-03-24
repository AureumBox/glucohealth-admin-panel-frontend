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
import { TrainTicket } from "types/train-ticket";
import deleteTrainTicket from "services/train-tickets/delete-train-ticket";

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
  const [trainTicketId, setTrainTicketId] = useState<string>("");

  const handleOpen = useCallback((trainTicketId: string) => {
    setOpen(true);
    setTrainTicketId(trainTicketId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTrainTicketId("");
  }, []);

  const onDelete = useCallback(
    async (trainTicketId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deleteTrainTicket(trainTicketId!);
        //navigate('/clients');
        dispatch(setSuccessMessage(`Pasaje de Tren eliminado correctamente`));
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
            fieldName: "serviceName",
            cellAlignment: "left",
          },
          {
            columnLabel: "Descripción",
            fieldName: "serviceDescription",
            cellAlignment: "left",
          },
          {
            columnLabel: "Precio",
            fieldName: "servicePrice",
            cellAlignment: "left",
          },
          {
            columnLabel: "Origen",
            fieldName: "serviceLocation",
            cellAlignment: "left",
          },
          {
            columnLabel: "Destino",
            fieldName: "arrivalLocation",
            cellAlignment: "left",
          },
          {
            columnLabel: "Cabina",
            fieldName: "assignedCabinType",
            cellAlignment: "left",
          },
          {
            columnLabel: "Aerolínea",
            fieldName: "airline",
            cellAlignment: "left",
          },
          {
            columnLabel: "Tiene Parada?",
            fieldName: "hasStopOver",
            cellAlignment: "left",
          },
          {
            columnLabel: "Fecha de inicio",
            cellAlignment: "left",
            onRender: (row: TrainTicket) =>
              new Date(row.serviceTimestamp).toISOString().split("T")[0],
          },
          {
            columnLabel: "Fecha de finalización",
            cellAlignment: "left",
            onRender: (row: TrainTicket) =>
              new Date(row.arrivalTimestamp).toISOString().split("T")[0],
          },
        ]}
        rows={items}
        components={[
          (row: TrainTicket) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/train-tickets/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: TrainTicket) => (
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
          onDelete(trainTicketId);
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
  items: TrainTicket[];
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
