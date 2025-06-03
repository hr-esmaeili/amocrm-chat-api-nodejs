# AmoCRM Chat API

Node.js implementation of the AmoCRM Chat API for integrating external chat systems with AmoCRM.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
    - [Channel Operations](#channel-operations)
      - [Connect Channel](#connect-channel)
      - [Disconnect Channel](#disconnect-channel)
    - [Chat Operations](#chat-operations)
      - [Create Chat](#create-chat)
      - [Get Chat History](#get-chat-history)
      - [Update Message Status](#update-message-status)
    - [Link Chat to Contact](#link-chat-to-contact)
- [Webhook Integration](#webhook-integration)
  - [Setup](#webhook-setup)
  - [Events](#webhook-events)
  - [Message Format](#webhook-message-format)
  - [Security](#webhook-security)
- [Complete Workflow](#complete-workflow)
- [Development](#development)
- [Error Handling](#error-handling)
- [Example Workflows](#example-workflows)
  - [Sending Messages Workflow](#sending-messages-workflow)

## Installation

   ```bash
# Clone the repository
git clone https://github.com/yourusername/amocrm-chat-api-nodejs.git

# Install dependencies
   npm install

# Start the server
npm start
```

## Configuration

Create a `config.js` file in the `src` directory with the following structure:

```javascript
module.exports = {
    api: {
        baseUrl: 'https://amojo.amocrm.ru',
        secret: 'your_channel_secret_key',
        timeout: 5000 // Request timeout in milliseconds
    },
    server: {
        port: 3000
    }
};
```

## API Documentation

### Authentication

All requests to the API must be authenticated using a signature-based authentication system. The following headers are required:

- `Date`: Current date in RFC2822 format
- `Content-Type`: Always 'application/json'
- `Content-MD5`: MD5 hash of the request body (empty string for GET requests)
- `X-Signature`: HMAC signature of the request

The signature is calculated using:
- Channel secret key
- HTTP method
- Content-MD5 hash
- Content-Type
- Date
- Request path

### Endpoints

#### Channel Operations

##### Connect Channel

Connects your external chat system to AmoCRM by registering a new channel.

```http
POST /v2/origin/custom/connect
Content-Type: application/json
```

Request body:
```json
{
    "account_id": "your_account_id",
    "title": "Your Channel Name",
    "hook_api_version": "v2",
    "webhook_url": "https://your-domain.com/webhooks/amocrm"
}
```

Response:
```json
{
    "success": true,
    "status": 200,
    "data": {
        "scope_id": "344a5002-f8ca-454d-af3d-396180102ac7_52e591f7-c98f-4255-8495-827210138c81",
        "client_secret": "your_client_secret"
    }
}
```

Important fields:
- `account_id`: Your AmoCRM account ID
- `title`: Display name for your channel in AmoCRM
- `hook_api_version`: API version for webhooks (use "v2")
- `webhook_url`: URL where AmoCRM will send webhook events

The returned `scope_id` and `client_secret` are required for all subsequent API calls.

##### Disconnect Channel

Disconnects your channel from AmoCRM.

```http
DELETE /v2/origin/custom/{scope_id}/disconnect
```

Parameters:
- `scope_id`: The scope ID received when connecting the channel

Response:
```json
{
    "success": true,
    "status": 200,
    "data": {}
}
```

#### Chat Operations

##### Create Chat

Creates a new chat or returns an existing one.

```http
POST /v2/origin/custom/{scope_id}/chats
Content-Type: application/json
```

Parameters:
- `scope_id`: The scope ID received when connecting the channel

Request body:
```json
{
    "conversation_id": "unique_conversation_id",
    "user": {
        "id": "external_user_id",
        "name": "John Doe",
        "avatar": "https://example.com/avatar.jpg"  // Optional
    },
    "custom_fields": {  // Optional
        "source": "telegram",
        "phone": "+1234567890"
    }
}
```

Response:
```json
{
    "success": true,
    "status": 200,
    "data": {
        "chat_id": "chat_12345",
        "conversation": {
            "id": "unique_conversation_id",
            "created_at": "2024-03-20T10:00:00Z"
        }
    }
}
```

Important notes:
1. The `conversation_id` should be unique for each conversation in your external system
2. User information will be displayed in AmoCRM's chat interface
3. Custom fields can be used to store additional metadata
4. The same conversation_id will return the existing chat if one exists

Example with all optional fields:
```json
{
    "conversation_id": "telegram_chat_123",
    "user": {
        "id": "tg_user_456",
        "name": "John Doe",
        "avatar": "https://example.com/avatar.jpg",
        "phone": "+1234567890",  // Optional
        "email": "john@example.com"  // Optional
    },
    "custom_fields": {
        "source": "telegram",
        "language": "en",
        "timezone": "UTC+3",
        "platform": "android",
        "tags": ["vip", "support"]
    }
}
```

#### Get Chat History

Retrieves message history for a specific chat.

```http
GET /chats/:scopeId/:chatId/history?limit=50&offset=0
```

Parameters:
- `scopeId`: Scope ID received when connecting channel to account
- `chatId`: Chat ID
- `limit` (optional): Number of messages to return (default: 50)
- `offset` (optional): Offset for pagination (default: 0)

Response:
```json
{
    "success": true,
    "status": 200,
    "data": {
        "messages": [
            {
                "id": "msg123",
                "text": "Hello",
                "created_at": "2024-03-20T10:00:00Z"
            }
        ]
    }
}
```

#### Update Message Status

Updates the delivery status of a specific message.

```http
POST /chats/:scopeId/:messageId/delivery_status
Content-Type: application/json
```

Parameters:
- `scopeId`: Scope ID received when connecting channel to account
- `messageId`: Message ID

Request body:
```json
{
    "msgid": "msg123",
    "delivery_status": -1,
    "error_code": 905,
    "error": "Error text"
}
```

Response:
```json
{
    "success": true,
    "status": 200,
    "data": {}
}
```

#### Link Chat to Contact

Links an existing chat to an AmoCRM contact and optionally creates or links to a lead.

```http
POST /chats/:scopeId/:chatId/contact
Content-Type: application/json
```

Parameters:
- `scopeId`: Scope ID received when connecting channel to account
- `chatId`: Chat ID

Request body:
```json
{
    "contact_id": 12345,
    "auto_create_lead": true,
    "lead_id": 67890  // Optional, ignored if auto_create_lead is true
}
```

Response:
```json
{
    "success": true,
    "status": 200,
    "data": {
        "contact": {
            "id": 12345
        },
        "lead": {
            "id": 67890
        }
    }
}
```

Important notes:
1. The `contact_id` must be an existing contact ID in AmoCRM
2. If `auto_create_lead` is true, a new lead will be created and linked
3. If `lead_id` is provided and `auto_create_lead` is false, the chat will be linked to the existing lead
4. The endpoint will return 404 if the contact doesn't exist

Example with auto-created lead:
```json
{
    "contact_id": 12345,
    "auto_create_lead": true
}
```

Example with existing lead:
```json
{
    "contact_id": 12345,
    "auto_create_lead": false,
    "lead_id": 67890
}
```

## Webhook Integration

### Webhook Setup

1. Register your webhook URL in AmoCRM:
   ```http
   POST /v2/origin/custom/{scope_id}/connect
   ```
   Request body:
   ```json
   {
       "webhook_url": "https://your-domain.com/webhooks/amocrm",
       "title": "Your Channel Name"
   }
   ```

2. Configure your server to handle webhook events:
   ```javascript
   app.post('/webhooks/amocrm', async (req, res) => {
       const signature = req.headers['x-signature'];
       // Verify signature and process event
   });
   ```

### Webhook Events

AmoCRM sends the following types of events:

1. **New Message** (`new_message`):
   ```json
   {
       "event": "new_message",
       "payload": {
           "message": {
               "id": "msg123",
               "conversation_id": "conv123",
               "text": "Hello",
               "created_at": "2024-03-20T10:00:00Z",
               "sender": {
                   "id": "user123",
                   "name": "John Doe"
               }
           }
       }
   }
   ```

2. **Message Updated** (`message_updated`):
   ```json
   {
       "event": "message_updated",
       "payload": {
           "message_id": "msg123",
           "conversation_id": "conv123",
           "updates": {
               "text": "Updated text"
           }
       }
   }
   ```

3. **Message Deleted** (`message_deleted`):
   ```json
   {
       "event": "message_deleted",
       "payload": {
           "message_id": "msg123",
           "conversation_id": "conv123"
       }
   }
   ```

### Webhook Message Format

Each webhook request includes:

Headers:
```http
Content-Type: application/json
X-Signature: {HMAC signature}
Date: {RFC2822 formatted date}
```

Body structure:
```json
{
    "event": "event_type",
    "payload": {
        // Event-specific data
    }
}
```

### Webhook Security

1. **Signature Verification**:
   ```javascript
   const isValidSignature = (signature, body, secret) => {
       const calculatedSignature = calculateSignature(secret, body);
       return signature === calculatedSignature;
   };
   ```

2. **Best Practices**:
   - Always verify webhook signatures
   - Use HTTPS for webhook URLs
   - Implement retry logic for failed webhook deliveries
   - Set appropriate timeout values
   - Log all webhook events for debugging

## Complete Workflow

Here's the complete flow of integration between your system and AmoCRM:

1. **Channel Setup**:
   ```mermaid
   sequenceDiagram
       Your System->>AmoCRM: Connect Channel (POST /connect)
       AmoCRM->>Your System: Return scope_id and client_secret
       Your System->>Your System: Store credentials
   ```

2. **Starting a Conversation**:
   ```mermaid
   sequenceDiagram
       External User->>Your System: First message
       Your System->>AmoCRM: Create Chat
       AmoCRM->>Your System: Return chat_id
       Your System->>AmoCRM: Send message
       AmoCRM->>Your System: Webhook: chat_created
   ```

3. **Contact and Lead Management**:
   ```mermaid
   sequenceDiagram
       Your System->>AmoCRM: Link chat to contact
       AmoCRM->>AmoCRM: Create/Link lead (if requested)
       AmoCRM->>Your System: Return contact and lead details
   ```

## Example Workflows

### Sending Messages Workflow

Here's a complete example of how to send messages from your system to AmoCRM:

#### 1. Initial Setup (One-time)

First, connect your channel to AmoCRM:

```http
POST /v2/origin/custom/connect
Content-Type: application/json

{
    "account_id": "12345678",
    "title": "Telegram Support",
    "hook_api_version": "v2",
    "webhook_url": "https://your-domain.com/webhooks/amocrm"
}
```

Response:
```json
{
    "success": true,
    "status": 200,
    "data": {
        "scope_id": "344a5002-f8ca-454d-af3d-396180102ac7_52e591f7-c98f-4255-8495-827210138c81",
        "client_secret": "your_client_secret"
    }
}
```

Store these credentials securely - you'll need them for all subsequent requests.

#### 2. Creating a Chat

When a user sends their first message, create a chat:

```http
POST /v2/origin/custom/{scope_id}/chats
Content-Type: application/json

{
    "conversation_id": "tg_chat_123456",
    "user": {
        "id": "tg_user_789",
        "name": "John Doe",
        "avatar": "https://example.com/avatar.jpg",
        "phone": "+1234567890"
    },
    "custom_fields": {
        "source": "telegram",
        "platform": "android"
    }
}
```

Response:
```json
{
    "success": true,
    "status": 200,
    "data": {
        "chat_id": "chat_12345",
        "conversation": {
            "id": "tg_chat_123456",
            "created_at": "2024-03-20T10:00:00Z"
        }
    }
}
```

#### 3. Sending a Message

After creating the chat, send the message:

```http
POST /v2/origin/custom/{scope_id}/chats/{chat_id}/messages
Content-Type: application/json

{
    "message": {
        "type": "text",
        "text": "Hello! I need help with my order #12345",
        "message_id": "msg_123456"
    },
    "sender": {
        "id": "tg_user_789",
        "name": "John Doe",
        "avatar": "https://example.com/avatar.jpg"
    }
}
```

Response:
  ```json
  {
    "success": true,
    "status": 200,
    "data": {
        "message_id": "msg_123456"
    }
  }
  ```

#### 4. Updating Message Status

After confirming delivery to AmoCRM, update the message status:

```http
POST /v2/origin/custom/{scope_id}/{message_id}/delivery_status
Content-Type: application/json

{
    "msgid": "msg_123456",
    "delivery_status": 1  // 1 for delivered, -1 for error
}
```

#### 5. Linking to Contact (Optional)

If you identify the user as an existing contact, link the chat:

```http
POST /v2/origin/custom/{scope_id}/{chat_id}/contact
Content-Type: application/json

{
    "contact_id": 12345,
    "auto_create_lead": true
}
```

#### Complete Code Example

Here's a Node.js example showing the complete flow:

```javascript
const axios = require('axios');
const config = require('./config');
const { calculateSignature, calculateMD5 } = require('./utils/crypto');

class MessageSender {
    constructor() {
        this.scopeId = config.scopeId;
        this.secret = config.secret;
        this.baseUrl = config.baseUrl;
    }

    async sendMessage(userData, messageText) {
        try {
            // 1. Create or get existing chat
            const chat = await this.createChat(userData);
            
            // 2. Send the message
            const message = await this.sendMessageToChat(chat.chat_id, {
                userData,
                text: messageText
            });

            // 3. Update delivery status
            await this.updateMessageStatus(message.message_id, 1);

            return {
                success: true,
                chatId: chat.chat_id,
                messageId: message.message_id
            };
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    async createChat(userData) {
        const path = `/v2/origin/custom/${this.scopeId}/chats`;
        
        const body = {
            conversation_id: `tg_${userData.chatId}`,
            user: {
                id: `tg_${userData.userId}`,
                name: userData.name,
                avatar: userData.avatar,
                phone: userData.phone
            },
            custom_fields: {
                source: 'telegram',
                platform: userData.platform
            }
        };

        const headers = this.getSignedHeaders('POST', path, body);
        
        const response = await axios({
            method: 'POST',
            url: `${this.baseUrl}${path}`,
            headers,
            data: body
        });

        return response.data.data;
    }

    async sendMessageToChat(chatId, { userData, text }) {
        const path = `/v2/origin/custom/${this.scopeId}/chats/${chatId}/messages`;
        
        const messageId = `msg_${Date.now()}`;
        const body = {
            message: {
                type: 'text',
                text: text,
                message_id: messageId
            },
            sender: {
                id: `tg_${userData.userId}`,
                name: userData.name,
                avatar: userData.avatar
            }
        };

        const headers = this.getSignedHeaders('POST', path, body);
        
        const response = await axios({
            method: 'POST',
            url: `${this.baseUrl}${path}`,
            headers,
            data: body
        });

        return {
            message_id: messageId,
            ...response.data.data
        };
    }

    async updateMessageStatus(messageId, status) {
        const path = `/v2/origin/custom/${this.scopeId}/${messageId}/delivery_status`;
        
        const body = {
            msgid: messageId,
            delivery_status: status
        };

        const headers = this.getSignedHeaders('POST', path, body);
        
        await axios({
            method: 'POST',
            url: `${this.baseUrl}${path}`,
            headers,
            data: body
        });
    }

    getSignedHeaders(method, path, body) {
        const date = new Date().toUTCString();
        const contentType = 'application/json';
        const bodyJson = JSON.stringify(body);
        const checksum = calculateMD5(bodyJson);
        
        const signature = calculateSignature(
            this.secret,
            method,
            checksum,
            contentType,
            date,
            path
        );

        return {
            'Date': date,
            'Content-Type': contentType,
            'Content-MD5': checksum,
            'X-Signature': signature
        };
    }
}

// Usage example
async function main() {
    const sender = new MessageSender();
    
    const userData = {
        userId: '123456',
        chatId: '789012',
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg',
        phone: '+1234567890',
        platform: 'android'
    };

    try {
        const result = await sender.sendMessage(
            userData,
            'Hello! I need help with my order #12345'
        );
        console.log('Message sent successfully:', result);
    } catch (error) {
        console.error('Failed to send message:', error);
    }
}

main();
```

This example demonstrates:
1. Proper error handling
2. Signature calculation for each request
3. Complete message flow
4. User data management
5. Status updates

Important considerations:
- Always store the `scope_id` and `client_secret` securely
- Generate unique message IDs for tracking
- Handle delivery status updates promptly
- Implement proper error handling and retries
- Log all operations for debugging
- Consider implementing rate limiting
- Keep track of chat IDs for future messages