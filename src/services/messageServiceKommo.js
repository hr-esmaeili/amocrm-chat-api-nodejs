const AmoCRM = require('amocrm-js');

class MessageServiceKommo {
    constructor() {
        this.client = new AmoCRM({
            domain: process.env.AMOCRM_DOMAIN,
            auth: {
                client_id: process.env.AMOCRM_CLIENT_ID,
                client_secret: process.env.AMOCRM_CLIENT_SECRET,
                redirect_uri: process.env.AMOCRM_REDIRECT_URI,
                server: {
                    port: 3000
                }
            }
        });
    }

    /**
     * Send a message using Kommo SDK
     * @param {string} scopeId - The scope ID
     * @param {string} chatId - The chat ID
     * @param {object} messageData - The message data
     * @returns {Promise<object>} - The response from the API
     */
    async sendMessage(scopeId, chatId, messageData) {
        try {
            await this.client.connection.connect();

            const response = await this.client.request.post(`/api/v4/messenger/chats/${chatId}/messages`, {
                scope_id: scopeId,
                message: messageData.message,
                message_id: messageData.message_id,
                sender: messageData.sender
            });

            return {
                success: true,
                status: 200,
                data: response.data
            };
        } catch (error) {
            console.error('Error sending message with Kommo SDK:', error);
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