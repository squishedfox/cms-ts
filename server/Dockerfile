# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first (to take advantage of Docker cache)
COPY package*.json ./

# Install dependencies (including typescript and other dev dependencies)
RUN npm install

# Install TypeScript globally to be able to run tsc
RUN npm install -g typescript

# Copy the rest of the application files, excluding node_modules
COPY . .

# Build the TypeScript code
RUN tsc

# Expose the port the app runs on
EXPOSE 3000

# Command to run your application after it is compiled
CMD ["node", "dist/index.js"]

