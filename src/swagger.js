const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AmoCRM Chat API',
            version: '1.0.0',
            description: 'API for integrating with AmoCRM chat system'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        error: {
                            type: 'string',
                            example: 'Error message'
                        },
                        details: {
                            type: 'string',
                            example: 'Detailed error message'
                        }
                    }
                },
                ConnectChannelRequest: {
                    type: 'object',
                    required: ['account_id', 'title', 'hook_api_version', 'webhook_url'],
                    properties: {
                        account_id: {
                            type: 'string',
                            description: 'Your AmoCRM account ID',
                            example: '12345678'
                        },
                        title: {
                            type: 'string',
                            description: 'Display name for your channel in AmoCRM',
                            example: 'Telegram Support'
                        },
                        hook_api_version: {
                            type: 'string',
                            description: 'API version for webhooks',
                            enum: ['v2'],
                            example: 'v2'
                        },
                        webhook_url: {
                            type: 'string',
                            format: 'uri',
                            description: 'URL where AmoCRM will send webhook events',
                            example: 'https://your-domain.com/webhooks/amocrm'
                        }
                    }
                },
                ConnectChannelResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        status: {
                            type: 'number',
                            example: 200
                        },
                        data: {
                            type: 'object',
                            properties: {
                                scope_id: {
                                    type: 'string',
                                    description: 'Unique identifier for your channel connection',
                                    example: '344a5002-f8ca-454d-af3d-396180102ac7_52e591f7-c98f-4255-8495-827210138c81'
                                },
                                client_secret: {
                                    type: 'string',
                                    description: 'Secret key for signing requests',
                                    example: 'your_client_secret'
                                }
                            }
                        }
                    }
                },
                CreateChatRequest: {
                    type: 'object',
                    required: ['conversation_id', 'user'],
                    properties: {
                        conversation_id: {
                            type: 'string',
                            description: 'Unique identifier for the conversation in your system',
                            example: 'telegram_chat_123'
                        },
                        user: {
                            type: 'object',
                            required: ['id', 'name'],
                            properties: {
                                id: {
                                    type: 'string',
                                    description: 'User ID in your system',
                                    example: 'tg_user_456'
                                },
                                name: {
                                    type: 'string',
                                    description: 'User display name',
                                    example: 'John Doe'
                                },
                                avatar: {
                                    type: 'string',
                                    format: 'uri',
                                    description: 'URL to user avatar image',
                                    example: 'https://example.com/avatar.jpg'
                                },
                                phone: {
                                    type: 'string',
                                    description: 'User phone number',
                                    example: '+1234567890'
                                },
                                email: {
                                    type: 'string',
                                    format: 'email',
                                    description: 'User email address',
                                    example: 'john@example.com'
                                }
                            }
                        },
                        custom_fields: {
                            type: 'object',
                            description: 'Additional metadata for the chat',
                            example: {
                                source: 'telegram',
                                language: 'en',
                                timezone: 'UTC+3',
                                platform: 'android',
                                tags: ['vip', 'support']
                            }
                        }
                    }
                },
                CreateChatResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        status: {
                            type: 'number',
                            example: 200
                        },
                        data: {
                            type: 'object',
                            properties: {
                                chat_id: {
                                    type: 'string',
                                    description: 'Unique chat identifier in AmoCRM',
                                    example: 'chat_12345'
                                },
                                conversation: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'string',
                                            description: 'Your conversation ID',
                                            example: 'telegram_chat_123'
                                        },
                                        created_at: {
                                            type: 'string',
                                            format: 'date-time',
                                            description: 'Chat creation timestamp',
                                            example: '2024-03-20T10:00:00Z'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                ChatRequest: {
                    type: 'object',
                    required: ['conversation_id'],
                    properties: {
                        conversation_id: {
                            type: 'string',
                            description: 'Conversation ID'
                        },
                        user: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string',
                                    description: 'User ID'
                                },
                                name: {
                                    type: 'string',
                                    description: 'User name'
                                }
                            }
                        }
                    }
                },
                ChatHistoryResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        status: {
                            type: 'number',
                            example: 200
                        },
                        data: {
                            type: 'object',
                            properties: {
                                messages: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: {
                                                type: 'string',
                                                description: 'Message ID'
                                            },
                                            text: {
                                                type: 'string',
                                                description: 'Message text'
                                            },
                                            created_at: {
                                                type: 'string',
                                                format: 'date-time',
                                                description: 'Message creation timestamp'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                MessageStatusRequest: {
                    type: 'object',
                    required: ['msgid', 'delivery_status'],
                    properties: {
                        msgid: {
                            type: 'string',
                            description: 'Message ID',
                            example: '079e44fb-fc22-476b-9e8a-421b688ec53b'
                        },
                        delivery_status: {
                            type: 'number',
                            description: 'Delivery status (-1 for error)',
                            example: -1
                        },
                        error_code: {
                            type: 'number',
                            description: 'Error code (required if delivery_status is -1)',
                            example: 905
                        },
                        error: {
                            type: 'string',
                            description: 'Error message (required if delivery_status is -1)',
                            example: 'Error text'
                        }
                    }
                },
                WebhookNewMessage: {
                    type: 'object',
                    properties: {
                        event: {
                            type: 'string',
                            enum: ['new_message'],
                            description: 'Event type'
                        },
                        payload: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'string',
                                            description: 'Message ID'
                                        },
                                        conversation_id: {
                                            type: 'string',
                                            description: 'Conversation ID'
                                        },
                                        text: {
                                            type: 'string',
                                            description: 'Message text'
                                        },
                                        created_at: {
                                            type: 'string',
                                            format: 'date-time',
                                            description: 'Message creation timestamp'
                                        },
                                        sender: {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'string',
                                                    description: 'Sender ID'
                                                },
                                                name: {
                                                    type: 'string',
                                                    description: 'Sender name'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                WebhookMessageUpdated: {
                    type: 'object',
                    properties: {
                        event: {
                            type: 'string',
                            enum: ['message_updated'],
                            description: 'Event type'
                        },
                        payload: {
                            type: 'object',
                            properties: {
                                message_id: {
                                    type: 'string',
                                    description: 'Message ID'
                                },
                                conversation_id: {
                                    type: 'string',
                                    description: 'Conversation ID'
                                },
                                updates: {
                                    type: 'object',
                                    description: 'Fields that were updated',
                                    properties: {
                                        text: {
                                            type: 'string',
                                            description: 'Updated message text'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                WebhookMessageDeleted: {
                    type: 'object',
                    properties: {
                        event: {
                            type: 'string',
                            enum: ['message_deleted'],
                            description: 'Event type'
                        },
                        payload: {
                            type: 'object',
                            properties: {
                                message_id: {
                                    type: 'string',
                                    description: 'Message ID'
                                },
                                conversation_id: {
                                    type: 'string',
                                    description: 'Conversation ID'
                                }
                            }
                        }
                    }
                },
                WebhookResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true,
                            description: 'Whether the webhook was processed successfully'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js'] // Path to the API routes
};

module.exports = swaggerJsdoc(options); 