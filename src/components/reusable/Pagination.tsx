import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

type PageItem = number | "dots";

// 1 … 4 5 6 … 12 — always keep the first/last page and a window around the current one.
const buildPageItems = (currentPage: number, totalPages: number): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: PageItem[] = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) items.push("dots");
  for (let page = start; page <= end; page++) items.push(page);
  if (end < totalPages - 1) items.push("dots");

  items.push(totalPages);
  return items;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const items = buildPageItems(currentPage, totalPages);
  const arrowClass =
    "flex items-center justify-center w-9 h-9 rounded-full border border-primary-border-color text-primary-blue transition-colors cursor-pointer hover:bg-primary-gray-bg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent";

  return (
    <nav
      aria-label="Places pagination"
      className="flex items-center justify-center gap-2 mt-10 flex-wrap"
    >
      <button
        type="button"
        className={arrowClass}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {items.map((item, index) =>
        item === "dots" ? (
          <span
            key={`dots-${index}`}
            className="w-9 h-9 flex items-center justify-center text-dark-3 select-none"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            disabled={disabled}
            aria-current={item === currentPage ? "page" : undefined}
            className={`w-9 h-9 rounded-full text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed ${
              item === currentPage
                ? "bg-primary-blue text-white"
                : "border border-primary-border-color text-dark-2 hover:bg-primary-gray-bg"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        className={arrowClass}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default Pagination;
