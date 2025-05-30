require('dotenv').config();
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

// Environment configuration
const envConfig = {
    required: {
        AMOJO_SECRET: 'Amojo API secret key',
        AMOJO_BASE_URL: 'Amojo API base URL',
        AMOJO_CUSTOM_ORIGIN_ID: 'Custom origin ID',
        AMOJO_ACCOUNT_ID: 'Account ID',
        AMOJO_CHANNEL_TITLE: 'Channel title',
        AMOJO_HOOK_API_VERSION: 'Hook API version'
    },
    optional: {
        PORT: 3000,
        API_TIMEOUT: 5000
    }
};

// Validate environment variables and get config
const config = Object.entries(envConfig.required)
    .reduce((acc, [key, description]) => {
        if (!process.env[key]) {
            throw new Error(`Missing ${description} in environment variables (${key})`);
        }
        return { ...acc, [key]: process.env[key] };
    }, {
        PORT: process.env.PORT || envConfig.optional.PORT,
        API_TIMEOUT: parseInt(process.env.API_TIMEOUT || envConfig.optional.API_TIMEOUT, 10)
    });

const app = express();
const { PORT, API_TIMEOUT } = config;

// Middleware to parse JSON bodies
app.use(express.json());

// Helper function to generate RFC2822 date
function getRFC2822Date() {
    return new Date().toUTCString();
}

// Helper function to calculate signature
function calculateSignature(method, checksum, contentType, date, path) {
    const str = [
        method.toUpperCase(),
        checksum,
        contentType,
        date,
        path
    ].join('\n');

    return crypto.createHmac('sha1', config.AMOJO_SECRET)
        .update(str)
        .digest('hex')
        .toLowerCase();
}

// Example endpoint to connect to Amojo channel
app.post('/connect-channel', async (req, res) => {
    try {
        const method = 'POST';
        const contentType = 'application/json';
        const date = getRFC2822Date();
        const path = `/v2/origin/custom/${config.AMOJO_CUSTOM_ORIGIN_ID}/connect`;
        const url = `${config.AMOJO_BASE_URL}${path}`;

        const requestBody = {
            account_id: config.AMOJO_ACCOUNT_ID,
            title: config.AMOJO_CHANNEL_TITLE,
            hook_api_version: config.AMOJO_HOOK_API_VERSION
        };

        const bodyJson = JSON.stringify(requestBody);
        const checksum = crypto.createHash('md5')
            .update(bodyJson)
            .digest('hex')
            .toLowerCase();

        const signature = calculateSignature(method, checksum, contentType, date, path);

        const headers = {
            'Date': date,
            'Content-Type': contentType,
            'Content-MD5': checksum,
            'X-Signature': signature
        };

        console.log('Request details:', {
            method,
            url,
            headers,
            body: requestBody
        });

        const response = await axios({
            method,
            url,
            headers,
            data: requestBody,
            timeout: API_TIMEOUT
        });

        console.log('Response:', {
            status: response.status,
            data: response.data
        });

        res.json({
            success: true,
            status: response.status,
            data: response.data
        });

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            success: false,
            error: error.response?.data || 'Failed to connect to Amojo channel'
        });
    }
});

// Example endpoint to get channel information
app.get('/channel/:channelId', async (req, res) => {
    try {
        const { channelId } = req.params;
        
        // Example API call to get channel information
        const response = await axios.get(`${config.AMOJO_BASE_URL}/channels/${channelId}`);

        res.json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Error fetching channel:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data || 'Failed to fetch channel information'
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', {
        baseUrl: config.AMOJO_BASE_URL,
        customOriginId: config.AMOJO_CUSTOM_ORIGIN_ID,
        channelTitle: config.AMOJO_CHANNEL_TITLE,
        hookApiVersion: config.AMOJO_HOOK_API_VERSION,
        timeout: API_TIMEOUT
    });
}); 