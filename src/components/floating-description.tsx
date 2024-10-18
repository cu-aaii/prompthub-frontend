import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Copy, Check, X } from 'lucide-react'

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
    <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] max-h-[80vh] overflow-y-auto z-50 shadow-xl bg-white">
      <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-800">{name}</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Version: {version}</p>
        </div>
        <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
            {text}
          </pre>
        </div>
        <Button 
          onClick={handleCopy} 
          className="w-full justify-center py-2 transition-colors duration-200"
          variant={copied ? "outline" : "default"}
        >
          {copied ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5 mr-2" />
              Copy Prompt
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
