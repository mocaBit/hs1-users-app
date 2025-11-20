# HS1 Users App

A React + TypeScript application for managing and viewing user data from JSONPlaceholder API.

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hs1-users-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Simulate Network Delay

Test loading states by adding a delay before data fetching:

```typescript
// In src/views/Users.tsx
const { filteredData, data, isLoading, isError, applyFilter, clearFilter, hasActiveFilter } =
  useFilteredUsers({ simulateDelay: 2000 }); // 2 second delay
```

### Simulate Error State

Test error handling by forcing an error:

```typescript
// In src/views/Users.tsx
const { filteredData, data, isLoading, isError, applyFilter, clearFilter, hasActiveFilter } =
  useFilteredUsers({ simulateError: true });
```
