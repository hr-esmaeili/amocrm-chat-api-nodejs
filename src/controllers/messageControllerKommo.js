const messageServiceKommo = require('../services/messageServiceKommo');

class MessageControllerKommo {
    /**
     * Send a message using Kommo SDK
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async sendMessage(req, res) {
        try {
            console.log('=== Starting message send with Kommo SDK ===');
            console.log('Request params:', req.params);
            console.log('Request body:', JSON.stringify(req.body, null, 2));

            const { scopeId, chatId } = req.params;
            const messageData = req.body;

            // Validate required fields
            if (!messageData.message?.type || !messageData.message?.text) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required message fields: type or text'
                });
            }

            if (!messageData.sender?.id || !messageData.sender?.name) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required sender fields: id or name'
                });
            }

            const result = await messageServiceKommo.sendMessage(scopeId, chatId, messageData);

            console.log('=== Message sent successfully with Kommo SDK ===');
            console.log('Response:', result);

            res.json(result);
        } catch (error) {
            console.error('=== Error sending message with Kommo SDK ===');
            console.error('Error details:', error);

            res.status(error.status || 500).json({
                success: false,
                error: error.error || 'Failed to send message',
                details: error.details || error.message
            });
        }
    }
}

module.exports = new MessageControllerKommo(); 