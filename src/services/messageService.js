const axios = require('axios');
const config = require('../config');
const { calculateSignature, calculateMD5 } = require('../utils/crypto');
const { getRFC2822Date } = require('../utils/date');

class MessageService {
    /**
     * Save a text message
     * @param {string} receiverId - Receiver ID
     * @param {string} chatId - Chat ID
     * @param {string} text - Message text
     */
    async saveTextMessage(receiverId, chatId, text) {
        // Implement your text message saving logic here
        console.log('Saving text message:', { receiverId, chatId, text });
        // Example: Save to database, send notifications, etc.
    }

    /**
     * Save a picture message
     * @param {string} receiverId - Receiver ID
     * @param {string} chatId - Chat ID
     * @param {object} file - File information
     * @param {string} messageText - Message text
     */
    async savePictureMessage(receiverId, chatId, file, messageText) {
        // Implement your picture message saving logic here
        console.log('Saving picture message:', { receiverId, chatId, file, messageText });
        // Example: Save file to storage, save metadata to database, etc.
    }

    /**
     * Save a file message
     * @param {string} receiverId - Receiver ID
     * @param {string} chatId - Chat ID
     * @param {object} file - File information
     * @param {string} messageText - Message text
     */
    async saveFileMessage(receiverId, chatId, file, messageText) {
        // Implement your file message saving logic here
        console.log('Saving file message:', { receiverId, chatId, file, messageText });
        // Example: Save file to storage, save metadata to database, etc.
    }

    /**
     * Download a file from a URL
     * @param {string} url - File URL
     * @returns {Promise<object>} File information
     */
    async downloadFile(url) {
        try {
            const response = await axios({
                method: 'GET',
                url,
                responseType: 'arraybuffer',
                timeout: config.api.timeout
            });

            return {
                content: response.data,
                contentType: response.headers['content-type'],
                size: response.headers['content-length']
            };
        } catch (error) {
            console.error('Error downloading file:', error);
            throw new Error('Failed to download file');
        }
    }

    /**
     * Set error delivery status for a message
     * @param {string} messageId - Message ID
     */
    async setErrorDeliveryStatus(messageId) {
        // Implement your error status update logic here
        console.error('Setting error delivery status for message:', messageId);
        // Example: Update message status in database, send notification, etc.
    }

    /**
     * Send a message to a chat
     * @param {string} scopeId - Scope ID received when connecting channel to account
     * @param {string} chatId - Chat ID
     * @param {object} messageData - Message data
     * @param {string} messageData.message_id - Unique message ID
     * @param {object} messageData.message - Message content
     * @param {string} messageData.message.type - Message type (text, picture, etc.)
     * @param {string} messageData.message.text - Message text
     * @param {object} messageData.sender - Sender information
     * @param {string} messageData.sender.id - Sender ID
     * @param {string} messageData.sender.name - Sender name
     * @param {string} [messageData.sender.avatar] - Sender avatar URL
     * @returns {Promise<object>} Message sending response
     */
    async sendMessage(scopeId, chatId, messageData) {
        const method = 'POST';
        const contentType = 'application/json';
        const date = getRFC2822Date();
        const path = `/v2/origin/custom/${scopeId}/chats/${chatId}/messages`;
        const url = `${config.api.baseUrl}${path}`;

        // Validate required fields
        if (!messageData.message_id || !messageData.message || !messageData.sender) {
            throw new Error('Missing required fields: message_id, message, and sender are required');
        }

        if (!messageData.message.type || !messageData.message.text) {
            throw new Error('Missing required message fields: type and text are required');
        }

        if (!messageData.sender.id || !messageData.sender.name) {
            throw new Error('Missing required sender fields: id and name are required');
        }

        const requestBody = {
            message: {
                type: messageData.message.type,
                text: messageData.message.text,
                message_id: messageData.message_id
            },
            sender: {
                id: messageData.sender.id,
                name: messageData.sender.name
            }
        };

        // Add optional sender fields
        if (messageData.sender.avatar) {
            requestBody.sender.avatar = messageData.sender.avatar;
        }

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
            console.log('Making request to send message:', {
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
                timeout: config.api.timeout
            });

            return {
                success: true,
                status: response.status,
                data: response.data
            };
        } catch (error) {
            console.error('Error sending message:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                config: error.config
            });
            throw error;
        }
    }
}

module.exports = new MessageService(); 