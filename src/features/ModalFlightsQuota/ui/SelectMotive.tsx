import {
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from '@mui/material'

export function SelectMotive({ disabled, options, value, onChange }) {
  const handleChange = (event) => {
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
