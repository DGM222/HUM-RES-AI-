FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files (prisma, src, etc.)
COPY . .

# FIXED: Inject a dummy build-time variable so Prisma 7 can compile without crashing
ENV DATABASE_URL="file:./dev.db"

# Generate Prisma client so database queries work inside the container
RUN npx prisma generate

EXPOSE 5000

CMD ["node", "src/server.js"]