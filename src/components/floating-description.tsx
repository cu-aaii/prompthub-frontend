import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { X, Check } from "lucide-react"

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
  const [copied, setCopied] = useState(false)

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
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
            <pre className="whitespace-pre-wrap mb-2">{text}</pre>
            <Button 
              onClick={handleCopyPrompt}
              className={copied ? "bg-green-500 hover:bg-green-600" : ""}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copied!
                </>
              ) : (
                "Copy Prompt"
              )}
            </Button>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
            <pre className="whitespace-pre-wrap">{description}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}
