import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationCard({ currentPage, onPageChange, totalPages }: PaginationProps) {
  // Genera dinámicamente los números de página
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 2) {
        endPage = 3
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2
      }

      if (startPage > 2) {
        pageNumbers.push("...")
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }
      pageNumbers.push(totalPages)
    }
    return pageNumbers
  }

  return (
    <Pagination className="flex justify-center items-center mt-6 gap-1">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) onPageChange(currentPage - 1)
            }}
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(page)
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) onPageChange(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
