import { Button, Pagination } from '@mui/material';
import DynamicTable from 'components/DynamicTable';
import styled from 'styled-components';
// Own
import { useAppDispatch } from 'store/index';
import { setIsLoading, setSuccessMessage, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';
import { FunctionComponent, useCallback, useState } from 'react';
import { PaginateData } from 'services/types';
import { IconEdit, IconTrash, IconEye } from '@tabler/icons';
import { useNavigate } from 'react-router';
import deleteOrder from 'services/old-orders/delete-order';
import DialogDelete from 'components/dialogDelete';
import { Order } from 'core/orders/types';

const Table: FunctionComponent<Prop> = ({ items, paginate, className, onChange, fetchItems }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false)
    const [orderId, setBookingId] = useState<number>(0)

    const handleOpen = (orderId: number) => {
        setOpen(true);
        setBookingId(orderId); 
    }

    const handleClose = () => {
        setOpen(false);
        setBookingId(0); 
    }

    const onDelete = useCallback(async (orderId: number) => {
        try {
            dispatch(setIsLoading(true));
            await deleteOrder(orderId!);
            //navigate('/orders');
            dispatch(setSuccessMessage(`Reserva eliminada correctamente`));
        } catch (error) {
            if (error instanceof BackendError) {
                dispatch(setErrorMessage(error.getMessage()));
            }
        } finally {
            dispatch(setIsLoading(false));
            handleClose();
            fetchItems();
        }
      }, [dispatch, fetchItems]);

    return (
        <div className={className}>
            <DynamicTable
                headers={[
                    { columnLabel: 'Id', fieldName: 'orderId', cellAlignment: 'left' },
                    { columnLabel: 'Analista', fieldName: 'employeeDni', cellAlignment: 'left' },
                    { columnLabel: 'Entrada', fieldName: 'entryTime', cellAlignment: 'left' },
                    { columnLabel: 'Salida estimada', fieldName: 'estimatedDeparture', cellAlignment: 'left' },
                    { columnLabel: 'Salida real', fieldName: 'realDeparture', cellAlignment: 'left' },
                ]}
                rows={items} components={[
                    (row: Order) =>
                        <Button
                            color="primary"
                            onClick={() => { navigate('/orders/edit/'+row.orderId) }}
                            startIcon={<IconEdit />}
                        >
                            Editar
                        </Button>,
                    (row: Order) =>
                    <Button
                        color="secondary"
                        onClick={() => { navigate('/orders/detail/'+row.orderId) }}
                        startIcon={<IconEye />}
                    >
                        Detalle
                    </Button>,
                    (row: Order) =>
                        <Button 
                            color="secondary" 
                            onClick={ () => handleOpen(row.orderId) }
                            startIcon={<IconTrash />}
                        >
                            Eliminar
                        </Button>
                ]}
            />
            <DialogDelete 
                handleClose={handleClose} 
                onDelete={() => { onDelete(orderId) }} 
                open={open}
            />

            <div className={'paginator-container'}>
              <Pagination
                  count={paginate.pageCount}
                  page={paginate.pageIndex}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  onChange={(event, page) => { onChange(page) }}
              />
          </div>
        </div>
    );
}

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
