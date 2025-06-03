const axios = require('axios');
const config = require('../config');
const { calculateSignature, calculateMD5 } = require('../utils/crypto');
const { getRFC2822Date } = require('../utils/date');

class ChatService {
    /**
     * Create a new chat or return existing one
     * @param {string} scopeId - Scope ID received when connecting channel to account
     * @param {object} chatData - Chat creation data
     * @param {string} chatData.conversation_id - Unique conversation ID from your system
     * @param {object} chatData.user - User information
     * @param {string} chatData.user.id - User ID in your system
     * @param {string} chatData.user.name - User name
     * @param {string} [chatData.user.avatar] - User avatar URL
     * @param {string} [chatData.user.phone] - User phone number
     * @param {string} [chatData.user.email] - User email
     * @param {object} [chatData.custom_fields] - Additional chat metadata
     * @returns {Promise<object>} Chat creation response
     */
    async createChat(scopeId, chatData) {
        const method = 'POST';
        const contentType = 'application/json';
        const date = getRFC2822Date();

        // Validate scopeId
        if (!scopeId) {
            throw new Error('scopeId is required');
        }

        // Construct the correct path
        const path = `/v2/origin/custom/${scopeId}/chats`;
        const url = `${config.api.baseUrl}${path}`;

        // Log configuration for debugging
        console.log('API Configuration:', {
            baseUrl: config.api.baseUrl,
            scopeId: scopeId,
            path: path,
            fullUrl: url
        });

        // Validate required fields
        if (!chatData.conversation_id || !chatData.user || !chatData.user.id || !chatData.user.name) {
            throw new Error('Missing required fields: conversation_id, user.id, and user.name are required');
        }

        const requestBody = {
            conversation_id: chatData.conversation_id,
            user: {
                id: chatData.user.id,
                name: chatData.user.name
            }
        };

        // Add optional user fields if provided
        if (chatData.user.avatar) requestBody.user.avatar = chatData.user.avatar;
        if (chatData.user.phone) requestBody.user.phone = chatData.user.phone;
        if (chatData.user.email) requestBody.user.email = chatData.user.email;

        // Add custom fields if provided
        if (chatData.custom_fields) {
            requestBody.custom_fields = chatData.custom_fields;
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
            console.log('Making request to create chat:', {
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
            // Enhanced error logging
            console.error('Error creating chat:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                config: error.config,
                url: error.config?.url,
                headers: error.config?.headers
            });

            if (error.response?.status === 404) {
                throw new Error(`Endpoint not found. Please verify your scopeId and baseUrl. Full URL: ${url}`);
            }
            throw error;
        }
    }

    /**
     * Get chat history
     * @param {string} scopeId - Scope ID (received when connecting channel to account)
     * @param {string} chatId - Chat ID
     * @param {object} options - Query options
     * @param {number} options.limit - Number of messages to return (default: 50)
     * @param {number} options.offset - Offset for pagination (default: 0)
     * @returns {Promise<object>} Chat history response
     */
    async getChatHistory(scopeId, chatId, options = {}) {
        const method = 'GET';
        const contentType = 'application/json';
        const date = getRFC2822Date();
        const path = `/v2/origin/custom/${scopeId}/chats/${chatId}/history`;
        
        // Build query parameters
        const queryParams = new URLSearchParams({
            limit: options.limit || 50,
            offset: options.offset || 0
        }).toString();

        const url = `${config.api.baseUrl}${path}?${queryParams}`;

        // For GET requests with no body, we calculate checksum of empty string
        const checksum = calculateMD5('');
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
            console.log('Making request to get chat history:', {
                method,
                url,
                headers
            });

            const response = await axios({
                method,
                url,
                headers,
                timeout: config.api.timeout
            });

            return {
                success: true,
                status: response.status,
                data: response.data
            };
        } catch (error) {
            console.error('Error getting chat history:', error.response?.data || error.message);
            throw error;
        }
    }

    /**
     * Update message delivery status
     * @param {string} scopeId - Scope ID (received when connecting channel to account)
     * @param {string} messageId - Message ID
     * @param {object} statusData - Status update data
     * @param {string} statusData.msgid - Message ID
     * @param {number} statusData.delivery_status - Delivery status (-1 for error)
     * @param {number} statusData.error_code - Error code (if delivery_status is -1)
     * @param {string} statusData.error - Error message (if delivery_status is -1)
     * @returns {Promise<object>} Status update response
     */
    async updateMessageStatus(scopeId, messageId, statusData) {
        const method = 'POST';
        const contentType = 'application/json';
        const date = getRFC2822Date();
        const path = `/v2/origin/custom/${scopeId}/${messageId}/delivery_status`;
        const url = `${config.api.baseUrl}${path}`;

        const requestBody = {
            msgid: statusData.msgid,
            delivery_status: statusData.delivery_status,
            error_code: statusData.error_code,
            error: statusData.error
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
            console.log('Making request to update message status:', {
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
            console.error('Error updating message status:', error.response?.data || error.message);
            throw error;
        }
    }

    /**
     * Link a chat to an existing AmoCRM contact
     * @param {string} scopeId - Scope ID (received when connecting channel to account)
     * @param {string} chatId - Chat ID
     * @param {object} linkData - Data for linking
     * @param {number} linkData.contact_id - AmoCRM contact ID
     * @param {boolean} [linkData.auto_create_lead=false] - Whether to automatically create a lead
     * @param {number} [linkData.lead_id] - Existing lead ID to link (optional)
     * @returns {Promise<object>} Link response
     */
    async linkChatToContact(scopeId, chatId, linkData) {
        const method = 'POST';
        const contentType = 'application/json';
        const date = getRFC2822Date();
        const path = `/v2/origin/custom/${scopeId}/chats/${chatId}/contact`;
        const url = `${config.api.baseUrl}${path}`;

        const requestBody = {
            contact_id: linkData.contact_id,
            auto_create_lead: linkData.auto_create_lead || false
        };

        // Add lead_id if provided
        if (linkData.lead_id) {
            requestBody.lead_id = linkData.lead_id;
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
            console.log('Making request to link chat to contact:', {
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
            console.error('Error linking chat to contact:', error.response?.data || error.message);
            throw error;
        }
    }
}

module.exports = new ChatService(); 