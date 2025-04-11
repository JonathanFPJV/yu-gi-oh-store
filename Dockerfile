# Use Ubuntu as the base image
FROM ubuntu:20.04

# Set environment variables to avoid interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install required packages
RUN apt-get update && \
    apt-get install -y curl git mysql-server && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set up MySQL
RUN service mysql start && \
    mysql -e "CREATE DATABASE IF NOT EXISTS yu_gi_oh_store;"

# Clone the repository
RUN git clone https://github.com/JonathanFPJV/yu-gi-oh-store.git /app

# Set the working directory
WORKDIR /app

# Install Node.js dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]