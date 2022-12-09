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
import { Chart } from '../../components/Chart'
import { RiskIndexExplanationInfo } from '../../components/RiskIndexExplanationInfo'
import { EntityDetail } from '../../components/EntityDetail'

const columnHelper = createColumnHelper<DayData>()

const colorMapping = (index: number) => {
  if (index <= 3) return 'bg-risk-low'
  if (index <= 6) return 'bg-risk-medium'
  return 'bg-risk-high'
}

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
    header: () => (
      <span className={'flex justify-center items-baseline gap-2'}>
        Index <RiskIndexExplanationInfo />
      </span>
    ),
    cell: (pageData) => (
      <span
        className={`text-white px-1.5 py-0.5 rounded-md ${colorMapping(pageData.getValue())}`}
      >{`${pageData.getValue()}`}</span>
    ),
    sortingFn: (rowA, rowB) => rowA.original.index - rowB.original.index,
  }),
  columnHelper.accessor('transport', {
    header: 'Transport',
    cell: (pageData) => `${pageData.getValue()}`,
  }),
  columnHelper.accessor('accidents', {
    header: 'Accidents',
    cell: (pageData) => `${pageData.getValue()?.length || 0}`,
    sortingFn: (rowA, rowB) => rowA.original.accidents.length - rowB.original.accidents.length,
  }),
]

const HistoryPage: NextPage<{ data: DayData[] }> = ({ data }) => {
  const [filter, setFilter] = useState<IDataFilter | null>(null)
  const [entityDetail, setEntityDetail] = useState<DayData | null>(null)

  const tableData = useMemo<DayData[]>(() => {
    if (!filter) return []
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
            <Table
              columns={columns}
              data={tableData}
              defaultSort={'date'}
              onRowClick={(row) => setEntityDetail(row.original)}
            />
          </Tab.Panel>
          <Tab.Panel as={'div'} className={'max-h-full h-full w-full p-3 pb-4'}>
            <Chart data={tableData} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <EntityDetail open={!!entityDetail} onClose={() => setEntityDetail(null)} dayData={entityDetail} />
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
