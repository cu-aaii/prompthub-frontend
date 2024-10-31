import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'

// Dynamically import MarkdownEditor to avoid SSR issues
const MarkdownEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})
import 'react-markdown-editor-lite/lib/index.css'

const institutions = [
  "University of Chicago",
  "Cornell University",
  "University of Hawaii",
  "Virginia Tech",
  "University of Notre Dame",
  "Cornell Weill",
  "University of Pennsylvania"
]

interface NewPromptFormProps {
  onClose: () => void
}

export function NewPromptForm({ onClose }: NewPromptFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    tags: '',
    promptName: '',
    promptSummary: '',
    promptText: '',
    description: ''
  })
  // const [formData, setFormData] = useState({
  //   name: 'John Doe',
  //   institution: 'University of Chicago',
  //   email: 'john.doe@example.com',
  //   tags: 'AI, Machine Learning, Data Science',
  //   promptName: 'Sample Prompt',
  //   promptText: 'This is a sample prompt text for testing purposes.',
  //   description: 'This is a sample description for the prompt. It provides usage information and examples.'
  // })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [existingPromptNames, setExistingPromptNames] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchExistingPromptNames = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prompts`)
        const data = await response.json()
        const names = data.map((prompt: any) => prompt.name.toLowerCase())
        setExistingPromptNames(names)
      } catch (error) {
        console.error('Error fetching existing prompt names:', error)
      }
    }

    fetchExistingPromptNames()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleEditorChange = ({ text }: { text: string }) => {
    setFormData(prevData => ({ ...prevData, description: text }))
  }

  const renderHTML = (text: string) => {
    return <ReactMarkdown>{text}</ReactMarkdown>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (existingPromptNames.includes(formData.promptName.toLowerCase())) {
      toast({
        title: "Error",
        description: "A prompt with this title already exists. Please choose a different title.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prompts/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          institution: formData.institution,
          email: formData.email,
          tags: formData.tags,
          promptName: formData.promptName,
          promptSummary: formData.promptSummary,
          promptText: formData.promptText,
          description: formData.description
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit prompt request')
      }

      const result = await response.json()
      toast({
        title: "Success",
        description: "Your prompt request has been submitted successfully. We'll notify you of the response to your request at the email address you provided. If approved, the prompt will be added to PromptHub shortly.",
      })
      onClose()
    } catch (error) {
      console.error('Error submitting prompt request:', error)
      toast({
        title: "Error",
        description: "Failed to submit prompt request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Request New Prompt</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="institution">Institution</Label>
            <select
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select an institution</option>
              {institutions.map(inst => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="We'll notify you of the response to your request at this email address"
            />
          </div>
          <div>
            <Label htmlFor="promptName">Prompt Title</Label>
            <Input 
              id="promptName" 
              name="promptName" 
              value={formData.promptName} 
              onChange={handleChange} 
              required 
              placeholder="Enter a concise and descriptive title for your prompt"
            />
          </div>
          <div>
            <Label htmlFor="promptSummary">Prompt Summary</Label>
            <Textarea 
              id="promptSummary" 
              name="promptSummary" 
              value={formData.promptSummary} 
              onChange={handleChange} 
              required 
              placeholder="Provide a brief summary of what the prompt does"
            />
          </div>
          <div>
            <Label htmlFor="promptText">Prompt Text</Label>
            <Textarea 
              id="promptText" 
              name="promptText" 
              value={formData.promptText} 
              onChange={handleChange} 
              required 
              placeholder="Enter the full text of your prompt here"
            />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input 
              id="tags" 
              name="tags" 
              value={formData.tags} 
              onChange={handleChange} 
              required 
              placeholder="e.g., AI, Machine Learning, Data Science"
            />
          </div>
          <div>
            <Label htmlFor="description">Usage Information</Label>
            <MarkdownEditor
              value={formData.description}
              onChange={handleEditorChange}
              style={{ height: '300px' }}
              renderHTML={renderHTML}
              placeholder="Provide any relevant information about using this prompt, such as examples, tips, or suggestions. You can use Markdown for formatting."
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit for Request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
