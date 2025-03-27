"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const renderPaginationButtons = () => {
    const buttons = []
    const visiblePages = 2
    const halfVisiblePages = Math.floor(visiblePages / 2)

    let startPage = Math.max(1, currentPage - halfVisiblePages)
    const endPage = Math.min(totalPages, startPage + visiblePages - 1)

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1)
    }

    // Botón de primera página
    if (startPage > 1) {
      buttons.push(
        <button key="first" className="join-item btn btn-sm md:btn-md" onClick={() => onPageChange(1)}>
          1
        </button>,
      )
      if (startPage > 2) {
        buttons.push(
          <button key="first-ellipsis" className="join-item btn btn-sm md:btn-md btn-disabled">
            ...
          </button>,
        )
      }
    }

    // Botones centrales
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          className={`join-item btn btn-sm md:btn-md ${currentPage === page ? "btn-active bg-neutral/60 font-bold text-white" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>,
      )
    }

    // Botones de la última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <button key="last-ellipsis" className="join-item btn btn-sm md:btn-md btn-disabled">
            ...
          </button>,
        )
      }
      buttons.push(
        <button key="last" className="join-item btn btn-sm md:btn-md" onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>,
      )
    }

    return buttons
  }

  return (
    <div className="flex justify-center mt-4">
      <div className="join">
        {/* Botón Anterior */}
        <button
          className="join-item btn btn-sm md:btn-md bg-base-300"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        {/* Números de página */}
        {renderPaginationButtons()}

        {/* Botón Siguiente */}
        <button
          className="join-item btn btn-sm md:btn-md"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
    </div>
  )
}

