import moment from 'moment'
import { FC, useMemo } from 'react'
import { VictoryChart, VictoryAxis, VictoryBar, VictoryLine, VictoryTheme } from 'victory'
import { DayData } from '../types'

interface IProps {
  className?: string
  data: DayData[]
}

type Coords = {
  x: string
  y: number
}[]

const useChartData = (data: DayData[], dayDataKey: Extract<keyof DayData, 'temperature' | 'precipitation'>) => {
  return useMemo<Coords>(() => {
    if (!data) return []

    return data.map((d) => ({ x: moment(d.date).format('DD. MM. yyyy'), y: d[dayDataKey] }))
  }, [data, dayDataKey])
}

export const Chart: FC<IProps> = ({ className, data }) => {
  const tempData = useChartData(data, 'temperature')
  const precData = useChartData(data, 'precipitation')

  return (
    <div className={`w-full min-w-full h-full ${className ? className : ''}`}>
      <VictoryChart theme={VictoryTheme.material} width={900} height={350}>
        <VictoryAxis
          tickCount={15}
          style={{
            tickLabels: { padding: 10, fontSize: 8, angle: -20 },
            grid: { stroke: '#00000015' },
            axis: { stroke: '#00000045' },
          }}
        />

        <VictoryAxis
          tickCount={10}
          style={{ tickLabels: { fontSize: 10 }, grid: { stroke: '#00000015' }, axis: { stroke: '#00000045' } }}
          tickFormat={(tick) => `${tick} °C`}
          dependentAxis
        />

        <VictoryAxis
          tickCount={10}
          style={{ tickLabels: { fontSize: 10 }, grid: { stroke: '#00000015' }, axis: { stroke: '#00000045' } }}
          dependentAxis
          tickFormat={(tick) => `${tick} mm`}
          orientation="right"
        />

        <VictoryBar
          style={{ data: { fill: '#0077B6', width: 12 } }}
          data={precData}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
        />

        <VictoryLine
          style={{ data: { stroke: '#BC6C25', fill: '#00000000' } }}
          data={tempData}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          standalone={false}
        />
      </VictoryChart>
    </div>
  )
}
