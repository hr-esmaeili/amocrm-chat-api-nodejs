require('dotenv').config();

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
        API_TIMEOUT: 5000,
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379
    }
};

// Validate and get configuration
const config = Object.entries(envConfig.required)
    .reduce((acc, [key, description]) => {
        if (!process.env[key]) {
            throw new Error(`Missing ${description} in environment variables (${key})`);
        }
        return { ...acc, [key]: process.env[key] };
    }, {
        PORT: parseInt(process.env.PORT || envConfig.optional.PORT, 10),
        API_TIMEOUT: parseInt(process.env.API_TIMEOUT || envConfig.optional.API_TIMEOUT, 10),
        REDIS_HOST: process.env.REDIS_HOST || envConfig.optional.REDIS_HOST,
        REDIS_PORT: parseInt(process.env.REDIS_PORT || envConfig.optional.REDIS_PORT, 10)
    });

module.exports = {
    port: config.PORT,
    api: {
        timeout: config.API_TIMEOUT,
        baseUrl: config.AMOJO_BASE_URL,
        secret: config.AMOJO_SECRET,
        customOriginId: config.AMOJO_CUSTOM_ORIGIN_ID,
        accountId: config.AMOJO_ACCOUNT_ID,
        channelTitle: config.AMOJO_CHANNEL_TITLE,
        hookApiVersion: config.AMOJO_HOOK_API_VERSION
    },
    redis: {
        host: config.REDIS_HOST,
        port: config.REDIS_PORT
    }
}; 