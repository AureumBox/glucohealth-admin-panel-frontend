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
import { BusTicket } from "types/bus-ticket";
import deleteBusTicket from "services/bus-tickets/delete-bus-ticket";

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
  const [busTicketId, setBusTicketId] = useState<string>("");

  const handleOpen = useCallback((busTicketId: string) => {
    setOpen(true);
    setBusTicketId(busTicketId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setBusTicketId("");
  }, []);

  const onDelete = useCallback(
    async (busTicketId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deleteBusTicket(busTicketId!);
        //navigate('/clients');
        dispatch(
          setSuccessMessage(`Ticket de Autobus eliminado correctamente`)
        );
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
            columnLabel: "Asiento Asignado",
            fieldName: "assignedBusSeat",
            cellAlignment: "left",
          },
          {
            columnLabel: "Tipo de Asiento",
            fieldName: "busSeatType",
            cellAlignment: "left",
          },
          {
            columnLabel: "Compañía",
            fieldName: "busOperatingCompany",
            cellAlignment: "left",
          },
          {
            columnLabel: "Fecha de inicio",
            cellAlignment: "left",
            onRender: (row: BusTicket) =>
              new Date(row.serviceTimestamp).toISOString().split("T")[0],
          },
          {
            columnLabel: "Fecha de finalización",
            cellAlignment: "left",
            onRender: (row: BusTicket) =>
              new Date(row.arrivalTimestamp).toISOString().split("T")[0],
          },
        ]}
        rows={items}
        components={[
          (row: BusTicket) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/bus-tickets/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: BusTicket) => (
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
          onDelete(busTicketId);
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
  items: BusTicket[];
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
