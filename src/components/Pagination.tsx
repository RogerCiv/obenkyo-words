"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [jumpToPage, setJumpToPage] = useState("")
  const [showJumpInput, setShowJumpInput] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const openModal = () => {
    setShowJumpInput(true)
    // Focus the input after a short delay to ensure the modal is visible
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 50)
  }

  const closeModal = () => {
    setShowJumpInput(false)
    setJumpToPage("")
  }

  const handleJumpToPage = () => {
    const pageNumber = Number.parseInt(jumpToPage)
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber)
      closeModal()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJumpToPage()
    } else if (e.key === "Escape") {
      closeModal()
    }
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal()
      }
    }

    if (showJumpInput) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showJumpInput])

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
          <button key="first-ellipsis" className="join-item btn btn-sm md:btn-md" onClick={openModal}>
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
          <button key="last-ellipsis" className="join-item btn btn-sm md:btn-md" onClick={openModal}>
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
    <div className="flex justify-center mt-4 relative">
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

      {/* Modal pequeño para saltar a una página específica */}
      {showJumpInput && (
        <div
          ref={modalRef}
          className="absolute bottom-[-100px] bg-base-200 shadow-lg rounded-box p-4 z-10 flex flex-col items-center"
        >
          <div className="text-sm mb-2">Ir a la página:</div>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="number"
              min="1"
              max={totalPages}
              className="input input-bordered input-sm w-20"
              value={jumpToPage}
              onChange={(e) => setJumpToPage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-sm btn-primary" onClick={handleJumpToPage}>
              Ir
            </button>
          </div>
          <div className="text-xs mt-1 opacity-70">(1-{totalPages})</div>
        </div>
      )}
    </div>
  )
}

