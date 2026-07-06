---
description: This file describes how to fetch data from the database using Drizzle ORM in this project.
applyTo: '**'
---
# Data fetching Guidelines
This document outlines the best practices for fetching data from the database using Drizzle ORM in this project. It is important to follow these guidelines to ensure consistency, maintainability, and performance across the codebase.

## 1. Use Server Components for Data Fetching
- Prefer using server components for data fetching to leverage server-side rendering and reduce client-side load.
- Avoid fetching data in client components unless absolutely necessary, as this can lead to increased bundle size and slower performance.

## 2. Data Fetching Functions
- Create dedicated data fetching functions in the `db` directory for each entity or table.
- Use Drizzle ORM's query builder methods to construct queries.


