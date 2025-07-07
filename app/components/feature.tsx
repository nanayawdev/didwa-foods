"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/app/components/ui/button"

const tabs = {
  rides: {
    title: "The fastest way to get a ride.",
    description: "Available for iOS and Android devices.",
    buttonText: "Get Bolt"
  },
  delivery: {
    title: "The food you love, delivered fast!",
    description: "Available for iOS and Android devices.",
    buttonText: "Order Now"
  }
}

export function Feature() {
  const [activeTab, setActiveTab] = useState<'rides' | 'delivery'>('rides')

  return (
    <section className="bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Phone Image */}
          <div className="relative w-full lg:w-1/2 flex justify-center">
            <div className="relative w-[400px] aspect-[4/5]">
              <Image
                src="/generic.webp"
                alt="Didwa Foods App Interface"
                fill
                className="object-cover rounded-3xl"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Navigation */}
            <nav className="mb-8 inline-flex rounded-full border border-white/10 p-1">
              <button 
                onClick={() => setActiveTab('rides')}
                className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
                  activeTab === 'rides' 
                    ? 'bg-white text-black' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Rides
              </button>
              <button 
                onClick={() => setActiveTab('delivery')}
                className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
                  activeTab === 'delivery' 
                    ? 'bg-white text-black' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Delivery
              </button>
            </nav>

            {/* Text Content */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {tabs[activeTab].title}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {tabs[activeTab].description}
            </p>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
            >
              {tabs[activeTab].buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 