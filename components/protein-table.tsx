"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { PaperEntry2019, PaperEntry2020, PaperEntry2021, PaperEntry2023 } from "@/lib/types";



interface ProteinTableProps {
  tableId: string
  query: string
}

export default function ProteinTable({ tableId, query }: ProteinTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/${tableId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        console.log("Fetched data:", json);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [tableId]);

  // Filter data based on search query
  const filteredData = data.filter((entry) => {
    if (tableId === "2019") {
      const e = entry as PaperEntry2019;
      return (
        e["Protein name"].toLowerCase().includes(query.toLowerCase()) ||
        e["Peptide sequence"].toLowerCase().includes(query.toLowerCase())
      );
    } else if (tableId === "2020") {
      const e = entry as PaperEntry2020;
      return (
        e["Protein Name"].toLowerCase().includes(query.toLowerCase()) ||
        e["Gene "]?.toLowerCase().includes(query.toLowerCase()) ||
        e["Peptide"].toLowerCase().includes(query.toLowerCase())
      );
    } else if (tableId === "2021") {
      const e = entry as PaperEntry2021;
      return (
        e["Protein Name"].toLowerCase().includes(query.toLowerCase()) ||
        e["Gene "]?.toLowerCase().includes(query.toLowerCase()) ||
        e["Peptide"].toLowerCase().includes(query.toLowerCase())
      );
    } else if (tableId === "2023") {
      const e = entry as PaperEntry2023;
      return (
        e["Protein Name"].toLowerCase().includes(query.toLowerCase()) ||
        e["Peptide"].toLowerCase().includes(query.toLowerCase())
      );
    } else {
      // Default case - no filtering for unknown table types
      return true;
    }
  });

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

  // Map tableId to year label
  const yearLabel = (() => {
    if (tableId === "1") return "2019";
    if (tableId === "2") return "2020";
    if (tableId === "3") return "2021";
    if (tableId === "4") return "2023";
    return tableId;
  })();

  if (loading) {
    return <Card className="overflow-hidden"><div className="p-4">Loading...</div></Card>;
  }
  if (error) {
    return <Card className="overflow-hidden"><div className="p-4 text-red-500">Error: {error}</div></Card>;
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Paper {tableId} Proteins</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {tableId === "2019" || tableId === "2023" ? (
                  <>
                    <TableHead>Accession #</TableHead>
                    <TableHead>Protein Name</TableHead>
                    <TableHead>Peptide Sequence</TableHead>
                    <TableHead>Peptide Start</TableHead>
                    <TableHead>Peptide Stop</TableHead>
                    <TableHead>First Cysteine</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead>Accession #</TableHead>
                    <TableHead>Gene</TableHead>
                    <TableHead>Protein Name</TableHead>
                    <TableHead>Peptide</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((entry, idx) => (
                  <TableRow key={idx}>
                    {tableId === "2019" ? (
                      <>
                        <TableCell>{(entry as PaperEntry2019)["Accession Number"]}</TableCell>
                        <TableCell>{(entry as PaperEntry2019)["Protein name"]}</TableCell>
                        <TableCell className="font-mono text-sm">{highlightCysteine((entry as PaperEntry2019)["Peptide sequence"] || "")}</TableCell>
                        <TableCell>{(entry as PaperEntry2019)["Peptide start index"]}</TableCell>
                        <TableCell>{(entry as PaperEntry2019)["Peptide stop index"]}</TableCell>
                        <TableCell>{(entry as PaperEntry2019)["First cysteine index"]}</TableCell>
                      </>
                    ) : tableId === "2020" ? (
                      <>
                        <TableCell>{(entry as PaperEntry2020)["Accession #"]}</TableCell>
                        <TableCell>{(entry as PaperEntry2020)["Protein Name"]}</TableCell>
                        <TableCell>{(entry as PaperEntry2020)["Gene "]}</TableCell>
                        <TableCell className="font-mono text-sm">{highlightCysteine((entry as PaperEntry2020)["Peptide"] || "")}</TableCell>
                      </>
                    ) : tableId === "2021" ? (
                      <>
                        <TableCell>{(entry as PaperEntry2021)["Accession #"]}</TableCell>
                        <TableCell>{(entry as PaperEntry2021)["Protein Name"]}</TableCell>
                        <TableCell>{(entry as PaperEntry2021)["Gene "]}</TableCell>
                        <TableCell className="font-mono text-sm">{highlightCysteine((entry as PaperEntry2021)["Peptide"] || "")}</TableCell>
                      </>
                    ) : tableId === "2023" ? (
                      <>
                        <TableCell>{(entry as PaperEntry2023)["Accession Number"]}</TableCell>
                        <TableCell>{(entry as PaperEntry2023)["Protein Name"]}</TableCell>
                        <TableCell className="font-mono text-sm">{highlightCysteine((entry as PaperEntry2023)["Peptide"] || "")}</TableCell>
                        <TableCell>{(entry as PaperEntry2023)["Start Position"]}</TableCell>
                        <TableCell>{(entry as PaperEntry2023)["End Position"]}</TableCell>
                        <TableCell>{(entry as PaperEntry2023)["First cysteine index"]}</TableCell>
                      </>
                    ) : null}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={tableId === "2019" || tableId === "2023" ? 6 : 4} className="text-center py-4">
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
