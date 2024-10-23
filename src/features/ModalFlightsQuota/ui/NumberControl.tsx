import { IconButton, InputLabel, Stack, Typography } from '@mui/material'
import IconAdd from '@mui/icons-material/Add'
import IconRemove from '@mui/icons-material/Remove'

type NumberControlProps = {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}

export function NumberControl({
  min,
  max,
  value,
  onChange,
}: NumberControlProps) {
  if (min > max) throw 'min must be less than max'
  if (value < min || value > max) throw 'value must be in min/max range'

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <Stack>
      <InputLabel>Flights Left</InputLabel>
      <Stack direction="row" py={1}>
        <IconButton
          aria-label="decrement"
          disabled={value <= min}
          onClick={handleDecrement}
        >
          <IconRemove />
        </IconButton>
        <Typography sx={{ p: 1, placeContent: 'center', userSelect: 'none' }}>
          {value}
        </Typography>
        <IconButton
          aria-label="increment"
          disabled={value >= max}
          onClick={handleIncrement}
        >
          <IconAdd />
        </IconButton>
      </Stack>
    </Stack>
  )
}
