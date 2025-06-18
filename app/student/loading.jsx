import { Montserrat } from "next/font/google"

// Initialize the font with a subset and variable property
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
})

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="flex flex-col items-center">
        <div className="relative mb-6 h-24 w-24">
          {/* Outer circle - emerald with shine */}
          <div className="absolute inset-0 animate-spin rounded-full border-b-4 border-emerald-500 shadow-lg"></div>

          {/* Inner circle - red with shine */}
          <div className="absolute inset-2 animate-spin-reverse rounded-full border-b-4 border-red-500 shadow-inner"></div>

          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-red-500 shadow-lg overflow-hidden shine-effect"></div>
          </div>
        </div>

        {/* Brand name */}
        <div className={`flex items-center space-x-1 text-4xl font-bold ${montserrat.className}`}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-emerald-500 shine-text-effect">
            LUCIS
          </span>
        </div>

        {/* Loading dots */}
        <div className="mt-4 flex space-x-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-red-500" style={{ animationDelay: "0ms" }}></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-red-400" style={{ animationDelay: "150ms" }}></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-400" style={{ animationDelay: "300ms" }}></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-500" style={{ animationDelay: "450ms" }}></div>
        </div>

        {/* Loading text */}
        <p className="mt-4 text-sm text-gray-500">Loading your learning experience...</p>
      </div>
    </div>
  )
}
