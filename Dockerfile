# ================================================
# Stage 1: Build & Development Environment
# ================================================
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies first (utilizing Docker layer caching)
COPY package*.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# ================================================
# Stage 2: Production Build
# ================================================
FROM base AS builder
RUN npm run build

# ================================================
# Stage 3: Serve Static Assets with Nginx
# ================================================
FROM nginx:stable-alpine AS production

# Copy built assets from the builder stage to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom nginx configuration if needed, or stick to default port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]