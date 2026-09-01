'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash } from 'lucide-react'

export const DeleteCarButton = ({ carId }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to delete the car')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex p-2 text-muted-foreground transition hover:bg-red-50 hover:text-red-500 rounded-lg disabled:opacity-50"
      title="Delete car"
    >
      <Trash className="h-4 w-4" />
    </button>
  )
}
