"use client";
import { Search } from "lucide-react"
import Link from "next/link"
import ProteinTable from "@/components/protein-table"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function Home() {

  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Glutothyination Explorer</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="w-full max-w-sm items-center md:flex">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search proteins..."
                  className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 md:py-8">
          <Tabs defaultValue="table1" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="table1">Paper 2019</TabsTrigger>
              <TabsTrigger value="table2">Paper 2020</TabsTrigger>
              <TabsTrigger value="table3">Paper 2021</TabsTrigger>
              <TabsTrigger value="table4">Paper 2023</TabsTrigger>
            </TabsList>
            <TabsContent value="table1">
              <ProteinTable tableId="2019" query={search} />
            </TabsContent>
            <TabsContent value="table2">
              <ProteinTable tableId="2020" query={search} />
            </TabsContent>
            <TabsContent value="table3">
              <ProteinTable tableId="2021" query={search} />
            </TabsContent>
            <TabsContent value="table4">
              <ProteinTable tableId="2023" query={search} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
