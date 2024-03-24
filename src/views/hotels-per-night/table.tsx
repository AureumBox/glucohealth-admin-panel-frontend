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
import { HotelPerNight } from "types/hotel-per-night";
import deleteHotelPerNight from "services/hotels-per-night/delete-hotel-per-night";

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
  const [hotelPerNightId, setHotelPerNightId] = useState<string>("");

  const handleOpen = useCallback((hotelPerNightId: string) => {
    setOpen(true);
    setHotelPerNightId(hotelPerNightId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setHotelPerNightId("");
  }, []);

  const onDelete = useCallback(
    async (hotelPerNightId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deleteHotelPerNight(hotelPerNightId!);
        //navigate('/clients');
        dispatch(setSuccessMessage(`Hotel eliminado correctamente`));
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
            columnLabel: "Ubicación",
            fieldName: "serviceLocation",
            cellAlignment: "left",
          },
          {
            columnLabel: "Precio",
            fieldName: "servicePrice",
            cellAlignment: "left",
          },
          {
            columnLabel: "Nro. de noches",
            fieldName: "numberOfNights",
            cellAlignment: "left",
          },
          {
            columnLabel: "Nro. de estrellas",
            fieldName: "numberOfStars",
            cellAlignment: "left",
          },
          {
            columnLabel: "Nro. de estrellas",
            fieldName: "numberOfRooms",
            cellAlignment: "left",
          },
          {
            columnLabel: "Personas por habitación",
            fieldName: "allowedNumberOfPeoplePerRoom",
            cellAlignment: "left",
          },
          {
            columnLabel: "Fecha de entrada",
            cellAlignment: "left",
            onRender: (row: HotelPerNight) =>
              new Date(row.serviceTimestamp).toISOString().split("T")[0],
          },
          {
            columnLabel: "Fecha de salida",
            cellAlignment: "left",
            onRender: (row: HotelPerNight) =>
              new Date(row.checkoutTimestamp).toISOString().split("T")[0],
          },
        ]}
        rows={items}
        components={[
          (row: HotelPerNight) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/hotels-per-night/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: HotelPerNight) => (
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
          onDelete(hotelPerNightId);
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
  items: HotelPerNight[];
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
