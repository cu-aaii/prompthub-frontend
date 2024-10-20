import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Copy, Check, X } from 'lucide-react'

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

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{text}</p>
          <h3 className="text-lg font-semibold mb-2">Usage Information:</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center space-x-2 mt-4">
            <Button onClick={handleCopy} variant="outline">
              {copied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copied ? 'Copied' : 'Copy Prompt'}
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Authors: {authors.join(', ')}
            </p>
            <p className="text-sm text-gray-500">
              Institution: {institution}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
