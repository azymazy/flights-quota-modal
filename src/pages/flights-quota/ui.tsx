import { useFlightsQuotaQuery } from '../../shared/api'
import { Button, Stack, Typography } from '@mui/material'
import IconEdit from '@mui/icons-material/Edit'
import { useIsOpen } from '@/shared'
import { ModalFlightsQuota } from '@/features'

export function PageFlightsQuota() {
  const { data: quota, isPending } = useFlightsQuotaQuery()
  const { isOpen, onClose, onOpen } = useIsOpen()

  if (isPending) return 'Loading...'
  if (quota == null) return 'There is no quota'

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <Stack direction="row" alignItems="center" gap={2}>
        <Typography>Flights Quota: {quota}</Typography>
        <Button variant="contained" onClick={onOpen} startIcon={<IconEdit />}>
          Edit flights
        </Button>
      </Stack>
      <ModalFlightsQuota
        onClose={onClose}
        initialValue={quota}
        isOpen={isOpen}
      />
    </Stack>
  )
}
