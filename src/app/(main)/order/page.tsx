"use client"

import { useState } from "react"
import { menuData } from "@/lib/menu-data"
import { BackButton } from "@/components/ui/back-button"
import { QrCodeScanner } from "@/components/features/table-ordering/qr-code-scanner"
import { MenuItem } from "@/components/features/menu/menu-item"
import type { MenuSection } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UtensilsCrossed, Wine } from "lucide-react"

export default function OrderPage() {
  const [tableId, setTableId] = useState<string | null>(null)

  const handleScanSuccess = async (scannedTableId: string) => {
    setTableId(scannedTableId)
    console.log("Table ID:", scannedTableId)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container py-8">
        <div className="mb-4">
          <BackButton />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">Our Menu</h1>
          <p className="text-gray-600 dark:text-gray-400">Place Your Order</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="food">
            <div className="bg-slate-800 dark:bg-white rounded-lg mb-8 overflow-hidden">
              <TabsList className="grid w-full grid-cols-2 border-0 bg-transparent p-0 h-auto">
                <TabsTrigger 
                  value="food" 
                  className="data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-slate-400 dark:data-[state=inactive]:bg-white dark:data-[state=inactive]:text-slate-500 rounded-none py-3 text-base font-bold uppercase transition-colors"
                >
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  FOOD
                </TabsTrigger>
                <TabsTrigger 
                  value="drinks" 
                  className="data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black data-[state=inactive]:bg-slate-800 data-[state=inactive]:text-slate-400 dark:data-[state=inactive]:bg-white dark:data-[state=inactive]:text-slate-500 rounded-none py-3 text-base font-bold uppercase transition-colors"
                >
                  <Wine className="w-4 h-4 mr-2" />
                  DRINKS
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="food" className="space-y-12">
              {menuData.food.map((section: MenuSection) => (
                <div key={section.title} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-black dark:text-white uppercase">
                    {section.title}
                  </h2>
                  <div>
                    {section.items?.map((item, index) => (
                      <MenuItem key={index} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="drinks" className="space-y-12">
              {menuData.drinks.map((section: MenuSection) => (
                <div key={section.title} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-black dark:text-white uppercase">
                    {section.title}
                  </h2>
                  <div>
                    {section.items?.map((item, index) => (
                      <MenuItem key={index} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {!tableId && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Ready to Order?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Scan the QR code at your table.</p>
            <QrCodeScanner onScanSuccessAction={handleScanSuccess} />
          </div>
        )}

        {tableId && (
          <div className="mt-8 text-center text-black dark:text-white">
            <p>Table ID: {tableId} - Ordering functionality coming soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}