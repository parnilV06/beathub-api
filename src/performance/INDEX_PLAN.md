# Index Plan — Song Collection

## Recommended Indexes

### 1. `{ _id: -1 }`
- **Purpose**: Primary cursor-based pagination (sorted newest-first).
- **Note**: MongoDB creates an ascending `_id` index by default; a descending index further optimises the `sort({ _id: -1 })` query used by the pagination controller.

### 2. `{ artist: 1 }`
- **Purpose**: Speed up lookups when filtering or grouping songs by artist (used in the `top-artists` aggregation and `populate`).

### 3. `{ album: 1 }`
- **Purpose**: Efficient joins and lookups when filtering songs by album.

### 4. `{ createdAt: -1 }`
- **Purpose**: If time-based sorting/filtering is added in the future, this index will avoid a collection scan.

### 5. Compound Index `{ artist: 1, createdAt: -1 }`
- **Purpose**: Efficiently answers queries like "latest songs by artist X" with a single index scan.

## Creation Commands

```js
db.songs.createIndex({ _id: -1 });
db.songs.createIndex({ artist: 1 });
db.songs.createIndex({ album: 1 });
db.songs.createIndex({ createdAt: -1 });
db.songs.createIndex({ artist: 1, createdAt: -1 });
```

## Notes
- Monitor index usage with `db.songs.aggregate([{ $indexStats: {} }])`.
- Drop unused indexes to save storage and write overhead.
