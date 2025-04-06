"use client"

import { Scanner } from "@yudiel/react-qr-scanner"
import { Card } from "@/components/ui/card"

interface QrCodeScannerProps {
  onScanSuccessAction: (tableId: string) => Promise<void>
}

export function QrCodeScanner({ onScanSuccessAction }: QrCodeScannerProps) {
  return (
    <div className="aspect-square w-full max-w-xs mx-auto">
      <Card className="overflow-hidden">
        <Scanner
          onScan={async (detectedCodes) => {
            // Get the first detected code
            const result = detectedCodes[0]?.rawValue
            // Validate that the QR code contains a valid table ID
            if (result && result.startsWith("table_")) {
              await onScanSuccessAction(result)
            }
          }}
          onError={(error: unknown) => {
            if (error instanceof Error) {
              console.error(error.message)
            } else {
              console.error("An unknown error occurred during QR code scanning")
            }
          }}
          formats={["qr_code"]} // Only scan QR codes
          scanDelay={500} // Add a small delay between scans
        />
      </Card>
    </div>
  )
}
