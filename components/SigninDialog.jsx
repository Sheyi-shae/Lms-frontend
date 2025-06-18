"use client";
import React from 'react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInForm } from './forms/SignIn';
import AuthTabs from '@/app/(frontpage)/auth/AuthTabs';





export default function SigninDialog({isModalOpen,setIsModalOpen}) {
 
        
      
  return (
    <div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="w-full  md:max-w-2xl p-0 overflow-scroll h-[90vh]">
              <DialogTitle className="sr-only">
      Sign in
    </DialogTitle>
    
               <div className='py-1 px-3'>
                <Card  >
                        <CardHeader>
                          <CardTitle className="text-2xl"></CardTitle>
                          <CardDescription>
                            
                          </CardDescription>
                          
                        </CardHeader>
                        <CardContent>
                  <AuthTabs/>
                    </CardContent>
                      </Card>
               </div>
            </DialogContent>
          </Dialog>
    </div>
  )
}
