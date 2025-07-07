"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel"

const slides = [
  {
    image: "/bolt_food_media_5_e9673839a0.webp",
    alt: "Browse restaurants screen",
    title: "Discover local restaurants",
    description: "Taste the flavours of the world with our wide selection of restaurants — be it your favourite local spot or a hidden gem."
  },
  {
    image: "/bolt_food_media_6_ec7e964afd.webp",
    alt: "Restaurant details screen",
    title: "Order and pay with ease",
    description: "Tap, tap, done! Place the order with just a few clicks and pay with your preferred method — cash, card or Bolt balance."
  },
  {
    image: "/bolt_food_media_7_2fc0fe2bb0.webp",
    alt: "Order tracking screen",
    title: "Track your order",
    description: "Follow your order's journey from store to door. Stay updated at every stage with real-time notifications."
  }
]

export function Hero() {
  const router = useRouter()

  return (
    <div className="relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Text Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Discover, order, and track in the app
          </h1>
          <div className="mt-8 flex justify-center">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => router.push('/products')}
            >
              Order food online
            </Button>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <Carousel opts={{
            align: "start",
            loop: true,
          }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                  <div className="relative flex flex-col items-center">
                    {/* Phone Image */}
                    <div className="relative w-full max-w-[320px] mx-auto aspect-[9/19] rounded-2xl overflow-hidden mb-8">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Text Content */}
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-3">{slide.title}</h2>
                      <p className="text-gray-600 text-lg">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/3" />
            <CarouselNext className="absolute right-4 top-1/3" />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 items-start justify-center max-w-5xl mx-auto">
          {slides.map((slide, index) => (
            <div key={index} className="relative text-center">
              <div className="relative w-full max-w-[320px] mx-auto aspect-[9/19] rounded-2xl overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-8 max-w-sm mx-auto">
                <h2 className="text-2xl font-bold mb-3">{slide.title}</h2>
                <p className="text-gray-600 text-lg">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 