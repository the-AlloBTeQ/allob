import { useState, useEffect, useCallback } from 'react'

// First, let's define our toast types for better type safety
export type ToastProps = {
  title?: string
  description?: string
  duration?: number
  variant?: 'default' | 'destructive' | 'success'
}

// We'll create a store to manage multiple toasts
type Toast = ToastProps & {
  id: string // Unique identifier for each toast
  visible: boolean
}

// Now, let's create our custom hook
export function useToast() {
  // Maintain an array of active toasts
  const [toasts, setToasts] = useState<Toast[]>([])

  // Helper function to generate unique IDs
  const generateId = () => Math.random().toString(36).substr(2, 9)

  // Function to add a new toast
  const toast = useCallback(({ title, description, duration = 5000, variant = 'default' }: ToastProps) => {
    const id = generateId()

    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id,
        title,
        description,
        duration,
        variant,
        visible: true,
      },
    ])

    // Automatically remove the toast after duration
    setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.map((toast) =>
          toast.id === id ? { ...toast, visible: false } : toast
        )
      )

      // Actually remove from DOM after animation
      setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.filter((toast) => toast.id !== id)
        )
      }, 300) // Animation duration
    }, duration)
  }, [])

  // Function to dismiss a specific toast
  const dismiss = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    )

    setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id)
      )
    }, 300)
  }, [])

  return { toast, dismiss, toasts }
}
