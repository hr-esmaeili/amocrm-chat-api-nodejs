const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');

/**
 * @swagger
 * /channels/connect:
 *   post:
 *     summary: Connect a new channel
 *     description: Connects a new channel to the AmoCRM chat system
 *     tags: [Channels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConnectChannelRequest'
 *     responses:
 *       200:
 *         description: Channel connected successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConnectChannelResponse'
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
router.post('/connect', channelController.connectChannel.bind(channelController));

/**
 * @swagger
 * /channels/{channelId}/disconnect:
 *   delete:
 *     summary: Disconnect a channel
 *     description: Disconnects a channel from the AmoCRM chat system
 *     tags: [Channels]
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         description: ID of the channel to disconnect
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account_id
 *             properties:
 *               account_id:
 *                 type: string
 *                 description: Account ID
 *     responses:
 *       200:
 *         description: Channel disconnected successfully
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
router.delete('/:channelId/disconnect', channelController.disconnectChannel.bind(channelController));

module.exports = router; 