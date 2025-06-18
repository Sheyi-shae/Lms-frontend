"use client"
import React from 'react'
import { AuthProvider } from './authContext'
import { ToastContainer } from 'react-toastify'

export default function Providers({children}) {
  return (
    <AuthProvider>
    <ToastContainer />
        {children}
    </AuthProvider>
  )
}
