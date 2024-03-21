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
import { Tour } from 'types/tour'
import deleteTour from 'services/tours/delete-tour'

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
  const [tourId, setTourId] = useState<string>('')

  const handleOpen = useCallback((tourId: string) => {
    setOpen(true)
    setTourId(tourId)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setTourId('')
  }, [])

  const onDelete = useCallback(
    async (tourId: string) => {
      try {
        dispatch(setIsLoading(true))
        await deleteTour(tourId!)
        //navigate('/clients');
        dispatch(setSuccessMessage(`Pasaje de Tren eliminado correctamente`))
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
            columnLabel: 'Tipo de Excursión',
            fieldName: 'tourType',
            cellAlignment: 'left'
          },
          {
            columnLabel: 'Fecha de inicio',
            cellAlignment: 'left',
            onRender: (row: Tour) =>
              new Date(row.serviceTimestamp).toISOString().split('T')[0]
          },
          {
            columnLabel: 'Fecha de finalización',
            cellAlignment: 'left',
            onRender: (row: Tour) =>
              new Date(row.endOfTourTimestamp).toISOString().split('T')[0]
          }
        ]}
        rows={items}
        components={[
          (row: Tour) => (
            <Button
              color='primary'
              onClick={() => {
                navigate('/tours/edit/' + row.id)
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Tour) => (
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
          onDelete(tourId)
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
  items: Tour[]
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
