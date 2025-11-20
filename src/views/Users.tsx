import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UsersList } from "../components/UsersList";
import { UsersGrid } from "../components/UsersGrid";
import { useFilteredUsers } from "../hooks/useFilteredUsers";
import { SearchInput } from "../components/SearchInput";
import "./Users.css";

type ViewMode = "grid" | "list";

export const UsersView = () => {
  const {
    filteredData,
    data,
    isLoading,
    isError,
    applyFilter,
    clearFilter,
    hasActiveFilter,
  } = useFilteredUsers();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      clearFilter();
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      applyFilter(
        (user) =>
          user.name.toLowerCase().includes(lowerSearchTerm) ||
          user.email.toLowerCase().includes(lowerSearchTerm) ||
          user.company.name.toLowerCase().includes(lowerSearchTerm)
      );
    }
  };

  const handleClearFilter = () => {
    clearFilter();
  };

  const toggleExpanded = (userId: number) => {
    setExpandedUserId((prev) => (prev === userId ? null : userId));
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading">
          <AiOutlineLoading3Quarters className="spinner" size={48} />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="error">
          <p>Error loading users. Please try again later.</p>
        </div>
      );
    }

    return viewMode === "grid" ? (
      <UsersGrid
        users={filteredData}
        expandedUserId={expandedUserId}
        onToggleExpand={toggleExpanded}
      />
    ) : (
      <UsersList
        users={filteredData}
        expandedUserId={expandedUserId}
        onToggleExpand={toggleExpanded}
      />
    );
  };

  return (
    <div className="users-view">
      <header className="users-header">
        <h1>Users Directory</h1>
        <p className="users-count">
          <AnimatePresence>
            {hasActiveFilter && (
              <motion.span
                className="filter-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Filtered
              </motion.span>
            )}
          </AnimatePresence>
        </p>
      </header>

      <div className="controls">
        <SearchInput
          onSearch={handleSearch}
          onClear={handleClearFilter}
          hasActiveFilter={hasActiveFilter}
        />

        <AnimatePresence>
          {!isLoading && !isError && filteredData.length !== data?.length && (
            <motion.div
              className="search-results-info"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              Showing {filteredData.length} of {data?.length ?? 0} users
            </motion.div>
          )}
        </AnimatePresence>

        <div className="view-toggle">
          <button
            onClick={() => setViewMode("grid")}
            className={`btn-view ${viewMode === "grid" ? "active" : ""}`}
            title="Grid View"
            disabled={isLoading}
          >
            <BsGrid3X3Gap size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`btn-view ${viewMode === "list" ? "active" : ""}`}
            title="List View"
            disabled={isLoading}
          >
            <FaList size={20} />
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};
