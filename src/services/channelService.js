const axios = require('axios');
const config = require('../config');
const { calculateSignature, calculateMD5 } = require('../utils/crypto');
const { getRFC2822Date } = require('../utils/date');

class ChannelService {
    /**
     * Connect a new channel
     * @returns {Promise<object>} Connection response
     */
    async connectChannel() {
        const method = 'POST';
        const contentType = 'application/json';
        const date = getRFC2822Date();
        const path = `/v2/origin/custom/${config.api.customOriginId}/connect`;
        const url = `${config.api.baseUrl}${path}`;

        const requestBody = {
            account_id: config.api.accountId,
            title: config.api.channelTitle,
            hook_api_version: config.api.hookApiVersion
        };

        const bodyJson = JSON.stringify(requestBody);
        const checksum = calculateMD5(bodyJson);
        const signature = calculateSignature(
            config.api.secret,
            method,
            checksum,
            contentType,
            date,
            path
        );

        const headers = {
            'Date': date,
            'Content-Type': contentType,
            'Content-MD5': checksum,
            'X-Signature': signature
        };

        try {
            const response = await axios({
                method,
                url,
                headers,
                data: requestBody,
                timeout: config.api.timeout
            });

            return {
                success: true,
                status: response.status,
                data: response.data
            };
        } catch (error) {
            console.error('Error connecting channel:', error.response?.data || error.message);
            throw error;
        }
    }

    /**
     * Create a new chat
     * @param {object} chatData - Chat creation data
     * @returns {Promise<object>} Chat creation response
     */
    async createChat(chatData) {
        const method = 'POST';
        const contentType = 'application/json';
        const date = getRFC2822Date();
        const path = `/v2/origin/custom/${config.api.customOriginId}/chats`;
        const url = `${config.api.baseUrl}${path}`;

        const requestBody = {
            conversation_id: chatData.conversation_id,
            user: chatData.user,
            account_id: chatData.account_id || config.api.accountId
        };

        const bodyJson = JSON.stringify(requestBody);
        const checksum = calculateMD5(bodyJson);
        const signature = calculateSignature(
            config.api.secret,
            method,
            checksum,
            contentType,
            date,
            path
        );

        const headers = {
            'Date': date,
            'Content-Type': contentType,
            'Content-MD5': checksum,
            'X-Signature': signature
        };

        try {
            const response = await axios({
                method,
                url,
                headers,
                data: requestBody,
                timeout: config.api.timeout
            });

            return {
                success: true,
                status: response.status,
                data: response.data
            };
        } catch (error) {
            console.error('Error creating chat:', error.response?.data || error.message);
            throw error;
        }
    }

    /**
     * Disconnect a channel
     * @param {string} channelId - Channel ID to disconnect
     * @param {string} accountId - Account ID
     * @returns {Promise<object>} Disconnect response
     */
    async disconnectChannel(channelId, accountId) {
        const method = 'DELETE';
        const contentType = 'application/json';
        const date = getRFC2822Date();
        const path = `/v2/origin/custom/${channelId}/disconnect`;
        const url = `${config.api.baseUrl}${path}`;

        const requestBody = {
            account_id: accountId
        };

        const bodyJson = JSON.stringify(requestBody);
        const checksum = calculateMD5(bodyJson);
        const signature = calculateSignature(
            config.api.secret,
            method,
            checksum,
            contentType,
            date,
            path
        );

        const headers = {
            'Date': date,
            'Content-Type': contentType,
            'Content-MD5': checksum,
            'X-Signature': signature
        };

        try {
            const response = await axios({
                method,
                url,
                headers,
                data: requestBody,
                timeout: config.api.timeout
            });

            return {
                success: true,
                status: response.status,
                data: response.data
            };
        } catch (error) {
            console.error('Error disconnecting channel:', error.response?.data || error.message);
            throw error;
        }
    }
}

module.exports = new ChannelService(); 