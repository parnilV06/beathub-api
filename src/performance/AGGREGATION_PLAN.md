# Aggregation Optimisation Plan

## Overview
This document describes optimisation strategies for the aggregation pipelines used in the BeatHub API.

---

## 1. `top-artists` Pipeline

### Current Pipeline
`$group` → `$sort` → `$limit` → `$lookup` → `$unwind` → `$project`

### Optimisation Tips

| Strategy | Detail |
|---|---|
| **Filter early** | Add a `$match` stage *before* `$group` to reduce the working set (e.g., filter by date range). |
| **Index on `artist`** | Ensures the `$group` stage can use an index scan instead of a collection scan. |
| **`$limit` before `$lookup`** | Already implemented — keeps the `$lookup` to only the top N documents. |
| **`allowDiskUse`** | Pass `{ allowDiskUse: true }` if the dataset exceeds 100 MB RAM limit for in-memory sorts. |

---

## 2. `user-activity` Pipeline

### Current Pipeline
`$group` → `$sort` → `$limit` → `$lookup` → `$unwind` → `$project`

### Optimisation Tips

| Strategy | Detail |
|---|---|
| **Index on `user`** | Speeds up the `$group` by `user` stage. |
| **Avoid `$size` on large arrays** | If playlists can grow very large, consider storing a pre-computed `songCount` field. |
| **Materialised views** | For dashboards, consider creating a materialised collection via `$out` or `$merge` on a schedule. |

---

## General Best Practices

1. **Use `explain("executionStats")`** to verify index usage:
   ```js
   db.songs.explain("executionStats").aggregate([...])
   ```
2. **Avoid `$unwind` on large arrays** — reshape only after `$limit`.
3. **Consider `$facet`** for combining multiple analytics queries in one round-trip.
4. **Monitor with Atlas Profiler** or `db.setProfilingLevel(1, { slowms: 50 })`.
