const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Chat management endpoints
 */

/**
 * @swagger
 * /chats/{scopeId}:
 *   post:
 *     summary: Create a new chat
 *     description: Creates a new chat in the AmoCRM system
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: scopeId
 *         required: true
 *         description: Scope ID (received when connecting channel to account)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *     responses:
 *       200:
 *         description: Chat created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
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
router.post('/:scopeId', chatController.createChat.bind(chatController));

/**
 * @swagger
 * /chats/{scopeId}/{chatId}/history:
 *   get:
 *     summary: Get chat history
 *     description: Retrieves the message history for a specific chat
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: scopeId
 *         required: true
 *         description: Scope ID (received when connecting channel to account)
 *         schema:
 *           type: string
 *       - in: path
 *         name: chatId
 *         required: true
 *         description: Chat ID
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of messages to return (default: 50)
 *         schema:
 *           type: integer
 *           default: 50
 *       - in: query
 *         name: offset
 *         required: false
 *         description: Offset for pagination (default: 0)
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: Chat history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatHistoryResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid signature or authentication
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
router.get('/:scopeId/:chatId/history', chatController.getChatHistory.bind(chatController));

/**
 * @swagger
 * /chats/{scopeId}/{messageId}/delivery_status:
 *   post:
 *     summary: Update message delivery status
 *     description: Updates the delivery status of a specific message
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: scopeId
 *         required: true
 *         description: Scope ID (received when connecting channel to account)
 *         schema:
 *           type: string
 *       - in: path
 *         name: messageId
 *         required: true
 *         description: Message ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - msgid
 *               - delivery_status
 *             properties:
 *               msgid:
 *                 type: string
 *                 description: Message ID
 *               delivery_status:
 *                 type: number
 *                 description: Delivery status (-1 for error)
 *                 example: -1
 *               error_code:
 *                 type: number
 *                 description: Error code (required if delivery_status is -1)
 *                 example: 905
 *               error:
 *                 type: string
 *                 description: Error message (required if delivery_status is -1)
 *                 example: Error text
 *     responses:
 *       200:
 *         description: Message status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid signature or authentication
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
router.post('/:scopeId/:messageId/delivery_status', chatController.updateMessageStatus.bind(chatController));

/**
 * @swagger
 * /chats/{scopeId}/{chatId}/contact:
 *   post:
 *     summary: Link chat to an existing AmoCRM contact
 *     description: Links a chat to an existing contact in AmoCRM and optionally creates or links to a lead
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: scopeId
 *         required: true
 *         description: Scope ID (received when connecting channel to account)
 *         schema:
 *           type: string
 *       - in: path
 *         name: chatId
 *         required: true
 *         description: Chat ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contact_id
 *             properties:
 *               contact_id:
 *                 type: number
 *                 description: AmoCRM contact ID to link the chat to
 *                 example: 12345
 *               auto_create_lead:
 *                 type: boolean
 *                 description: Whether to automatically create a lead for this chat
 *                 default: false
 *                 example: true
 *               lead_id:
 *                 type: number
 *                 description: Existing lead ID to link (optional, ignored if auto_create_lead is true)
 *                 example: 67890
 *     responses:
 *       200:
 *         description: Chat linked to contact successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     contact:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           description: Contact ID
 *                           example: 12345
 *                     lead:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           description: Lead ID (if created or linked)
 *                           example: 67890
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid signature or authentication
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Contact not found
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
router.post('/:scopeId/:chatId/contact', chatController.linkChatToContact.bind(chatController));

module.exports = router; 