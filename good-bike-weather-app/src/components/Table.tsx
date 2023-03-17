import { Pagination } from '@mui/material'
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { DayData } from 'types'

type Props<T extends object> = {
  className?: string
  columns: ColumnDef<T, any>[]
  data: T[]
  defaultSort?: string
  onRowClick?: (row: Row<T>) => void
}

export const Table: <T extends DayData>(props: Props<T>) => React.ReactElement<Props<T>> = ({
  className = '',
  columns,
  data,
  defaultSort,
  onRowClick,
}) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: defaultSort ? [{ id: defaultSort, desc: false }] : undefined,
      pagination: {
        pageSize: 20,
      },
    },
  })

  return (
    <div className={clsx('app-table', className)}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: clsx(
                          'flex items-center justify-center',
                          header.column.getCanSort() && 'cursor-pointer select-none'
                        ),
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <span className="ml-2 text-xs">&#9650;</span>,
                        desc: <span className="ml-2 text-xs">&#9660;</span>,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => {
                onRowClick && onRowClick(row)
              }}
              className="cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => {
                return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-10 bg-light-green sticky bottom-0 flex justify-end items-center">
        <Pagination size="small" count={table.getPageCount()} onChange={(e, page) => table.setPageIndex(page - 1)} />
      </div>
    </div>
  )
}
