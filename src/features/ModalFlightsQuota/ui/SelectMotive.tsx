import {
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  SelectChangeEvent,
} from '@mui/material'

type SelectMotiveProps = {
  disabled: boolean
  onChange: (value: string) => void
  options: string[]
  value?: string | null
}

export function SelectMotive({
  disabled,
  options,
  value,
  onChange,
}: SelectMotiveProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value)
  }

  return (
    <Stack>
      <InputLabel>Motive</InputLabel>
      <Select
        displayEmpty
        disabled={disabled}
        value={value ?? ''}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (!selected) return <em>What is the motive?</em>
          return selected
        }}
      >
        {options?.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  )
}
