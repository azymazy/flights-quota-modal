import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
import IconClose from '@mui/icons-material/Close'

import { useFlightsQuotaMutation } from '@/shared'
import { Notifications, NumberControl, SelectMotive } from './ui'

const MIN_QUOTA = 0
const MAX_QUOTA = 3
const QUOTA_INCREASING_MOTIVES = [
  'Subscriber canceled flight',
  'Airline canceled flight',
  'Customer compensation',
  'Other',
]
const QUOTA_DECREASING_MOTIVES = [
  'Flight not redeposited after a flight cancellation',
  'Subscriber had log in or password issues',
  'Subscriber had issues when booking',
  'Subscription has not renewed correctly',
  'Other',
]

const IconCloseStyles = (theme: Theme) => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: theme.palette.grey[500],
})

type Motive = string
type Quota = number
type ModalFlightsQuotaProps = {
  initialValue: Quota
  isOpen: boolean
  onClose: () => void
}
type Inputs = {
  motive: Motive
  quota: Quota
}

const getMotiveOptions = (initialValue: Quota, value: Quota): Motive[] => {
  if (value > initialValue) return QUOTA_INCREASING_MOTIVES
  if (value < initialValue) return QUOTA_DECREASING_MOTIVES

  return []
}

export function ModalFlightsQuota({
  initialValue,
  isOpen,
  onClose,
}: ModalFlightsQuotaProps) {
  const { control, reset, setValue, watch } = useForm<Inputs>({
    values: {
      motive: '',
      quota: initialValue,
    },
  })
  const { mutate, isError, isSuccess } = useFlightsQuotaMutation()
  const motive = watch('motive')
  const quota = watch('quota')
  const motiveOptions = getMotiveOptions(initialValue, quota)
  const isSaveButtonActive = quota !== initialValue && !!motive
  const handleClose = () => {
    reset()
    onClose()
  }
  const handleSave = () => {
    mutate({ quota, motive })
    handleClose()
  }

  return (
    <>
      <Notifications isError={isError} isSuccess={isSuccess} />
      <Dialog closeAfterTransition={false} open={isOpen} onClose={handleClose}>
        <DialogTitle>Edit flights</DialogTitle>
        <DialogContent>
          <DialogContentText mb={4}>
            Add or remove flights from the subscriber
          </DialogContentText>
          <form>
            <Stack direction="row" gap={1} justifyContent="space-between">
              <Controller
                name="quota"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <NumberControl
                    min={MIN_QUOTA}
                    max={MAX_QUOTA}
                    onChange={(value) => {
                      if (value === initialValue) setValue('motive', '')
                      onChange(value)
                    }}
                    value={value}
                  />
                )}
              />
              <Controller
                name="motive"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectMotive
                    disabled={quota === initialValue}
                    onChange={onChange}
                    options={motiveOptions}
                    value={value}
                  />
                )}
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!isSaveButtonActive}
            onClick={handleSave}
            variant="contained"
          >
            SAVE CHANGES
          </Button>
        </DialogActions>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={IconCloseStyles}
        >
          <IconClose />
        </IconButton>
      </Dialog>
    </>
  )
}
