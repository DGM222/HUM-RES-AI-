# ================================================
# Stage 1: Base & Dependencies
# ================================================
FROM node:20-alpine AS base
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies 
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# --- REMOVED THE "RUN npx prisma generate" LINE FROM HERE ---

# ================================================
# Stage 2: Development
# ================================================
FROM base AS development
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ================================================
# Stage 3: Production Build
# ================================================
FROM base AS builder
RUN npm run build

# ================================================
# Stage 4: Serve Static Assets with Nginx
# ================================================
FROM nginx:stable-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]