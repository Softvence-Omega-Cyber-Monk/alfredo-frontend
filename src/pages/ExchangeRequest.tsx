import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchExchangeRequests } from "@/store/Slices/ExchangeRequestSlice/ExchangeRequestSlice";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import {
  Grid,
  List,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";
import { useNavigate } from "react-router-dom";

const ExchangeRequest = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { requests, loading, error } = useAppSelector(
    (state) => state.exchangeRequest
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [fromPropertyFilter, setFromPropertyFilter] = useState("");
  const [toPropertyFilter, setToPropertyFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchExchangeRequests());
  }, [dispatch]);

  // Filter and paginate requests
  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      // Status filter
      if (statusFilter !== "ALL" && request.status !== statusFilter) {
        return false;
      }

      // From property filter
      if (
        fromPropertyFilter &&
        request.fromProperty?.title !== fromPropertyFilter
      ) {
        return false;
      }

      // To property filter
      if (toPropertyFilter && request.toProperty?.title !== toPropertyFilter) {
        return false;
      }

      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          request.fromProperty?.title?.toLowerCase().includes(searchLower) ||
          request.toProperty?.title?.toLowerCase().includes(searchLower) ||
          request.fromUser?.fullName?.toLowerCase().includes(searchLower) ||
          request.toUser?.fullName?.toLowerCase().includes(searchLower) ||
          request.message?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [
    requests,
    statusFilter,
    fromPropertyFilter,
    toPropertyFilter,
    searchTerm,
  ]);

  // Get unique values for filter dropdowns
  const statusOptions = useMemo(() => {
    const statuses = [...new Set(requests.map((req) => req.status))];
    return ["ALL", ...statuses];
  }, [requests]);

  const fromPropertyOptions = useMemo(() => {
    const properties = requests
      .map((req) => req.fromProperty?.title)
      .filter(Boolean);
    return [...new Set(properties)];
  }, [requests]);

  const toPropertyOptions = useMemo(() => {
    const properties = requests
      .map((req) => req.toProperty?.title)
      .filter(Boolean);
    return [...new Set(properties)];
  }, [requests]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRequests, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetFilters = () => {
    setStatusFilter("ALL");
    setFromPropertyFilter("");
    setToPropertyFilter("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <CommonWrapper>
        <div className="p-4">Loading exchange requests...</div>
      </CommonWrapper>
    );
  }

  if (error) {
    return (
      <CommonWrapper>
        <div className="p-4 text-red-500">Error: {error}</div>
      </CommonWrapper>
    );
  }

  return (
    <CommonWrapper>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Exchange Requests</h1>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg ${
                showFilters ? "bg-blue-100 text-blue-600" : "bg-gray-100"
              }`}
            >
              <Filter size={20} />
            </button>

            {/* View Toggles */}
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* From Property Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Property
                </label>
                <select
                  value={fromPropertyFilter}
                  onChange={(e) => setFromPropertyFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Properties</option>
                  {fromPropertyOptions.map((property) => (
                    <option key={property} value={property}>
                      {property}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Property Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requested Property
                </label>
                <select
                  value={toPropertyFilter}
                  onChange={(e) => setToPropertyFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Properties</option>
                  {toPropertyOptions.map((property) => (
                    <option key={property} value={property}>
                      {property}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {currentItems.length} of {filteredRequests.length} requests
          {(statusFilter !== "ALL" ||
            fromPropertyFilter ||
            toPropertyFilter ||
            searchTerm) &&
            " (filtered)"}
        </div>

        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500 text-lg">No exchange requests found.</p>
            {(statusFilter !== "ALL" ||
              fromPropertyFilter ||
              toPropertyFilter ||
              searchTerm) && (
              <button
                onClick={resetFilters}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200 flex flex-col h-full"
              >
                <h3 className="font-semibold text-lg mb-2">
                  Request #{request.id.slice(0, 8)}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      request.status === "ACCEPTED"
                        ? "text-green-600"
                        : request.status === "REJECTED"
                        ? "text-red-600"
                        : request.status === "PENDING"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    {request.status}
                  </span>
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  Created: {new Date(request.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-auto pt-3 border-t border-gray-100">
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {request.message || "No message provided"}
                  </p>
                  <PrimaryButton
                    title="View Details"
                    className="w-full"
                    onClick={() => navigate(`/exchange-request/${request.id}`)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-3">
            {currentItems.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                      <h3 className="font-semibold text-lg">
                        Request #{request.id.slice(0, 8)}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === "ACCEPTED"
                            ? "bg-green-100 text-green-800"
                            : request.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : request.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-1">
                      {request.message || "No message provided"}
                    </p>
                  </div>
                  <div className="sm:ml-4">
                    <PrimaryButton
                      title="View Details"
                      className="px-4 py-2 whitespace-nowrap"
                      onClick={() =>
                        navigate(`/exchange-request/${request.id}`)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg border ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </CommonWrapper>
  );
};

export default ExchangeRequest;
