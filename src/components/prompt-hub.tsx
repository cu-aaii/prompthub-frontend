import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, ThumbsUp } from "lucide-react"
import Link from "next/link"

export default function PromptHub() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              PromptHub
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Explore
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Create
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </nav>
          </div>
          <Button variant="outline">Sign In</Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explore Prompts</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Input
                className="pl-10 w-full"
                placeholder="Search prompts..."
                type="search"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex gap-2">
              <select className="w-[180px] px-3 py-2 rounded-md border border-input bg-background text-sm">
                <option value="all">All Categories</option>
                <option value="qa">Question Answering</option>
                <option value="summarization">Summarization</option>
                <option value="generation">Text Generation</option>
              </select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={20} />
                Filters
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Sample Prompt {i + 1}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-4">
                  This is a sample prompt description. It showcases what the prompt does and how it can be used.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Category</Badge>
                  <Badge variant="secondary">Tag 1</Badge>
                  <Badge variant="secondary">Tag 2</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ThumbsUp size={16} />
                  <span className="text-sm text-gray-600">42</span>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-gray-600">
        <div className="container mx-auto px-4">
          © 2023 PromptHub. All rights reserved.
        </div>
      </footer>
    </div>
  )
}