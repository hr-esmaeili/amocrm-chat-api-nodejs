const config = require('../config');
const { verifyWebhookSignature } = require('../utils/crypto');
const messageQueue = require('../jobs/messageProcessor');

class WebhookController {
    /**
     * Handle incoming webhook request
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async handleWebhook(req, res) {
        try {
            console.log('=== Received webhook request ===');
            console.log('Headers:', req.headers);
            console.log('Body:', JSON.stringify(req.body, null, 2));

            // Verify webhook signature
            verifyWebhookSignature(
                config.api.secret,
                req.headers['x-signature'],
                req.body
            );

            // Add job to queue
            const job = await messageQueue.add(req.body, {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 2000
                },
                removeOnComplete: false,
                removeOnFail: false
            });

            console.log('Job added to queue:', job.id);

            // Return 202 Accepted
            res.status(202).json({
                success: true,
                jobId: job.id
            });

        } catch (error) {
            console.error('=== Error queuing webhook message ===');
            console.error('Error details:', {
                message: error.message,
                stack: error.stack
            });

            const statusCode = error.message.includes('signature') ? 400 : 500;
            res.status(statusCode).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = new WebhookController(); 