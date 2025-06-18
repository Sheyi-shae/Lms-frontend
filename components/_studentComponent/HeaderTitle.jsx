// HeaderTitle.jsx
import { Button } from '../ui/button'

export default function HeaderTitle({head,text ,className,icon}) {
  return (
    <div>
          {/* Header section with title and " button */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{head}</h1>
            <p className="text-muted-foreground">{text}</p>
          </div>
         
         
            <Button className={className}>
              {icon}
             
            </Button>
          
        </div>
    </div>
  )
}
