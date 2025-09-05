"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  FileText, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Globe,
  MessageSquare,
  AlertTriangle
} from "lucide-react"
import { mockContent } from "@/lib/mock-data/content-data"

export default function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    category: "",
    language: "",
    status: "active"
  })

  const filteredContent = mockContent.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (content: any) => {
    setSelectedContent(content)
    setEditForm({
      title: content.title,
      content: content.content,
      category: content.category,
      language: content.language,
      status: content.status
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    // In a real app, this would update the content
    console.log("Saving content:", editForm)
    setIsEditing(false)
    setSelectedContent(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setSelectedContent(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "draft": return "bg-yellow-100 text-yellow-800"
      case "archived": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "FAQ": return <MessageSquare className="h-4 w-4" />
      case "Emergency": return <AlertTriangle className="h-4 w-4" />
      case "General": return <FileText className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Content</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredContent.map((content) => (
                    <div
                      key={content.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedContent(content)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getCategoryIcon(content.category)}
                            <h3 className="font-semibold">{content.title}</h3>
                            <Badge className={getStatusColor(content.status)}>
                              {content.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {content.content.substring(0, 100)}...
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Category: {content.category}</span>
                            <span>Language: {content.language}</span>
                            <span>Updated: {content.lastUpdated}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(content)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Content Details */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedContent ? (
                <div className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={editForm.title}
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <Input
                          value={editForm.category}
                          onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Language</label>
                        <Input
                          value={editForm.language}
                          onChange={(e) => setEditForm({...editForm, language: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <select
                          value={editForm.status}
                          onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                          className="w-full mt-1 p-2 border rounded-md"
                        >
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Content</label>
                        <Textarea
                          value={editForm.content}
                          onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                          className="mt-1 h-32"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} size="sm">
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">{selectedContent.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(selectedContent.status)}>
                            {selectedContent.status}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {selectedContent.category}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          {selectedContent.content}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>Language: {selectedContent.language}</div>
                        <div>Last Updated: {selectedContent.lastUpdated}</div>
                        <div>Created: {selectedContent.createdAt}</div>
                      </div>
                      <Button
                        onClick={() => handleEdit(selectedContent)}
                        className="w-full"
                        size="sm"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Content
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Select content to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}