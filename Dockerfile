# Use an official Python image
FROM python:3.11-slim AS base

# Install system dependencies for Python and Node.js
RUN apt-get update && apt-get install -y curl build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# --- Frontend Stage ---
# Copy and build frontend
COPY frontend/ frontend/
WORKDIR /app/frontend
RUN npm install && npm run build

# --- Backend Stage ---
WORKDIR /app
COPY backend/ backend/
# Copy frontend build to backend
RUN cp -r frontend/build backend/build

# Set working directory to backend and install Python deps
WORKDIR /app/backend
RUN pip install --no-cache-dir -r requirements.txt

# Expose port and run using gunicorn
EXPOSE 8000
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:8000"]
