const chatService = require('../services/chatService');

class ChatController {
    /**
     * Handle chat creation request
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async createChat(req, res) {
        try {
            console.log('=== Starting chat creation ===');
            console.log('Request params:', req.params);
            console.log('Request body:', JSON.stringify(req.body, null, 2));

            const { scopeId } = req.params;
            
            // Validate scopeId
            if (!scopeId) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required parameter',
                    details: 'scopeId is required'
                });
            }

            // Validate required fields
            const { conversation_id, user } = req.body;
            if (!conversation_id || !user || !user.id || !user.name) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                    details: 'conversation_id, user.id, and user.name are required'
                });
            }

            const result = await chatService.createChat(scopeId, req.body);

            console.log('=== Chat created successfully ===');
            console.log('Response:', result);

            res.json(result);
        } catch (error) {
            console.error('=== Error creating chat ===');
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });

            res.status(error.response?.status || 500).json({
                success: false,
                error: 'Failed to create chat',
                details: error.response?.data || error.message
            });
        }
    }

    /**
     * Handle get chat history request
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async getChatHistory(req, res) {
        try {
            console.log('=== Getting chat history ===');
            console.log('Request params:', req.params);
            console.log('Request query:', req.query);

            const { scopeId, chatId } = req.params;
            const { limit, offset } = req.query;

            if (!scopeId || !chatId) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required parameters: scopeId or chatId'
                });
            }

            const result = await chatService.getChatHistory(scopeId, chatId, {
                limit: parseInt(limit) || 50,
                offset: parseInt(offset) || 0
            });

            console.log('=== Chat history retrieved successfully ===');
            console.log('Response:', result);

            res.json(result);
        } catch (error) {
            console.error('=== Error getting chat history ===');
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });

            res.status(error.response?.status || 500).json({
                success: false,
                error: error.response?.data || 'Failed to get chat history',
                details: error.message
            });
        }
    }

    /**
     * Update message delivery status
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async updateMessageStatus(req, res) {
        try {
            const { scopeId, messageId } = req.params;
            const statusData = req.body;

            // Validate required fields
            if (!statusData.msgid || typeof statusData.delivery_status !== 'number') {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                    details: 'msgid and delivery_status are required'
                });
            }

            const result = await chatService.updateMessageStatus(scopeId, messageId, statusData);
            res.json(result);
        } catch (error) {
            console.error('Error in updateMessageStatus:', error);
            res.status(error.response?.status || 500).json({
                success: false,
                error: 'Failed to update message status',
                details: error.response?.data || error.message
            });
        }
    }

    /**
     * Link chat to an existing AmoCRM contact
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async linkChatToContact(req, res) {
        try {
            const { scopeId, chatId } = req.params;
            const linkData = req.body;

            // Validate required fields
            if (!linkData.contact_id) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required field',
                    details: 'contact_id is required'
                });
            }

            // Validate contact_id is a number
            if (!Number.isInteger(Number(linkData.contact_id))) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid field type',
                    details: 'contact_id must be a number'
                });
            }

            // Validate lead_id if provided
            if (linkData.lead_id && !Number.isInteger(Number(linkData.lead_id))) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid field type',
                    details: 'lead_id must be a number'
                });
            }

            const result = await chatService.linkChatToContact(scopeId, chatId, {
                contact_id: Number(linkData.contact_id),
                auto_create_lead: Boolean(linkData.auto_create_lead),
                lead_id: linkData.lead_id ? Number(linkData.lead_id) : undefined
            });

            res.json(result);
        } catch (error) {
            console.error('Error in linkChatToContact:', error);
            res.status(error.response?.status || 500).json({
                success: false,
                error: 'Failed to link chat to contact',
                details: error.response?.data || error.message
            });
        }
    }
}

module.exports = new ChatController(); 