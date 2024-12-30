'use client'

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { NavBar } from "@/components/views/navbar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Monitor, Cpu, Wrench } from "lucide-react"

export default function Home() {
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [budget, setBudget] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    router.push(`/result?budget=${budget}`)
  }

  const features = [
    {
      icon: <Monitor className="w-6 h-6 text-purple-600" />,
      title: "Custom Design",
      description: "Personalize every aspect of your PC build to match your unique requirements"
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-600" />,
      title: "Premium Components",
      description: "Access to high-quality, reliable parts from trusted manufacturers"
    },
    {
      icon: <Wrench className="w-6 h-6 text-purple-600" />,
      title: "Expert Assembly",
      description: "Professional building service with meticulous attention to detail"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-100 to-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600" 
                 style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}></div>
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-purple-300 to-transparent" 
                 style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-20">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="text-center md:text-left space-y-6">
                <div className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                  Custom PC Builder
                </div>
                <h1 className="text-4xl font-bold md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  Build Your Dream Gaming PC
                </h1>
                <p className="text-lg text-gray-700 max-w-md mx-auto md:mx-0">
                  Create your perfect custom PC with our expert building service. 
                  From gaming rigs to workstations, we've got you covered.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full 
                             transition-all duration-300 transform hover:scale-105"
                    onClick={() => setShowBudgetModal(true)}
                  >
                    Start Your Build
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] rounded-xl shadow-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBjfGVufDB8fDB8fHww"
                  alt="Custom PC Build"
                  fill
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">Powerful. Customizable. Yours.</h3>
                  <p className="text-sm">Experience computing like never before with our custom builds.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We combine expertise with premium components to deliver the perfect custom PC for your needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Building your dream PC is easy with our simple 3-step process
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: "01", title: "Set Your Budget", description: "Tell us your budget range" },
                { number: "02", title: "Choose Components", description: "Select your preferred parts" },
                { number: "03", title: "We Build & Deliver", description: "Receive your custom-built PC" }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Budget Modal */}
      <Dialog open={showBudgetModal} onOpenChange={setShowBudgetModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Enter Your Budget</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="budget">Budget (in IDR)</Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter your budget"
                className="mt-1"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Find PC Build
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}