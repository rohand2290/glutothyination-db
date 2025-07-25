"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data - in a real app, this would come from your backend
const generateMockData = (tableId: string) => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    proteinName: `Protein-${tableId}-${i + 1}`,
    geneName: `Gene-${tableId}-${String.fromCharCode(65 + (i % 26))}${i + 1}`,
    peptideSequence: `MTKL${i % 2 === 0 ? "C" : "A"}VLIAFAGVALA${i % 3 === 0 ? "C" : "G"}QAVDA${i % 5 === 0 ? "C" : "S"}KLDLVKR`,
    cysteinePosition: i % 2 === 0 ? 5 : i % 3 === 0 ? 17 : i % 5 === 0 ? 23 : null,
  }))
}

interface ProteinTableProps {
  tableId: string
}

export default function ProteinTable({ tableId }: ProteinTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  const mockData = generateMockData(tableId)

  // Filter data based on search term
  const filteredData = mockData.filter(
    (protein) =>
      protein.proteinName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protein.geneName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protein.peptideSequence.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate data
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Highlight cysteine in peptide sequence
  const highlightCysteine = (sequence: string) => {
    return sequence.split("").map((char, index) =>
      char === "C" ? (
        <span key={index} className="bg-yellow-500 text-black font-bold px-0.5 rounded">
          {char}
        </span>
      ) : (
        char
      ),
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Paper {tableId} Proteins</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Protein Name</TableHead>
                <TableHead>Gene Name</TableHead>
                <TableHead className="min-w-[300px]">Peptide Sequence</TableHead>
                <TableHead>Cysteine Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((protein) => (
                  <TableRow key={protein.id}>
                    <TableCell>{protein.id}</TableCell>
                    <TableCell className="font-medium">{protein.proteinName}</TableCell>
                    <TableCell>{protein.geneName}</TableCell>
                    <TableCell className="font-mono text-sm">{highlightCysteine(protein.peptideSequence)}</TableCell>
                    <TableCell>{protein.cysteinePosition || "N/A"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No proteins found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length}{" "}
            proteins
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages || 1}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
