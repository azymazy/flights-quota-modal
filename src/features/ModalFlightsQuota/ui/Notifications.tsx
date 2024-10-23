import { Notification } from '@/shared'

type NotificationsProps = {
  isError: boolean
  isSuccess: boolean
}

export function Notifications({ isError, isSuccess }: NotificationsProps) {
  return (
    <>
      {isError && <Notification message="Flights quota update failed" />}
      {isSuccess && (
        <Notification
          message="Flights quota successfully updated"
          severity="success"
        />
      )}
    </>
  )
}
