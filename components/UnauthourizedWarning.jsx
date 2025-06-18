import Link from "next/link"
import { ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function UnauthorizedWarning() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="mx-auto max-w-md text-center shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex justify-center pb-4">
            <ShieldAlert className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            You do not have permission to access this page
          </h1>
        </CardHeader>
        <CardContent className="text-gray-500">
          <p className="mb-2">
            This area is restricted to authorized personnel only. If you believe you should have access, please verify
            your credentials or contact your administrator.
          </p>
          <p>For security reasons, this action has been logged.</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button asChild className="w-full">
            <Link href="/">Go back home</Link>
          </Button>
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <Link href="/support" className="text-blue-600 hover:underline">
              Contact support
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
