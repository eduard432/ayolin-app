import { PutBlobResult } from "@vercel/blob"

export const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`/api/v1.1/files?filename=${file.name}`, {
        method: 'POST',
        body: formData
    })

    if(!response.ok) throw new Error('Failed to upload file')

    const result = await response.json()

    return result.data.blob as PutBlobResult
}