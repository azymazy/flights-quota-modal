import { useState } from 'react'

export const useIsOpen = (initial: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initial)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  return { isOpen, onClose, onOpen, setIsOpen }
}
