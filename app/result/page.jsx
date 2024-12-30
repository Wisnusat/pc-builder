'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { NavBar } from "@/components/views/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Cpu, 
  HardDrive, 
  Box, 
  Power,
  MemoryStick,
  CircuitBoard,
  Microchip
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import axiosInstance from "@/lib/axios"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Result() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const budget = searchParams.get("budget")
  const [question, setQuestion] = useState("")
  const [buildData, setBuildData] = useState(null)

  const getDataBuild = async () => {
    try {
      const response = await axiosInstance.get(`/api/pc-builds/search-by-budget?minBudget=0.0&maxBudget=${budget}`);
      toast({ title: "Success get pc build" })
      setBuildData(response)
      return;
    } catch (error) {
      console.log(error)
      toast({ title: "Something went wrong", description: error.response.data.message, variant: "destructive" })
    }
  }

  useEffect(() => {
    getDataBuild()
  }, [budget])

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">PC components based on your budget</h1>
        </div>

        {/* Components Grid */}
        <div className="space-y-4 mb-8">
          {buildData && buildData.map((component, i) => (
            <Accordion type="single" collapsible key={i}>
              <AccordionItem value="item-1">
                <AccordionTrigger>{component.buildName} | Rp. {component.totalPrice.toLocaleString()}</AccordionTrigger>
                <AccordionContent>
                  {component.components && component.components.map((item, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow mb-2">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.category === "CPU" ? <Cpu className="w-8 h-8 text-purple-600" /> : 
                              item.category === "Power Supply" ? <Power className="w-8 h-8 text-purple-600" /> : 
                              item.category === "Hard Drive" ? <HardDrive className="w-8 h-8 text-purple-600" /> :
                              item.category === "HDD" || item.category === "SSD" ? <HardDrive className="w-8 h-8 text-purple-600" /> : 
                              item.category === "RAM" ? <MemoryStick className="w-8 h-8 text-purple-600" /> : 
                              item.category === "Motherboard" ? <CircuitBoard className="w-8 h-8 text-purple-600" /> : 
                              item.category === "Graphics Card" ? <Microchip className="w-8 h-8 text-purple-600" /> : 
                              <Box className="w-8 h-8 text-purple-600" />
                            }
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium text-gray-500">{item.category}</div>
                            <div className="font-semibold">{item.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-purple-600">
                              IDR {item.price}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>

        {/* Question Section */}
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Masukan pertanyaan"
              className="flex-grow"
            />
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => {/* Handle send to forum */}}
            >
              Send to forum
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}