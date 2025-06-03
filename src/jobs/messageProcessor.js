const Queue = require('bull');
const axios = require('axios');
const crypto = require('crypto');

// Create message processing queue
const messageQueue = new Queue('message-processing', {
    redis: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || 'localhost',
    }
});

// Helper functions
async function downloadFile(url) {
    try {
        const response = await axios({
            method: 'GET',
            url,
            responseType: 'arraybuffer'
        });

        return {
            content: response.data,
            contentType: response.headers['content-type'],
            size: response.headers['content-length']
        };
    } catch (error) {
        console.error('Error downloading file:', error);
        throw new Error('Failed to download file');
    }
}

async function saveTextMessage(receiverId, chatId, text) {
    // Implement your text message saving logic here
    console.log('Saving text message:', { receiverId, chatId, text });
    // Example: Save to database, send notifications, etc.
}

async function savePictureMessage(receiverId, chatId, file, messageText) {
    // Implement your picture message saving logic here
    console.log('Saving picture message:', { receiverId, chatId, file, messageText });
    // Example: Save file to storage, save metadata to database, etc.
}

async function saveFileMessage(receiverId, chatId, file, messageText) {
    // Implement your file message saving logic here
    console.log('Saving file message:', { receiverId, chatId, file, messageText });
    // Example: Save file to storage, save metadata to database, etc.
}

async function setErrorDeliveryStatus(messageId) {
    // Implement your error status update logic here
    console.error('Setting error delivery status for message:', messageId);
    // Example: Update message status in database, send notification, etc.
}

// Process messages
messageQueue.process(async (job) => {
    console.log('=== Processing message job ===');
    console.log('Job data:', job.data);

    const {
        account_id: accountId,
        message: {
            message: { id: messageId, type: messageType, text: messageText, media: fileLink },
            conversation: { client_id: messageChatId, id: messageAmoCrmChatId },
            receiver: { id: receiverId }
        }
    } = job.data;

    try {
        console.log('Processing message:', {
            messageId,
            messageType,
            messageChatId,
            messageAmoCrmChatId,
            receiverId
        });

        switch (messageType) {
            case 'text':
                await saveTextMessage(receiverId, messageChatId, messageText);
                break;

            case 'picture':
                const pictureFile = await downloadFile(fileLink);
                await savePictureMessage(receiverId, messageChatId, pictureFile, messageText);
                break;

            case 'file':
                const downloadedFile = await downloadFile(fileLink);
                await saveFileMessage(receiverId, messageChatId, downloadedFile, messageText);
                break;

            default:
                await setErrorDeliveryStatus(messageId);
                throw new Error('Unsupported message type');
        }

        return { success: true, messageId };

    } catch (error) {
        console.error('=== Error processing message ===');
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });

        // Set error status and re-throw for Bull to handle
        await setErrorDeliveryStatus(messageId);
        throw error;
    }
});

// Handle completed jobs
messageQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result:`, result);
});

// Handle failed jobs
messageQueue.on('failed', (job, error) => {
    console.error(`Job ${job.id} failed with error:`, error);
});

module.exports = messageQueue; 