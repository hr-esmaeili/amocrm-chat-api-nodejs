require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const config = require('./config');

// Import routes
const webhookRoutes = require('./routes/webhook');
const channelRoutes = require('./routes/channel');
const chatRoutes = require('./routes/chat');
const messageRoutes = require('./routes/message');

const app = express();
const { port } = config;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount routes
app.use('/webhook', webhookRoutes);
app.use('/channels', channelRoutes);
app.use('/chats', chatRoutes);
app.use('/chats', messageRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`API Documentation available at http://localhost:${port}/api-docs`);
    console.log('Environment:', {
        baseUrl: config.api.baseUrl,
        customOriginId: config.api.customOriginId,
        channelTitle: config.api.channelTitle,
        hookApiVersion: config.api.hookApiVersion,
        timeout: config.api.timeout
    });
}); 