import { Button, Pagination } from '@mui/material'
import DynamicTable from 'components/DynamicTable'
import styled from 'styled-components'
// Own
import { useAppDispatch } from 'store/index'
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage
} from 'store/customizationSlice'
import BackendError from 'exceptions/backend-error'
import { FunctionComponent, useCallback, useState } from 'react'
import { PaginateData } from 'services/types'
import { IconEdit, IconTrash } from '@tabler/icons'
import { useNavigate } from 'react-router'
import DialogDelete from 'components/dialogDelete'
import { CarRental } from 'types/car-rental'
import deleteCarRental from 'services/car-rentals/delete-car-rental'

const Table: FunctionComponent<Prop> = ({
  items,
  paginate,
  className,
  onChange,
  fetchItems
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [hotelPerNightId, setHotelPerNightId] = useState<string>('')

  const handleOpen = useCallback((carRentalId: string) => {
    setOpen(true)
    setHotelPerNightId(carRentalId)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setHotelPerNightId('')
  }, [])

  const onDelete = useCallback(
    async (carRentalId: string) => {
      try {
        dispatch(setIsLoading(true))
        await deleteCarRental(carRentalId!)
        //navigate('/clients');
        dispatch(setSuccessMessage(`Vehículo eliminado correctamente`))
      } catch (error) {
        if (error instanceof BackendError) {
          dispatch(setErrorMessage(error.getMessage()))
        }
      } finally {
        dispatch(setIsLoading(false))
        handleClose()
        fetchItems()
      }
    },
    [dispatch, fetchItems, handleClose]
  )

  return (
    <div className={className}>
      <DynamicTable
        headers={[
          {
            columnLabel: 'Nombre',
            fieldName: 'serviceName',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Descripción',
            fieldName: 'serviceDescription',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Precio',
            fieldName: 'servicePrice',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Ubicación',
            fieldName: 'serviceLocation',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Marca',
            fieldName: 'carBrand',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Modelo',
            fieldName: 'carModel',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Nro. de asientos',
            fieldName: 'numberOfSeatsInTheCar',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Tipo de Motor',
            fieldName: 'carEngineType',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Fecha de inicio',
            cellAlignment: 'left',
            onRender: (row: CarRental) =>
              new Date(row.serviceTimestamp).toISOString().split('T')[0]
          },
          {
            columnLabel: 'Fecha de finalización',
            cellAlignment: 'left',
            onRender: (row: CarRental) =>
              new Date(row.carReturnTimestamp).toISOString().split('T')[0]
          }
        ]}
        rows={items}
        components={[
          (row: CarRental) => (
            <Button
              color='primary'
              onClick={() => {
                navigate('/car-rentals/edit/' + row.id)
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: CarRental) => (
            <Button
              color='secondary'
              onClick={() => handleOpen(row.id)}
              startIcon={<IconTrash />}
            >
              Eliminar
            </Button>
          )
        ]}
      />
      <DialogDelete
        handleClose={handleClose}
        onDelete={() => {
          onDelete(hotelPerNightId)
        }}
        open={open}
      />

      <div className={'paginator-container'}>
        <Pagination
          count={paginate.pageCount}
          page={paginate.pageIndex}
          variant='outlined'
          shape='rounded'
          color='primary'
          onChange={(event, page) => {
            onChange(page)
          }}
        />
      </div>
    </div>
  )
}

interface Prop {
  items: CarRental[]
  paginate: PaginateData
  className?: string
  onChange: (page: number) => void
  fetchItems: () => void
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
`
