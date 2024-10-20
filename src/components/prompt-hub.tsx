'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import { FloatingDescription } from './floating-description'
import { Overlay } from './overlay'
import { NewPromptForm } from './new-prompt-form'

interface Prompt {
  name: string
  text: string
  description: string
  tags: string[]
  meta: {
    author: string[]
    institution: string
  }
}

export default function PromptHub() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [uniqueTags, setUniqueTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isNewPromptFormOpen, setIsNewPromptFormOpen] = useState(false)

  const fetchPrompts = useCallback(async () => {
    try {
      // http://localhost:80/prompts
      const response = await fetch('https://prompthub-production.up.railway.app/prompts')
      const data = await response.json()
      const transformedData = data.map((prompt: any) => ({
        ...prompt,
        tags: prompt.tags.length === 1 && prompt.tags[0].includes(',') 
          ? prompt.tags[0].split(',').map((tag: string) => tag.trim())
          : prompt.tags,
        meta: {
          author: prompt.meta.author,
          institution: prompt.meta.institution
        }
      }))
      setPrompts(transformedData)
      
      const allTags = transformedData.flatMap((prompt: Prompt) => prompt.tags)
      const uniqueTagsSet = new Set(allTags)
      setUniqueTags(Array.from(uniqueTagsSet) as string[])
    } catch (error) {
      console.error('Error fetching prompts:', error)
    }
  }, [])

  useEffect(() => {
    fetchPrompts() // Initial fetch

    const intervalId = setInterval(() => {
      fetchPrompts()
    }, 1000) // Fetch every 1000 ms (1 second)

    return () => clearInterval(intervalId) // Cleanup on component unmount
  }, [fetchPrompts])

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseDescription()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

  const filteredPrompts = prompts.filter(prompt =>
    prompt.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedTag === 'all' || prompt.tags.includes(selectedTag))
  )

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value)
  }

  const handleCardClick = (prompt: Prompt) => {
    setSelectedPrompt(prompt)
  }

  const handleCloseDescription = () => {
    setSelectedPrompt(null)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleNewPromptRequest = () => {
    setIsNewPromptFormOpen(true)
  }

  const handleCloseNewPromptForm = () => {
    setIsNewPromptFormOpen(false)
  }

  return (
    <div className="container mx-auto py-8">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-start">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            PromptHub
          </Link>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Explore Prompts</h1>
          <Button onClick={handleNewPromptRequest}>Request new prompt</Button>
        </div>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Input
                className="pl-10 w-full"
                placeholder="Search prompts..."
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex gap-2">
              <select
                className="w-[180px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                value={selectedTag}
                onChange={handleTagChange}
              >
                <option value="all">All Tags</option>
                {uniqueTags.map((tag, index) => (
                  <option key={index} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredPrompts.map((prompt, index) => (
            <Card 
              key={index} 
              className="flex flex-col cursor-pointer border-2 border-transparent hover:border-green-500" 
              onClick={() => handleCardClick(prompt)}
            >
              <CardHeader>
                <CardTitle>{prompt.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">{prompt.description}</p>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Overlay isVisible={!!selectedPrompt} onClose={handleCloseDescription} />
        {selectedPrompt && (
          <FloatingDescription
            name={selectedPrompt.name}
            authors={selectedPrompt.meta.author}
            institution={selectedPrompt.meta.institution}
            text={selectedPrompt.text}
            onClose={handleCloseDescription}
          />
        )}
        {isNewPromptFormOpen && (
          <NewPromptForm onClose={handleCloseNewPromptForm} />
        )}
      </main>
      <footer className="border-t py-4 text-center text-sm text-gray-600">
        <div className="container mx-auto px-4">
          © 2024 PromptHub. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
