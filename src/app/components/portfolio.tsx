"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PORTFOLIO } from "@/data/resume"
import { getDictionary } from "../dictionaries"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"

export default function Portfolio({
  dictionary,
  showSeeAll = false,
  lang,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  showSeeAll?: boolean;
  lang?: string;
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedWork, setSelectedWork] = useState<typeof PORTFOLIO[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = ["all", "web", "mobile"]

  const filteredWorks = PORTFOLIO.filter((work) => (selectedCategory === "all" ? true : work.mainType.toLowerCase() === selectedCategory))

  const openGallery = (work: typeof PORTFOLIO[0]) => {
    setSelectedWork(work)
    setCurrentImageIndex(0)
  }

  const closeGallery = () => {
    setSelectedWork(null)
  }

  const getGalleryImages = (work: typeof PORTFOLIO[0]) => {
    const realImages = work.imageLink.filter(Boolean)
    // Add multiple placeholder images to create a gallery feel
    const placeholders = [
      `https://picsum.photos/seed/${work.id}-1/1200/800`,
      `https://picsum.photos/seed/${work.id}-2/1200/800`,
      `https://picsum.photos/seed/${work.id}-3/1200/800`,
      `https://picsum.photos/seed/${work.id}-4/1200/800`
    ]
    return realImages.length > 0 ? [...realImages, ...placeholders] : placeholders
  }

  const nextImage = (imagesLength: number) => {
    setCurrentImageIndex((prev) => (prev + 1) % imagesLength)
  }

  const prevImage = (imagesLength: number) => {
    setCurrentImageIndex((prev) => (prev - 1 + imagesLength) % imagesLength)
  }

  return (
    <section id="portfolio" className={`py-20`}>
      <div className="container mx-auto px-4">
        <h2 className={`mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? "text-white" : "text-black"}`}>
          {dictionary.portfolio.title}
        </h2>
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm capitalize"
            >
              {dictionary.portfolio[category as keyof typeof dictionary.portfolio]}
            </Button>
          ))}
        </div>
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`overflow-hidden border-none ${isDark ? "bg-zinc-900" : "bg-gray-100"}`}>
                  <CardContent className="p-0">
                    <div className="group relative cursor-pointer" onClick={() => openGallery(work)}>
                      <img
                        src={work.imageLink[0] || `https://picsum.photos/seed/${work.id}-1/800/600`}
                        alt={work.title}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4 text-center">
                        <h3 className="text-xl font-semibold text-white">{work.title}</h3>
                        <p className="mt-2 text-sm text-gray-300 line-clamp-3">{work.description}</p>
                        <div className="mt-4 flex flex-wrap justify-center gap-1.5 px-2">
                          {work.technos?.split(",").map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-transparent text-xs pointer-events-none">
                              {tech.trim()}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          onClick={(e) => { e.stopPropagation(); openGallery(work); }}
                          variant="secondary" 
                          size="sm" 
                          className="mt-4"
                        >
                          View Gallery
                        </Button>
                        {work.link && (
                          <a href={work.link} target="_blank" rel="noopener noreferrer" className="mt-2 text-primary hover:underline" onClick={(e) => e.stopPropagation()}>
                            Visit Link
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {showSeeAll && lang && (
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <a href={`/${lang}/portfolio`}>
                {dictionary.portfolio.seeAll}
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
            onClick={closeGallery}
          >
            {(() => {
               const images = getGalleryImages(selectedWork);
               return (
                 <motion.div 
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   exit={{ scale: 0.9, opacity: 0 }}
                   className="relative w-full max-w-6xl flex flex-col items-center"
                   onClick={(e) => e.stopPropagation()}
                 >
                   <button
                     onClick={closeGallery}
                     className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-50 p-2"
                   >
                     <X size={32} />
                   </button>
                   
                   <div className="relative w-full h-[60vh] md:h-[70vh] bg-black/50 rounded-lg flex items-center justify-center overflow-hidden">
                     <AnimatePresence mode="wait">
                       <motion.img
                         key={currentImageIndex}
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: -20 }}
                         transition={{ duration: 0.2 }}
                         src={images[currentImageIndex]}
                         alt={`${selectedWork.title} - Image ${currentImageIndex + 1}`}
                         className="max-h-full max-w-full object-contain"
                       />
                     </AnimatePresence>

                     {/* Navigation */}
                     <button
                       onClick={(e) => { e.stopPropagation(); prevImage(images.length); }}
                       className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
                     >
                       <ChevronLeft size={24} />
                     </button>
                     <button
                       onClick={(e) => { e.stopPropagation(); nextImage(images.length); }}
                       className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
                     >
                       <ChevronRight size={24} />
                     </button>
                   </div>

                   {/* Thumbnails */}
                   <div className="mt-6 flex gap-3 overflow-x-auto max-w-full pb-4 px-2 snap-x">
                     {images.map((img, idx) => (
                       <button
                         key={idx}
                         onClick={() => setCurrentImageIndex(idx)}
                         className={`relative h-20 w-32 shrink-0 snap-center overflow-hidden rounded-md transition-all duration-300 ${
                           idx === currentImageIndex 
                             ? "ring-2 ring-primary opacity-100 scale-105" 
                             : "opacity-40 hover:opacity-100"
                         }`}
                       >
                         <img src={img} alt="" className="h-full w-full object-cover" />
                       </button>
                     ))}
                   </div>
                 </motion.div>
               );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
