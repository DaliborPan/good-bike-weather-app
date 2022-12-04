import { Tab } from '@headlessui/react'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import { GetStaticProps, NextPage } from 'next'
import { useMemo, useState } from 'react'
import { AppNavigation } from '../../components/AppNavigation'
import Table from '../../components/Table'
import { IDataFilter, Toolbar } from '../../components/Toolbar'
import { getHistoryPageData } from '../../services/history'
import { DayData } from '../../types'
import _ from 'lodash'

const columnHelper = createColumnHelper<DayData>()

const columns = [
  columnHelper.accessor('date', {
    header: 'Date',
    cell: (pageData) => moment(pageData.getValue()).format('DD. MM. yyyy'),
    sortingFn: (rowA, rowB) => moment(rowA.original.date).valueOf() - moment(rowB.original.date).valueOf(),
  }),
  columnHelper.accessor('temperature', {
    header: 'Temperature',
    cell: (pageData) => `${pageData.getValue()} °C`,
    sortingFn: (rowA, rowB) => rowA.original.temperature - rowB.original.temperature,
  }),
  columnHelper.accessor('precipitation', {
    header: 'Precipitation',
    cell: (pageData) => `${pageData.getValue()} mm`,
    sortingFn: (rowA, rowB) => rowA.original.precipitation - rowB.original.precipitation,
  }),
  columnHelper.accessor('index', {
    header: 'Index',
    cell: (pageData) => `${pageData.getValue()}`,
    sortingFn: (rowA, rowB) => rowA.original.index - rowB.original.index,
  }),
  columnHelper.accessor('transport', {
    header: 'Transport',
    cell: (pageData) => `${pageData.getValue()}`,
  }),
]

const HistoryPage: NextPage<{ data: DayData[] }> = ({ data }) => {
  const [filter, setFilter] = useState<IDataFilter | null>(null)

  const tableData = useMemo<DayData[]>(() => {
    if (!filter) return data
    return data
      .filter(({ year, month, day }) => moment({ year, month, day }).isAfter(filter.dateFrom))
      .filter(({ year, month, day }) => moment({ year, month, day }).isBefore(filter.dateTo))
      .filter(({ temperature }) => _.inRange(temperature, filter.temperatureRange[0], filter.temperatureRange[1]))
      .filter(({ precipitation }) =>
        _.inRange(precipitation, filter.precipitationRange[0], filter.precipitationRange[1])
      )
      .filter(({ index }) => _.inRange(index, filter.riskIndexRange[0], filter.riskIndexRange[1]))
      .filter(({ transport }) => filter.transport.includes(transport))
  }, [filter, data])

  return (
    <div className="flex flex-col absolute top-0 bottom-0 left-0 right-0 app-bg items-center gap-5 pb-8">
      <AppNavigation />
      <Toolbar className="w-11/12 shrink-0" onChange={setFilter} />
      <Tab.Group as="div" className={'grow flex flex-col bg-light-green rounded-lg w-11/12 overflow-hidden'}>
        <Tab.List as="div" className={'h-12 w-full text-lg shrink-0 flex'}>
          <Tab className={({ selected }) => `basis-1/2 transition-all ${selected ? '' : 'bg-whiskey text-white'}`}>
            Table
          </Tab>
          <Tab className={({ selected }) => `basis-1/2 transition-all ${selected ? '' : 'bg-whiskey text-white'}`}>
            Chart
          </Tab>
        </Tab.List>

        <Tab.Panels className={'grow overflow-hidden'}>
          <Tab.Panel as={'div'} className={'max-h-full h-full p-3 pb-4'}>
            <Table columns={columns} data={tableData} defaultSort={'date'} />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: await getHistoryPageData(),
    },
  }
}
export default HistoryPage
