"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function OtpInput({ value, onChange, length = 6, disabled = false }) {
  const [activeInput, setActiveInput] = useState(0)
  const inputRefs = useRef([])

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  // Auto-focus first input on mount
  useEffect(() => {
    if (!disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [disabled])

  const handleChange = (e, index) => {
    const newValue = e.target.value

    // Only accept digits
    if (newValue && !/^\d+$/.test(newValue)) {
      return
    }

    // Handle paste of multiple digits
    if (newValue.length > 1) {
      const pastedValue = newValue.split("").slice(0, length)

      // Fill as many inputs as we have digits
      const newOtp = value.split("")
      pastedValue.forEach((digit, idx) => {
        if (index + idx < length) {
          newOtp[index + idx] = digit
        }
      })

      const updatedOtp = newOtp.join("").slice(0, length)
      onChange(updatedOtp)

      // Focus the next empty input or the last input
      const nextIndex = Math.min(index + pastedValue.length, length - 1)
      setActiveInput(nextIndex)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    // Handle single digit input
    const otpArray = value.split("")
    otpArray[index] = newValue
    const newOtp = otpArray.join("")
    onChange(newOtp)

    // Auto-advance to next input
    if (newValue && index < length - 1) {
      setActiveInput(index + 1)
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        // If current input is empty, focus previous input
        setActiveInput(index - 1)
        inputRefs.current[index - 1]?.focus()
      } else {
        // Clear current input
        const otpArray = value.split("")
        otpArray[index] = ""
        onChange(otpArray.join(""))
      }
    }
    // Handle left arrow
    else if (e.key === "ArrowLeft" && index > 0) {
      setActiveInput(index - 1)
      inputRefs.current[index - 1]?.focus()
    }
    // Handle right arrow
    else if (e.key === "ArrowRight" && index < length - 1) {
      setActiveInput(index + 1)
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e, index) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only proceed if pasted content contains digits
    if (!/^\d+$/.test(pastedData)) {
      return
    }

    const pastedDigits = pastedData.split("").slice(0, length - index)

    // Update OTP value
    const otpArray = value.split("")
    pastedDigits.forEach((digit, idx) => {
      if (index + idx < length) {
        otpArray[index + idx] = digit
      }
    })

    onChange(otpArray.join(""))

    // Focus the next empty input or the last input
    const nextIndex = Math.min(index + pastedDigits.length, length - 1)
    setActiveInput(nextIndex)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleClick = (index) => {
    setActiveInput(index)
    inputRefs.current[index]?.focus()
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length }, (_, index) => (
        <div key={index} className="w-full max-w-[56px]">
          <input
            ref={(ref) => (inputRefs.current[index] = ref)}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            onClick={() => handleClick(index)}
            disabled={disabled}
            className={cn(
              "w-full h-14 text-center text-xl font-semibold rounded-md border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-all",
              {
                "bg-gray-100 text-gray-400": disabled,
                "border-gray-500 ring-1 ring-gray-500": activeInput === index && !disabled,
                "border-red-500 ring-1 ring-red-500": value.length === length && !value[index],
              },
            )}
            aria-label={`Digit ${index + 1} of verification code`}
          />
        </div>
      ))}
    </div>
  )
}
