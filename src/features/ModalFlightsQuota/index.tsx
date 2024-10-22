import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
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
import { Notification } from '@/shared'
import IconClose from '@mui/icons-material/Close'

import { useFlightsQuotaMutation } from '@/shared'
import { NumberControl, SelectMotive } from './ui'

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
  quota: Quota
  motive: Motive
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
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const [updatedQuota, setUpdatedQuota] = useState<Quota | null>(null)
  const [motive, setMotive] = useState<Motive | null>(null)
  const quota = updatedQuota ?? initialValue
  const { mutate, isError } = useFlightsQuotaMutation()

  const motiveOptions = getMotiveOptions(initialValue, quota)
  const isSaveButtonActive = quota !== initialValue && !!motive
  const handleQuotaChange = (value: number) => {
    if (value === initialValue) {
      setMotive(null)
    }
    setUpdatedQuota(value)
  }
  const handleClose = () => {
    setUpdatedQuota(null)
    setMotive(null)
    onClose()
  }
  const handleSave = () => {
    if (quota == null || !motive)
      throw new Error('quota and motive are required')
    mutate({ quota, motive })
    handleClose()
  }

  return (
    <>
      {isError && <Notification message="Flights quota update failed" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="test" {...register('quota')} />
        <input {...register('motive')} />
        <input type="submit" />
      </form>
      <Dialog closeAfterTransition={false} open={isOpen} onClose={handleClose}>
        <DialogTitle>Edit flights</DialogTitle>
        <DialogContent>
          <DialogContentText mb={4}>
            Add or remove flights from the subscriber
          </DialogContentText>
          <Stack direction="row" justifyContent="space-between">
            <NumberControl
              min={MIN_QUOTA}
              max={MAX_QUOTA}
              onChange={handleQuotaChange}
              value={quota}
            />
            <SelectMotive
              disabled={quota === initialValue}
              onChange={setMotive}
              options={motiveOptions}
              value={motive}
            />
          </Stack>
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
