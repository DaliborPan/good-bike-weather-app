import { FC, useEffect, useState } from 'react'
import { Slider, Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment, { Moment } from 'moment'
import useDebounce from '../hooks/useDebounce'

export interface IDataFilter {
  dateFrom?: Moment
  dateTo?: Moment
  temperatureRange: [number, number]
  precipitationRange: [number, number]
  riskIndexRange: [number, number]
  transport: string[]
}

interface IProps {
  className?: string
  onChange?: (filter: IDataFilter) => void
}

export const Toolbar: FC<IProps> = ({ className, onChange }) => {
  const [dateFrom, setDateFrom] = useState<Moment>(moment().subtract({ years: 30, months: 1 }))
  const [dateTo, setDateTo] = useState<Moment>(moment().subtract({ years: 30 }).add({ weeks: 2 }))
  const [temperatureRange, setTemperatureRange] = useState<[number, number]>([-20, 50])
  const [precipitationRange, setPrecipitationRange] = useState<[number, number]>([0, 100])
  const [riskIndexRange, setRiskIndexRange] = useState<[number, number]>([0, 10])
  const [transport, setTransport] = useState<string[]>(['BIKE', 'CAR'])

  const debouncedTemperature = useDebounce(temperatureRange, 500)
  const debouncedPrecipitation = useDebounce(precipitationRange, 500)
  const debouncedRiskIndex = useDebounce(riskIndexRange, 500)

  useEffect(() => {
    if (!onChange) return
    onChange({
      dateFrom,
      dateTo,
      temperatureRange: debouncedTemperature,
      precipitationRange: debouncedPrecipitation,
      riskIndexRange: debouncedRiskIndex,
      transport,
    })
  }, [onChange, dateFrom, dateTo, debouncedTemperature, debouncedPrecipitation, debouncedRiskIndex, transport])

  return (
    <div
      className={`bg-light-green rounded-lg h-16 flex justify-center items-center gap-4 px-5 ${
        className ? className : ''
      }`}
    >
      <DatePicker
        className={'basis-40'}
        label="Date from"
        value={dateFrom}
        onChange={(val) => {
          setDateFrom(val as Moment)
        }}
        renderInput={(params) => <TextField {...params} variant={'standard'} />}
      />
      <DatePicker
        label="Date to"
        className={'basis-40'}
        value={dateTo}
        onChange={(val) => {
          setDateTo(val as Moment)
        }}
        renderInput={(params) => <TextField {...params} variant={'standard'} />}
      />
      <Box className={'basis-1/8 grow px-5 h-12'}>
        <InputLabel variant="standard" shrink>
          Temperature
        </InputLabel>
        <Slider
          value={temperatureRange}
          onChange={(_, val) => setTemperatureRange(val as [number, number])}
          min={-20}
          max={50}
          step={1}
          size={'small'}
          valueLabelDisplay="auto"
          getAriaValueText={(val) => `${val} °C`}
          marks={[
            { value: -20, label: '-20 °C' },
            { value: 50, label: '50 °C' },
          ]}
        />
      </Box>

      <Box className={'basis-1/8 grow px-5 h-12'}>
        <InputLabel variant="standard" shrink>
          Precipitation
        </InputLabel>
        <Slider
          value={precipitationRange}
          onChange={(_, val) => setPrecipitationRange(val as [number, number])}
          min={0}
          max={100}
          step={1}
          size={'small'}
          valueLabelDisplay="auto"
          getAriaValueText={(val) => `${val} mm`}
          marks={[
            { value: 0, label: '0 mm' },
            { value: 100, label: '100 mm' },
          ]}
        />
      </Box>

      <Box className={'basis-1/8 grow px-5 h-12'}>
        <InputLabel variant="standard" shrink>
          Risk index
        </InputLabel>
        <Slider
          value={riskIndexRange}
          className={'w-full'}
          onChange={(_, val) => setRiskIndexRange(val as [number, number])}
          min={0}
          max={10}
          step={1}
          size={'small'}
          valueLabelDisplay="auto"
          marks={[
            { value: 0, label: '0' },
            { value: 10, label: '10' },
          ]}
        />
      </Box>

      <FormControl variant="standard" className={'basis-40 h-12'}>
        <InputLabel shrink>Transport</InputLabel>
        <Select
          variant="standard"
          label={'Transport'}
          value={transport}
          multiple
          onChange={(e) =>
            setTransport(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
          }
        >
          <MenuItem value={'BIKE'}>Bike</MenuItem>
          <MenuItem value={'CAR'}>Car</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
