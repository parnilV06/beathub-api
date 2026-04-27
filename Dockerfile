# ---------------------------
# Stage 1: Builder
# ---------------------------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --only=production

# Copy entire project
COPY . .

# ---------------------------
# Stage 2: Runner
# ---------------------------
FROM node:18-alpine AS runner

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Set working directory
WORKDIR /home/appuser/app

# Copy only required files from builder (optimized)
COPY --from=builder --chown=appuser:appgroup /app ./

# Switch to non-root user
USER appuser

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "src/index.js"]