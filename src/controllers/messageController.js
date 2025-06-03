const messageService = require('../services/messageService');

class MessageController {
    /**
     * Handle message sending request
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async sendMessage(req, res) {
        try {
            console.log('=== Starting message sending ===');
            console.log('Request params:', req.params);
            console.log('Request body:', JSON.stringify(req.body, null, 2));

            const { scopeId, chatId } = req.params;

            // Validate path parameters
            if (!scopeId || !chatId) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required parameters',
                    details: 'scopeId and chatId are required'
                });
            }

            // Generate a unique message ID if not provided
            const messageData = {
                ...req.body,
                message_id: req.body.message_id || `msg_${Date.now()}`
            };

            const result = await messageService.sendMessage(scopeId, chatId, messageData);

            console.log('=== Message sent successfully ===');
            console.log('Response:', result);

            res.json(result);
        } catch (error) {
            console.error('=== Error sending message ===');
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });

            res.status(error.response?.status || 500).json({
                success: false,
                error: 'Failed to send message',
                details: error.response?.data || error.message
            });
        }
    }
}

module.exports = new MessageController(); 