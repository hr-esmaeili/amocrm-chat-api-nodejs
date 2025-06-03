const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

/**
 * @swagger
 * /webhook:
 *   post:
 *     summary: Webhook endpoint for receiving messages
 *     description: Receives messages from AmoCRM chat system and queues them for processing
 *     tags: [Webhook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WebhookRequest'
 *     responses:
 *       202:
 *         description: Message accepted for processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 jobId:
 *                   type: string
 *                   example: "123"
 *       400:
 *         description: Bad request or invalid signature
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', webhookController.handleWebhook.bind(webhookController));

module.exports = router; 