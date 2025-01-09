# Stage 1: Build
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Run
FROM node:18 AS production

WORKDIR /usr/src/app

# Copy only the production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built app from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose the port your app runs on
EXPOSE 3000

# Set the start command
CMD ["node", "dist/main.js"]
