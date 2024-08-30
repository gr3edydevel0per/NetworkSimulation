#!/bin/bash

# Set the project name
PROJECT_NAME="network-simulation-project"


# Create the directory structure
mkdir -p \
    config \
    controllers \
    scripts \
    services \
    routes \
    sockets \
    utils \
    public

# Create the main files
touch app.js package.json README.md

# Create sample files in the directories
touch config/settings.js
touch controllers/mininetController.js controllers/socketController.js
touch scripts/mininetTopo.py scripts/startMininet.sh
touch services/mininetService.js services/socketService.js
touch routes/mininetRoutes.js routes/socketRoutes.js
touch sockets/index.js
touch utils/logger.js
touch public/index.html

echo "Directory structure created successfully!"
