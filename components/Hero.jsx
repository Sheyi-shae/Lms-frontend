import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className=" bg-gradient-to-br from-white to-gray-50 py-3">
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center bg-white rounded-full px-4 py-1 mb-8 shadow-sm">
          <span className="text-sm text-gray-600">Welcome to Lucis</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 max-w-4xl mx-auto mb-6">
          We Support Your Professional development
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Lucis empowers you to expand your horizons with learning that's worldwide
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button className="bg-gray-900 hover:bg-gray-800">
            Try for free
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
          <Button variant="outline" className="border-2">
            See features
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>

        <p className="text-sm text-gray-500">Trusted by 500+ production companies</p>
      </main>
    </div>
  )
}

