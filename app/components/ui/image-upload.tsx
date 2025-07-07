import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { X, Upload, ImagePlus } from 'lucide-react'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  onImageRemove?: () => void
  defaultImage?: string
  required?: boolean
  maxSizeMB?: number
  className?: string
}

export function ImageUpload({
  onImageSelect,
  onImageRemove,
  defaultImage,
  required = true,
  maxSizeMB = 5,
  className = '',
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(defaultImage || '')
  const [error, setError] = useState<string>('')

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size
    const maxSize = maxSizeMB * 1024 * 1024 // Convert MB to bytes
    if (file.size > maxSize) {
      setError(`Image must be smaller than ${maxSizeMB}MB`)
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    setError('')
    onImageSelect(file)
  }

  const removeImage = () => {
    setPreview('')
    setError('')
    if (onImageRemove) onImageRemove()
  }

  return (
    <div className={`relative ${className}`}>
      {preview ? (
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="mb-4 text-gray-500">
              <ImagePlus className="w-10 h-10" />
            </div>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or WebP (max. {maxSizeMB}MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
            required={required}
          />
        </label>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
} 