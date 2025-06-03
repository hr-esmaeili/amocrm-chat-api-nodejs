const axios = require('axios');
const crypto = require('crypto');

class MessageServiceKommo {
    constructor() {
        this.baseURL = 'https://amojo.kommo.com';
        this.channelId = process.env.AMOJO_CUSTOM_ORIGIN_ID;
        this.secretKey = process.env.AMOJO_SECRET;

        if (!this.channelId) {
            throw new Error('AMOCRM_CHANNEL_ID environment variable is required');
        }

        if (!this.secretKey) {
            throw new Error('AMOCRM_SECRET_KEY environment variable is required');
        }

        this.client = axios.create({
            baseURL: this.baseURL
        });
    }

    /**
     * Generate required headers for Kommo Chat API
     * @param {object} body - Request body
     * @returns {object} - Headers object
     */
    generateHeaders(body) {
        const date = new Date().toUTCString();
        const contentMd5 = crypto
            .createHash('md5')
            .update(JSON.stringify(body))
            .digest('base64');

        const signatureString = [
            'POST',
            contentMd5,
            'application/json',
            date,
            `/v2/origin/custom/${this.channelId}/connect`
        ].join('\n');

        const signature = crypto
            .createHmac('sha1', this.secretKey)
            .update(signatureString)
            .digest('base64');

        return {
            'Date': date,
            'Content-Type': 'application/json',
            'Content-MD5': contentMd5,
            'X-Signature': signature
        };
    }

    /**
     * Connect channel to account
     * @param {string} accountId - The account ID
     * @returns {Promise<object>} - The response from the API
     */
    async connectChannel(accountId) {
        try {
            const body = {
                account_id: accountId
            };

            const headers = this.generateHeaders(body);
            
            const response = await this.client.post(
                `/v2/origin/custom/${this.channelId}/connect`,
                body,
                { headers }
            );

            return {
                success: true,
                status: response.status,
                data: response.data
            };
        } catch (error) {
            console.error('Error connecting channel:', error.response?.data || error.message);
            throw {
                success: false,
                status: error.response?.status || 500,
                error: error.response?.data || 'Failed to connect channel',
                details: error.message
            };
        }
    }

    /**
     * Create a new chat
     * @param {string} scopeId - The scope ID received from channel connection
     * @returns {Promise<object>} - The response from the API
     */
    async createChat(scopeId) {
        try {
            const body = {
                conversation_id: crypto.randomUUID()
            };

            const headers = this.generateHeaders(body);
            
            const response = await this.client.post(
                `/v2/origin/custom/${scopeId}/chats`,
                body,
                { headers }
            );

            return {
                success: true,
                status: response.status,
                data: response.data
            };
        } catch (error) {
            console.error('Error creating chat:', error.response?.data || error.message);
            throw {
                success: false,
                status: error.response?.status || 500,
                error: error.response?.data || 'Failed to create chat',
                details: error.message
            };
        }
    }

    /**
     * Send a message
     * @param {string} scopeId - The scope ID
     * @param {string} chatId - The chat ID
     * @param {object} messageData - The message data
     * @returns {Promise<object>} - The response from the API
     */
    async sendMessage(scopeId, chatId, messageData) {
        try {
            const body = {
                conversation_id: chatId,
                message: messageData.message,
                message_id: messageData.message_id || crypto.randomUUID(),
                sender: messageData.sender
            };

            const headers = this.generateHeaders(body);
            
            const response = await this.client.post(
                `/v2/origin/custom/${scopeId}/messages`,
                body,
                { headers }
            );

            return {
                success: true,
                status: response.status,
                data: response.data
            };
        } catch (error) {
            console.error('Error sending message:', error.response?.data || error.message);
            throw {
                success: false,
                status: error.response?.status || 500,
                error: error.response?.data || 'Failed to send message',
                details: error.message
            };
        }
    }
}

module.exports = new MessageServiceKommo(); 