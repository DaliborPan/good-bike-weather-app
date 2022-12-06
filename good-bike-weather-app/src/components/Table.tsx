import { Pagination } from '@mui/material'
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'

interface IProps<T extends object> {
  className?: string
  columns: ColumnDef<T, any>[]
  data: T[]
  defaultSort?: string
}

const Table: <T extends object>(p: IProps<T>) => React.ReactElement<IProps<T>> = ({
  className,
  columns,
  data,
  defaultSort,
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
    <div className={`app-table ${className || ''}`}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: `flex items-center justify-center ${
                          header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                        }`,
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-10 bg-light-green sticky bottom-0 flex justify-end items-center">
        <Pagination size={'small'} count={table.getPageCount()} onChange={(e, page) => table.setPageIndex(page - 1)} />
      </div>
    </div>
  )
}

export default Table
