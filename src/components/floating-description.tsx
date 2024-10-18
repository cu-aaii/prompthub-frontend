import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Copy, Check } from 'lucide-react'

interface FloatingDescriptionProps {
  name: string
  version: string
  text: string
  onClose: () => void
}

export function FloatingDescription({ name, version, text, onClose }: FloatingDescriptionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] max-h-[80vh] overflow-y-auto z-50 shadow-lg">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle>{name}</CardTitle>
          <div className="text-sm text-gray-500 mt-1">
            <span>{version}</span>
          </div>
        </div>
        <Button variant="ghost" onClick={onClose}>×</Button>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
          {text}
        </pre>
        <Button className="mt-4" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </CardContent>
    </Card>
  )
}
