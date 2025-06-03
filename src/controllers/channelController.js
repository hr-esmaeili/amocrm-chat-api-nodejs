const channelService = require('../services/channelService');

class ChannelController {
    /**
     * Handle channel connection request
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async connectChannel(req, res) {
        try {
            console.log('=== Starting channel connection ===');
            console.log('Request body:', JSON.stringify(req.body, null, 2));

            const result = await channelService.connectChannel();

            console.log('=== Channel connected successfully ===');
            console.log('Response:', result);

            res.json(result);
        } catch (error) {
            console.error('=== Error connecting channel ===');
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });

            res.status(error.response?.status || 500).json({
                success: false,
                error: error.response?.data || 'Failed to connect to Amojo channel',
                details: error.message
            });
        }
    }

    /**
     * Handle channel disconnection request
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async disconnectChannel(req, res) {
        try {
            console.log('=== Starting channel disconnection ===');
            console.log('Request params:', req.params);
            console.log('Request body:', JSON.stringify(req.body, null, 2));

            const { channelId } = req.params;
            const { account_id: accountId } = req.body;

            if (!channelId || !accountId) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required parameters: channelId or accountId'
                });
            }

            const result = await channelService.disconnectChannel(channelId, accountId);

            console.log('=== Channel disconnected successfully ===');
            console.log('Response:', result);

            res.json(result);
        } catch (error) {
            console.error('=== Error disconnecting channel ===');
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });

            res.status(error.response?.status || 500).json({
                success: false,
                error: error.response?.data || 'Failed to disconnect channel',
                details: error.message
            });
        }
    }
}

module.exports = new ChannelController(); 