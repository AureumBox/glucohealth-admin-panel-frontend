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
import deleteOrder from "services/customers/delete-customer";
import DialogDelete from "components/dialogDelete";
import { Order } from "types/order";

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
  const [orderId, setOrderId] = useState<string>("");

  const handleOpen = useCallback((orderId: string) => {
    setOpen(true);
    setOrderId(orderId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setOrderId("");
  }, []);

  const onDelete = useCallback(
    async (orderId: string) => {
      try {
        dispatch(setIsLoading(true));
        await deleteOrder(orderId!);
        //navigate('/customers');
        dispatch(setSuccessMessage(`Orden eliminada correctamente`));
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

  /* export interface Order {
    id: string;
    orderedPackages: OrderedPackage[];
    orderedServices: OrderedService[];
    price: number;
    payments: Payment[];
    customerId: string;
    salespersonId: string;
    placementTimestamp: Date;
  } */

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
            columnLabel: "Paquetes ordenados",
            cellAlignment: "left",
            onRender: (row: Order) =>
              row.orderedPackages
                .map((op) => `${op.packageSnapshot.name} (${op.amountOrdered})`)
                .join(", "),
          },
          {
            columnLabel: "Servicios ordenados",
            onRender: (row: Order) =>
              row.orderedServices
                .map(
                  (op) =>
                    `${op.serviceSnapshot.serviceName} (${op.amountOrdered})`
                )
                .join(", "),
          },
          {
            columnLabel: "Precio",
            onRender: (row: Order) => `$${row.price.toFixed(2)}`,
          },
          {
            columnLabel: "Pagos",
            fieldName: "payments",
            cellAlignment: "left",
          },
          {
            columnLabel: "ID del cliente",
            fieldName: "customerId",
            cellAlignment: "left",
          },
          {
            columnLabel: "ID del vendedor",
            fieldName: "salespersonId",
            cellAlignment: "left",
          },
          {
            columnLabel: "Fecha de colocación",
            onRender: (row: Order) =>
              new Date(row.placementTimestamp).toISOString().split("T")[0],
          },
        ]}
        rows={items}
        components={[
          (row: Order) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/orders/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Order) => (
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
          onDelete(orderId);
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
  items: Order[];
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
