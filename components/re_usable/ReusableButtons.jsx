import React from 'react'
import { Button } from "@/components/ui/button";
import { Loader2, LoaderPinwheel } from "lucide-react";

export default function SubmitButton({className,loading,type,initialText,loadingText}) {
  return (

    <>
      <Button type={type} disabled={loading} className={className}>
      {loading ? (
        <>
          <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" /> {loadingText}
        </>
      ) : (
        <>
        {initialText}
        </>
      )}
    </Button>

    </>
  )
}
