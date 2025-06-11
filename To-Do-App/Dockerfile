# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build TypeScript code
#RUN npm run build

# Expose the backend port
EXPOSE 8000

# Start the compiled app
CMD ["npm", "run", "dev"]
