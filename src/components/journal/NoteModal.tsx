"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { DialogTitle } from "@radix-ui/react-dialog"
import {useState} from "react"

interface Note {
  id: number
  title: string
  description: string
  duration: number
  date: string
  imageUrl: string
  bgColor: string
}

interface NoteModalProps {
  note: Note | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedNote: Note) => void  // <-- Add this line
}

export default function NoteModal({ note, isOpen, onClose, onSave }: NoteModalProps) {
  if (!note) return null

  const [title, setTitle] = useState(note.title)
  const [description, setDescription] = useState(note.description)

  // Function to handle saving
      const handleSave = () => {
        onSave({ ...note, title, description })
        onClose()
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle>
        ...
      </DialogTitle>
      <DialogContent className="max-w-3xl p-0 rounded-3xl">
        {/* No need for an extra close button here */}

        <div className="p-8">
          {/* Header */}
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${note.bgColor} rounded-2xl flex items-center justify-center`}>
                <img src={"/journalicon.jpeg" || "/api/placeholder/32/32"} alt="" className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-semibold">{note.title}</h2>
            </div>
          </DialogHeader>

          <Separator className="mb-6" />

          <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
          />
      </div>

      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
          />
          <div className="flex justify-end gap-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>

  )
}