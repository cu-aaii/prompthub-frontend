import React from 'react'
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FloatingDescriptionProps {
  name: string
  authors: string[]
  institution: string
  text: string
  description: string
  onClose: () => void
}

export function FloatingDescription({
  name,
  authors,
  institution,
  text,
  description,
  onClose
}: FloatingDescriptionProps) {
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(text)
    // Optionally, you can add a toast notification here to inform the user that the text has been copied
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <div className="mb-4 text-sm text-gray-600">
            <p>Authors: {authors.join(', ')}</p>
            <p>Institution: {institution}</p>
          </div>
          
          <div className="mb-4 bg-gray-100 p-4 rounded-md">
            <p className="mb-2">{text}</p>
            <Button onClick={handleCopyPrompt}>Copy Prompt</Button>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
