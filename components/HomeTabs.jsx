"use client"

import { useState } from "react"
import { Tabs as ShadcnTabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function HomeTabs({ tabs, defaultValue, className ,tabClassName}) {
  // Generate values from tab titles (lowercase, hyphenated)
  const tabValues = tabs.map((tab) => tab.title.toLowerCase().replace(/\s+/g, "-"))

  // Use the first tab as default if not specified
  const [activeTab, setActiveTab] = useState(defaultValue || tabValues[0])

  return (
    <ShadcnTabs value={activeTab} onValueChange={setActiveTab} className={className}>
      <TabsList className={tabClassName}>
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={tabValues[index]}
            value={tabValues[index]}
            className="data-[state=active]:bg-emerald-700 data-[state=active]:text-primary-foreground
             h-10 rounded-none  hover:cursor-pointer"
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={tabValues[index]} value={tabValues[index]} className="mt-2 rounded-lg  p-6">
          {tab.content}
        </TabsContent>
      ))}
    </ShadcnTabs>
  )
}

