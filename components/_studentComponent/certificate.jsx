"use client"

import { useEffect, useRef } from "react"
import QRCode from "react-qr-code"
import { Award, CheckCircle, Download, Printer } from "lucide-react"
import { dateConverter } from "@/lib/dateConverter"
import { Signature } from "../Signature"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { PrintStyles } from "../PrintStyles" 

export default function Certificate({
  studentName,
  courseTitle,
  instructorName,
  date ,
  certId ,
  verificationURL
}) {
  
  const canvasRef = useRef(null)
  const certificateRef = useRef(null)

  const downloadPDF = async () => {
    if (!certificateRef.current) return

    try {
      // Create a loading indicator
      const loadingEl = document.createElement("div")
      loadingEl.style.position = "fixed"
      loadingEl.style.top = "0"
      loadingEl.style.left = "0"
      loadingEl.style.width = "100%"
      loadingEl.style.height = "100%"
      loadingEl.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
      loadingEl.style.display = "flex"
      loadingEl.style.justifyContent = "center"
      loadingEl.style.alignItems = "center"
      loadingEl.style.zIndex = "9999"
      loadingEl.innerHTML = "<div>Generating PDF...</div>"
      document.body.appendChild(loadingEl)

      const certificate = certificateRef.current

      // Wait a moment to ensure the loading indicator is visible
      await new Promise((resolve) => setTimeout(resolve, 100))

      const canvas = await html2canvas(certificate, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#fffef8",
      })

      const imgData = canvas.toDataURL("image/png")

      // Use landscape orientation for the PDF to better match the certificate's aspect ratio
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      })

      // A4 landscape dimensions
      const pdfWidth = 297
      const pdfHeight = 210

      // Calculate the dimensions to fit the certificate properly
      const imgWidth = pdfWidth - 20 // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Center the image on the page
      const positionX = (pdfWidth - imgWidth) / 2
      const positionY = (pdfHeight - imgHeight) / 2

      pdf.addImage(imgData, "PNG", positionX, positionY, imgWidth, imgHeight)
      pdf.save(`${studentName.replace(/\s+/g, "_")}_Certificate.pdf`)

      // Remove loading indicator
      document.body.removeChild(loadingEl)
    } catch (error) {
     // console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    }
  }

  // Draw decorative border on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Set line style
      ctx.strokeStyle = "#047857"
      ctx.lineWidth = 1

      // Draw corner ornaments
      const cornerSize = 40

      // Top left corner
      ctx.beginPath()
      ctx.moveTo(0, cornerSize)
      ctx.lineTo(0, 0)
      ctx.lineTo(cornerSize, 0)
      ctx.stroke()

      // Top right corner
      ctx.beginPath()
      ctx.moveTo(width - cornerSize, 0)
      ctx.lineTo(width, 0)
      ctx.lineTo(width, cornerSize)
      ctx.stroke()

      // Bottom left corner
      ctx.beginPath()
      ctx.moveTo(0, height - cornerSize)
      ctx.lineTo(0, height)
      ctx.lineTo(cornerSize, height)
      ctx.stroke()

      // Bottom right corner
      ctx.beginPath()
      ctx.moveTo(width - cornerSize, height)
      ctx.lineTo(width, height)
      ctx.lineTo(width, height - cornerSize)
      ctx.stroke()

      // Draw decorative swirls
      const drawSwirl = (x, y, size, rotation) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.bezierCurveTo(size / 2, -size / 2, size, -size / 2, size, 0)
        ctx.bezierCurveTo(size, size / 2, size / 2, size / 2, 0, 0)
        ctx.stroke()

        ctx.restore()
      }

      // Draw swirls at corners
       drawSwirl(cornerSize + 10, cornerSize + 10, 20, 0)
      drawSwirl(width - cornerSize - 10, cornerSize + 10, 20, Math.PI )
    //   drawSwirl(cornerSize + 10, height - cornerSize - 10, 20, -Math.PI / 2)
    //   drawSwirl(width - cornerSize - 10, height - cornerSize - 10, 20, Math.PI)
    }
  }, [])

  return (
     <div className="flex flex-col items-center">
      <PrintStyles />
      <div className="flex gap-3 mb-4">
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>
    <div ref={certificateRef} className="relative w-[800px] h-[670px] p-1 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-3xl shadow-2xl mx-auto text-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#047857_1px,transparent_1px)] [background-size:20px_20px] rounded-3xl"></div>

      <div className="relative w-full h-full bg-[#fffef8] rounded-2xl p-10 overflow-hidden">
        {/* Decorative watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <Award className="w-96 h-96" />
        </div>

        {/* Decorative canvas border */}
        <canvas ref={canvasRef} width={760} height={650} className="absolute py-1 mx-auto  inset-0 pointer-events-none" />

        {/* Main content */}
        <div className="relative h-full flex flex-col justify-between z-10">
          {/* Header */}
          <div className="text-center">
            {/* Logo placeholder */}
            <div className="">
<div className="flex items-center mb-4  justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-red-800">
              <span className="text-lg font-bold text-white">L</span>
            </div>
            <span className="ml-2 text-lg font-semibold">Lucis</span>
          </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-16 bg-emerald-700"></div>
              <h1 className="text-4xl font-bold text-emerald-800 font-serif tracking-wide">
                Certificate of Completion
              </h1>
              <div className="h-px w-16 bg-emerald-700"></div>
            </div>

            <p className="mt-6 text-gray-600 text-xl font-light italic">This is to certify that</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-2 font-serif relative inline-block">
              {studentName}
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-700 to-transparent"></div>
            </h2>

            <p className="mt-6 text-lg text-gray-700">has successfully completed the course</p>
            <h3 className="text-2xl font-semibold text-emerald-800 mt-2 font-serif">"{courseTitle}"</h3>

            {/* Decorative seal */}
            <div className="mt-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-700 animate-[spin_60s_linear_infinite]"></div>
                <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-700 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto">
            {/* Signatures */}
            <div className="flex justify-between items-end mt-8 px-10">
             <div className="flex flex-col items-center">
              <div className="h-14 flex items-center justify-center">
                  <Signature className="w-full h-full text-gray-800" style={{ transform: "rotate(-2deg)" }} />
                </div>
                <div className="text-center border-t border-gray-300 pt-1 w-48">
                <p className="font-bold text-gray-800">{instructorName}</p>
                <p className="text-sm text-gray-500">Instructor</p>
              </div>
             </div>
              

                    <div className="flex flex-col items-center">
              <div className="h-14 flex items-center justify-center">
                  <Signature className="w-full h-full text-gray-800" style={{ transform: "rotate(-10deg)" }} />
                </div>

              <div className="text-center border-t border-gray-300 pt-1 w-48">
             
                <p className="font-bold text-gray-800">{dateConverter(date)}</p>
                <p className="text-sm text-gray-500">Date of Completion</p>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="mt-8 flex items-center justify-between">
              <div className="text-left">
                <p className="text-xs text-gray-500 font-medium">
                  Certificate ID: <span className="font-mono">{certId}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Scan QR code or visit <span className="text-emerald-700">{verificationURL}</span> to verify
                </p>
              </div>

              <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <QRCode value={verificationURL} size={80} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
