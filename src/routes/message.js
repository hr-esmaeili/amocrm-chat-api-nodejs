const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const messageControllerKommo = require('../controllers/messageControllerKommo');

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management endpoints
 */

/**
 * @swagger
 * /chats/{scopeId}/{chatId}/messages:
 *   post:
 *     summary: Send a message to a chat
 *     description: Sends a new message to a specific chat
 *     tags: [Messages]
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
 *               - message
 *               - sender
 *             properties:
 *               message_id:
 *                 type: string
 *                 description: Unique message ID (will be auto-generated if not provided)
 *               message:
 *                 type: object
 *                 required:
 *                   - type
 *                   - text
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [text, picture, file]
 *                     description: Message type
 *                   text:
 *                     type: string
 *                     description: Message text content
 *               sender:
 *                 type: object
 *                 required:
 *                   - id
 *                   - name
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Sender ID in your system
 *                   name:
 *                     type: string
 *                     description: Sender name
 *                   avatar:
 *                     type: string
 *                     format: uri
 *                     description: Sender avatar URL
 *     responses:
 *       200:
 *         description: Message sent successfully
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
 *       404:
 *         description: Chat not found
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
router.post('/:scopeId/:chatId/messages', messageController.sendMessage.bind(messageController));

/**
 * @swagger
 * /chats/{scopeId}/{chatId}/messages/kommo:
 *   post:
 *     summary: Send a message to a chat using Kommo SDK
 *     description: Sends a new message to a specific chat using the Kommo (AmoCRM) SDK
 *     tags: [Messages]
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
 *               - message
 *               - sender
 *             properties:
 *               message_id:
 *                 type: string
 *                 description: Unique message ID (will be auto-generated if not provided)
 *               message:
 *                 type: object
 *                 required:
 *                   - type
 *                   - text
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [text, picture, file]
 *                     description: Message type
 *                   text:
 *                     type: string
 *                     description: Message text content
 *               sender:
 *                 type: object
 *                 required:
 *                   - id
 *                   - name
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Sender ID in your system
 *                   name:
 *                     type: string
 *                     description: Sender name
 *                   avatar:
 *                     type: string
 *                     format: uri
 *                     description: Sender avatar URL
 *     responses:
 *       200:
 *         description: Message sent successfully
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
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Chat not found
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
router.post('/:scopeId/:chatId/messages/kommo', messageControllerKommo.sendMessage.bind(messageControllerKommo));

module.exports = router; 