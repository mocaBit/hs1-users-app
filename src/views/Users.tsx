import { useState } from "react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaList } from "react-icons/fa";
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
  const [expandedUsers, setExpandedUsers] = useState<number[]>([]);

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
    setExpandedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  if (isLoading) {
    return (
      <div className="users-view">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="users-view">
        <div className="error">
          Error loading users. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="users-view">
      <header className="users-header">
        <h1>Users Directory</h1>
        <p className="users-count">
          {hasActiveFilter && <span className="filter-badge">Filtered</span>}
        </p>
      </header>

      <div className="controls">
        <SearchInput
          onSearch={handleSearch}
          onClear={handleClearFilter}
          hasActiveFilter={hasActiveFilter}
        />

        {filteredData.length !== data?.length && (
          <div className="search-results-info">
            Showing {filteredData.length} of {data?.length ?? 0} users
          </div>
        )}

        <div className="view-toggle">
          <button
            onClick={() => setViewMode("grid")}
            className={`btn-view ${viewMode === "grid" ? "active" : ""}`}
            title="Grid View"
          >
            <BsGrid3X3Gap size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`btn-view ${viewMode === "list" ? "active" : ""}`}
            title="List View"
          >
            <FaList size={20} />
          </button>
        </div>
      </div>
      {viewMode === "grid" ? (
        <UsersGrid
          users={filteredData}
          expandedUsers={expandedUsers}
          onToggleExpand={toggleExpanded}
        />
      ) : (
        <UsersList
          users={filteredData}
          expandedUsers={expandedUsers}
          onToggleExpand={toggleExpanded}
        />
      )}
    </div>
  );
};
