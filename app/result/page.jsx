'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { NavBar } from "@/components/views/navbar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Cpu, HardDrive, Box, Power, MemoryStick, CircuitBoard, MicroscopeIcon as Microchip, Copy } from 'lucide-react'
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import axiosInstance from "@/lib/axios"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const CommentBubble = ({ userName, comment, createdAt, copiedBuild }) => (
  <div className="bg-gray-100 rounded-lg p-3 mb-2">
    <div className="font-semibold">{userName}</div>
    <div>{comment}</div>
    {copiedBuild && (
      <div className="text-xs bg-gray-200 p-2 mt-2 rounded">
        Ref Build: {copiedBuild}
      </div>
    )}
    <div className="text-xs text-gray-500 mt-1">{createdAt}</div>
  </div>
)

export default function Result() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const budget = searchParams.get("budget")
  const [buildData, setBuildData] = useState(null)
  const [comments, setComments] = useState(null)
  const [newComments, setNewComments] = useState('')
  const [copiedBuilds, setCopiedBuilds] = useState(null)
  const [userData, setUserData] = useState(null)

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

  const fetchComments = async (buildId) => {
    try {
      const response = await axiosInstance.get(`/api/forums/pc-build/${buildId}`);
      setComments(response)
      setNewComments('')
      return;
    } catch (error) {
      console.log(error)
      toast({ title: "Something went wrong", description: error.response.data.message, variant: "destructive" })
    }
  }

  const handleCommentSubmit = async (pcBuild) => {
    if (userData) {
      if (newComments.trim() !== '') {
        const newComment = {
          user: userData,
          comment: newComments,
          pcBuild: pcBuild,
          createdAt: new Date().toISOString().split('T')[0], // yyyy-mm-dd format
          copiedBuild: copiedBuilds || null
        }

        try {
          await axiosInstance.post(`/api/forums`, newComment);
          toast({ title: "Comment posted" })
          fetchComments(pcBuild.buildId)
        } catch (error) {
          console.log(error)
          toast({ title: "Something went wrong", description: error.response.data.message, variant: "destructive" })
        }
        setNewComments('')
      }
    } else {
      toast({ title: "Please login to post a comment", variant: "destructive" })
    }
  }

  const copyBuildToClipboard = (build) => {
    const buildText = build.components.map(component => 
      `${component.category}: ${component.name}`
    ).join(', ')
    navigator.clipboard.writeText(buildText)
    setCopiedBuilds(buildText)
    toast({ title: "Build copied to clipboard" })
  }

  useEffect(() => {
    getDataBuild()
  }, [budget])

  useEffect(() => {
    if (typeof window === "undefined") return
    const data = localStorage.getItem("userData")
    if (data) {
      setUserData(JSON.parse(data))
    }
  }, [])

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
            <Accordion 
              type="single" 
              collapsible 
              key={i}
              onValueChange={(value) => {
                if (value === 'item-1') {
                  fetchComments(component.buildId)
                }
              }}
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex justify-between" onClick={() => fetchComments(component.buildId)}>
                  <span>{component.buildName} | Rp. {component.totalPrice.toLocaleString()}</span>
                </AccordionTrigger>
                <AccordionContent>
                  {component.components.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation()
                        copyBuildToClipboard(component)
                      }}
                      className="mb-2"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  )}
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
                  
                  {/* Comments Section */}
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Comments</h3>
                    {comments && comments.map((comment, index) => (
                      <CommentBubble key={index} {...comment} />
                    ))}
                    <Textarea
                      value={newComments}
                      onChange={(e) => setNewComments(e.target.value)}
                      placeholder="Add a comment..."
                      className="mb-2"
                    />
                    <Button 
                      onClick={() => handleCommentSubmit(component)}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Post Comment
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </main>
    </div>
  )
}