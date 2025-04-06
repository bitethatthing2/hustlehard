"use client"

import { Header } from "@/components/header";
import DynamicFooter from "@/components/layout/DynamicFooter";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <DynamicFooter />
    </>
  )
}