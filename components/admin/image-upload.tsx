"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  token: string
  maxFiles?: number
}

export default function ImageUpload({ images, onImagesChange, token, maxFiles = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    const newImages = [...images]

    for (let i = 0; i < files.length && newImages.length < maxFiles; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append("file", file)

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          newImages.push(data.url)
        }
      } catch (error) {
        console.error("Error uploading file:", error)
      }
    }

    onImagesChange(newImages)
    setUploading(false)
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const handleAddUrl = (url: string) => {
    if (url && images.length < maxFiles) {
      onImagesChange([...images, url])
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading || images.length >= maxFiles}
        />
        <Button disabled={uploading || images.length >= maxFiles}>{uploading ? "Uploading..." : "Upload"}</Button>
      </div>

      {images.length > 0 && (
        <div className="space-y-2">
          {images.map((image, index) => (
            <div key={index} className="flex items-center justify-between bg-slate-100 p-2 rounded">
              <span className="text-sm text-slate-600 truncate">{image}</span>
              <Button variant="ghost" size="sm" onClick={() => handleRemoveImage(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
