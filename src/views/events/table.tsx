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
import { Event } from "types/event";
import deleteEvent from "services/events/delete-event";

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
  const [eventId, setEventId] = useState<string>("");

  const handleOpen = useCallback((eventId: string) => {
    setOpen(true);
    setEventId(eventId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setEventId("");
  }, []);

  const onDelete = useCallback(
    async (eventId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deleteEvent(eventId!);
        //navigate('/clients');
        dispatch(setSuccessMessage(`Excursión eliminada correctamente`));
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
            columnLabel: "Ubicación",
            fieldName: "serviceLocation",
            cellAlignment: "left",
          },
          {
            columnLabel: "Tipo de Evento",
            fieldName: "eventType",
            cellAlignment: "left",
          },
          {
            columnLabel: "Fecha de inicio",
            cellAlignment: "left",
            onRender: (row: Event) =>
              new Date(row.serviceTimestamp).toISOString().split("T")[0],
          },
          {
            columnLabel: "Fecha de finalización",
            cellAlignment: "left",
            onRender: (row: Event) =>
              new Date(row.endOfEventTimestamp).toISOString().split("T")[0],
          },
        ]}
        rows={items}
        components={[
          (row: Event) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/events/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Event) => (
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
          onDelete(eventId);
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
  items: Event[];
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
