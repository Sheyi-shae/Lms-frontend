import React from 'react'
import {  LoaderPinwheel, UploadCloud } from "lucide-react";
import { Button } from '../ui/button';
export default function UploadingFormButton({ loading, uploading,uploadingTitle, loadingTitle, title,type }) {
  return (
    <div><Button className={'bg-cyan-700 hover:bg-cyan-800'} type={type} disabled={loading || uploading}>
            {uploading ? (
              <>
                <UploadCloud className="mr-2 h-4 w-4 animate-spin" />{uploadingTitle}
                    </>
            ) : loading ? (
                  <>
                  <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" /> {loadingTitle}
          </>
                 ) : (
         <>
                {title} 
                </>
                  )}
</Button>
</div>
  )
}
