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

  return (
    <div className={className}>
      <DynamicTable
        headers={[
          {
            columnLabel: "DNI",
            fieldName: "dni",
            cellAlignment: "left",
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
