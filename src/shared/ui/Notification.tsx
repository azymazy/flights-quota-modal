import { Alert, Snackbar, AlertProps } from '@mui/material'
import { useIsOpen } from '@/shared'

type NotificationProps = {
  message: string
  severity?: AlertProps['severity']
}

export function Notification({
  message,
  severity = 'error',
}: NotificationProps) {
  const { isOpen, onClose } = useIsOpen(true)

  return (
    <Snackbar
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={onClose}
      open={isOpen}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  )
}
