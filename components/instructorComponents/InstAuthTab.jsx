import { SignInForm } from "@/components/forms/SignIn"
import { SignUpForm } from "@/components/forms/SignUp"
import { HomeTabs } from "@/components/HomeTabs"
import { InstructorSignUpForm } from "./InstructorSignUp"

export default function InstructorAuthTabs(){
return (
<div className="container w-full p-2 md:px-10 lg:px-60 mx-auto py-10">
      

      <HomeTabs
       tabClassName="grid w-full grid-cols-2 md:grid-cols-2 lg:w-auto h-16 bg-slate-50 "
        tabs={[
          {
            title: "Sign in",
           
            content: (
              <div className="space-y-4">
              <div className="mb-6 text-center">
                          <h1 className="text-3xl font-bold tracking-tight">Sign in to your account</h1>
                          <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to access your account</p>
                        </div>
                <SignInForm/>
                
              </div>
            ),
          },
          {
            title: "Sign up",
            content: (
              <div className="space-y-4">
               <div className="mb-6 text-center">
                          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                          <p className="mt-2 text-sm text-muted-foreground">Please enter valid credentials</p>
                        </div>
                <InstructorSignUpForm/>
              </div>
            ),
          },
         
        ]}
      />
    </div>
  )
}

