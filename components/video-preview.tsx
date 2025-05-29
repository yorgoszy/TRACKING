"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface VideoPreviewProps {
  url: string
}

export function VideoPreview({ url }: VideoPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Έλεγχος αν το URL είναι από YouTube
  const isYouTubeUrl = (url: string): boolean => {
    return url.includes("youtube.com") || url.includes("youtu.be")
  }

  // Μετατροπή του YouTube URL σε embed URL
  const getYouTubeEmbedUrl = (url: string): string => {
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v")
      return `https://www.youtube.com/embed/${videoId}`
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center text-blue-600 hover:text-blue-800">
          <Play className="h-4 w-4 mr-1" />
          <span>Προβολή</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 bg-black">
        {isYouTubeUrl(url) ? (
          <iframe
            width="100%"
            height="450"
            src={getYouTubeEmbedUrl(url)}
            title="Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video width="100%" height="auto" controls>
            <source src={url} type="video/mp4" />Ο browser σας δεν υποστηρίζει το tag video.
          </video>
        )}
      </DialogContent>
    </Dialog>
  )
}
