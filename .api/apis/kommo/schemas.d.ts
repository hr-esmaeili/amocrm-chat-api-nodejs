declare const ChatHistory: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly scope_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Scope ID, it is specific to your integration";
                };
                readonly conversation_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "conversation_id can be obtained either when creating a chat via the chat creation method, or from the message webhook.";
                };
            };
            readonly required: readonly ["scope_id", "conversation_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly offset: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Offset of the message selection (how many records from the beginning of the selection we skip)";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Number of returned entities per query (Maximum – 50)";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly Date: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Date and time when the request was generated. The signature will be valid for 15 minutes from this Date. The date should be in the format “Thu, 01 Jan 2023 12:00:00 +0000” (RFC2822)";
                };
                readonly "Content-type": {
                    readonly type: "string";
                    readonly default: "application/json";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Request data type. Currently, only application/json is supported.";
                };
                readonly "Content-MD5": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "For the request body, it is necessary to calculate the MD5 hash and indicate it in the header in lowercase. At the same time, it is important to keep in mind that the request body is calculated as a stream of bytes without considering the end of JSON markup, and if there are “\\n” or spaces at the end, they will also be taken into account. For GET requests, MD5 must also be calculated. Even if nothing is passed in the request body, MD5 will be obtained from an empty string.";
                };
                readonly "X-Signature": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Signature of the request as a string. It is formed from the name of the method (GET/POST) in uppercase, with the values of the headers concatenated by “\\n”. Header values ​​come in a specific order. If there is no header, an empty string is specified instead. Next, add the requested path from the URL without the protocol and domain (without GET parameters) to the line. The resulting string is calculated using HMAC-SHA1, and as a secret, we use the channel secret obtained during registration. The resulting hash in lowercase is indicated in the X-Signature header.";
                };
            };
            readonly required: readonly ["Date", "Content-type"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly messages: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly timestamp: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1670930693];
                            };
                            readonly msec_timestamp: {
                                readonly type: "integer";
                                readonly default: 0;
                                readonly examples: readonly [1670930693280];
                            };
                            readonly sender: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly examples: readonly ["XXXXXX-ec21-4463-965f-1fe1d4cd5b89"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Harry Potter"];
                                    };
                                    readonly avatar: {
                                        readonly type: "string";
                                        readonly examples: readonly [""];
                                    };
                                };
                            };
                            readonly receiver: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly examples: readonly ["XXXXXXX-a3ab-4695-832c-919dbfc598ea"];
                                    };
                                    readonly client_id: {
                                        readonly type: "string";
                                        readonly examples: readonly ["XXXXXXXXX-ec21-4463-965f-1fe1d4cd5a89"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Adam"];
                                    };
                                    readonly avatar: {
                                        readonly type: "string";
                                        readonly examples: readonly ["https://www.w3schools.com/w3images/avatar2.png"];
                                    };
                                    readonly phone: {
                                        readonly type: "string";
                                        readonly examples: readonly ["+1234567890"];
                                    };
                                };
                            };
                            readonly message: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly examples: readonly ["XXXXXXX-de79-468b-a923-9a7c88c733d7"];
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                        readonly examples: readonly ["picture"];
                                    };
                                    readonly text: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Hello from Kommo"];
                                    };
                                    readonly media: {
                                        readonly type: "string";
                                        readonly examples: readonly ["https://amojo.kommo.com/attachments/XXXXXXX-d2eb-4bd8-b862-a67934927b38/14723c64-c40d-4efc-9f78-9625adac414c/zDCRN_logo-min.jpg"];
                                    };
                                    readonly thumbnail: {
                                        readonly type: "string";
                                        readonly examples: readonly ["https://amojo.kommo.com/attachments/XXXXXXX-d2eb-4bd8-b862-a67934927b38/14723c64-c40d-4efc-9f78-9625adac414c/zDCRN_logo-min_320x200.jpg"];
                                    };
                                    readonly file_name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["logo-min.png"];
                                    };
                                    readonly file_size: {
                                        readonly type: "integer";
                                        readonly default: 0;
                                        readonly examples: readonly [27107];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "204": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ConnectChannel: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly account_id: {
                readonly type: "string";
                readonly description: "amojo_id that you get in Step 1";
            };
            readonly title: {
                readonly type: "string";
                readonly description: "Bot name";
            };
            readonly hook_api_version: {
                readonly type: "string";
                readonly description: "The Chat API version";
                readonly enum: readonly ["v2"];
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly channel_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Get it from Step 1";
                };
            };
            readonly required: readonly ["channel_id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly account_id: {
                    readonly type: "string";
                    readonly examples: readonly ["52fd2a28-d2eb-4bd8-b862-b57934927b38"];
                };
                readonly scope_id: {
                    readonly type: "string";
                    readonly examples: readonly ["f62a0162-46a7-430e-b06c-0ef798d56b21_52fd2a28-d2eb-4bd8-b862-b57934927b38"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly examples: readonly ["MyKommo"];
                };
                readonly hook_api_version: {
                    readonly type: "string";
                    readonly examples: readonly ["v2"];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateChat: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["conversation_id"];
        readonly properties: {
            readonly conversation_id: {
                readonly type: "string";
                readonly description: "Chat ID on the integration side (your integration should generate it, it can be a phone number, a username)";
            };
            readonly source: {
                readonly type: "object";
                readonly properties: {
                    readonly external_id: {
                        readonly type: "string";
                        readonly description: "Identifier of the chat source on the integration side. If you do not need to specify the source, then the source field does not need to be passed.";
                    };
                };
            };
            readonly user: {
                readonly type: "object";
                readonly required: readonly ["id", "name"];
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "Chat participant ID on the integration side ( you generate the ID)";
                    };
                    readonly ref_id: {
                        readonly type: "string";
                        readonly description: "Chat participant ID on the Kommo side";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Chat participant name";
                    };
                    readonly avatar: {
                        readonly type: "string";
                        readonly description: "Url to the chat participant avatar, Url should be available for download";
                    };
                    readonly profile: {
                        readonly type: "object";
                        readonly properties: {
                            readonly phone: {
                                readonly type: "string";
                                readonly description: "Phone number. When creating an incoming lead, the phone number will be added to the contact data";
                            };
                            readonly email: {
                                readonly type: "string";
                                readonly description: "Email address. When creating an incoming lead, the email address will be added to the contact data";
                            };
                        };
                    };
                };
            };
            readonly profile_link: {
                readonly type: "string";
                readonly description: "Url to the chat participant profile";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly scope_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "You got the scope_id as a part of response in Step 2";
                };
            };
            readonly required: readonly ["scope_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly Date: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Date and time when the request was generated. The signature will be valid for 15 minutes from this Date. The date should be in the format “Thu, 01 Jan 2023 12:00:00 +0000” (RFC2822)";
                };
                readonly "Content-type": {
                    readonly type: "string";
                    readonly enum: readonly ["application/json"];
                    readonly default: "application/json";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Request data type. Currently, only application/json is supported.";
                };
                readonly "Content-MD5": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "For the request body";
                };
                readonly "X-Signature": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Signature of the request as a string.";
                };
            };
            readonly required: readonly ["Date", "Content-type", "Content-MD5", "X-Signature"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly examples: readonly ["XXXXXXX-10e9-4f88-af0b-6581795e15e2"];
                };
                readonly user: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly examples: readonly ["XXXXXXX-7bd3-4934-b05f-23f1db1a6514"];
                        };
                        readonly client_id: {
                            readonly type: "string";
                            readonly examples: readonly ["XXXXXXX-86df-4c49-a0c3-a4816df41af0"];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Client"];
                        };
                        readonly avatar: {
                            readonly type: "string";
                            readonly examples: readonly ["https://www.example.com/users/avatar.png"];
                        };
                        readonly phone: {
                            readonly type: "string";
                            readonly examples: readonly ["+1234567890"];
                        };
                        readonly email: {
                            readonly type: "string";
                            readonly examples: readonly ["client409@example.com"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DisconnectChannel: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly account_id: {
                readonly type: "string";
                readonly description: "amojo_id of the account";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly channel_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Channel ID";
                };
            };
            readonly required: readonly ["channel_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly Date: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Date and time when the request was generated. The signature will be valid for 15 minutes from this Date. The date should be in the format “Thu, 01 Jan 2023 12:00:00 +0000” (RFC2822)";
                };
                readonly "Content-type": {
                    readonly type: "string";
                    readonly default: "application/json";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Request data type. Currently, only application/json is supported.";
                };
                readonly "Content-MD5": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "For the request body, it is necessary to calculate the MD5 hash and indicate it in the header in lowercase. At the same time, it is important to keep in mind that the request body is calculated as a stream of bytes without considering the end of JSON markup, and if there are “\\n” or spaces at the end, they will also be taken into account. For GET requests, MD5 must also be calculated. Even if nothing is passed in the request body, MD5 will be obtained from an empty string.";
                };
                readonly "X-Signature": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Signature of the request as a string. It is formed from the name of the method (GET/POST) in uppercase, with the values of the headers concatenated by “\\n”. Header values ​​come in a specific order. If there is no header, an empty string is specified instead. Next, add the requested path from the URL without the protocol and domain (without GET parameters) to the line. The resulting string is calculated using HMAC-SHA1, and as a secret, we use the channel secret obtained during registration. The resulting hash in lowercase is indicated in the X-Signature header.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const SendImportMessages: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly RAW_BODY: {
                readonly type: "object";
                readonly properties: {
                    readonly event_type: {
                        readonly type: "string";
                        readonly description: "Event type, currently only new_message is supported";
                        readonly default: "new_message";
                        readonly enum: readonly ["new_message"];
                    };
                    readonly payload: {
                        readonly type: "object";
                        readonly description: "An array contains the elements of the message.";
                        readonly required: readonly ["timestamp", "msec_timestamp", "msgid", "conversation_id"];
                        readonly properties: {
                            readonly timestamp: {
                                readonly type: "integer";
                                readonly description: "Message timestamp in Unix Timestamp format";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly msec_timestamp: {
                                readonly type: "integer";
                                readonly description: "Message timestamp in milliseconds";
                                readonly format: "int32";
                                readonly minimum: -2147483648;
                                readonly maximum: 2147483647;
                            };
                            readonly msgid: {
                                readonly type: "string";
                                readonly description: "Chat message ID on the integration side";
                            };
                            readonly conversation_id: {
                                readonly type: "string";
                                readonly description: "Chat ID on the integration side";
                            };
                            readonly conversation_ref_id: {
                                readonly type: "string";
                                readonly description: "Chat ID on Kommo side. It should be sent if the client responds to a message sent with “Write first” so the chat on your side is associated with the chat on the system.";
                            };
                            readonly source: {
                                readonly type: "object";
                                readonly description: "Message source.";
                                readonly properties: {
                                    readonly external_id: {
                                        readonly type: "string";
                                        readonly description: "Chat source identifier on the integration side. The field length is 40 characters, you can use any printable ascii characters and a space.";
                                    };
                                };
                            };
                            readonly sender: {
                                readonly type: "object";
                                readonly description: "Message sender";
                                readonly required: readonly ["id", "name"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "Chat participant ID on the integration side";
                                    };
                                    readonly ref_id: {
                                        readonly type: "string";
                                        readonly description: "Chat participant ID on the Chat API side";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Chat participant name";
                                    };
                                    readonly avatar: {
                                        readonly type: "string";
                                        readonly description: "Link to the chat participant’s avatar. The link must be available to third-party resources and provide an image for download";
                                    };
                                    readonly profile_link: {
                                        readonly type: "string";
                                        readonly description: "Link to the profile of the chat participant in a third-party chat system";
                                    };
                                    readonly profile: {
                                        readonly type: "object";
                                        readonly description: "Chat participant profile.";
                                        readonly properties: {
                                            readonly phone: {
                                                readonly type: "string";
                                                readonly description: "Phone number. When creating an incoming lead, the phone number will be added to the contact data";
                                            };
                                            readonly email: {
                                                readonly type: "string";
                                                readonly description: "Email address. When creating an incoming lead, the email address will be added to the contact data";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly receiver: {
                                readonly type: "object";
                                readonly description: "Message receiver";
                                readonly required: readonly ["id", "name"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "Chat participant ID on the integration side";
                                    };
                                    readonly ref_id: {
                                        readonly type: "string";
                                        readonly description: "Chat participant ID on the Chat API side";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Chat participant name";
                                    };
                                    readonly avatar: {
                                        readonly type: "string";
                                        readonly description: "Link to the chat participant’s avatar. The link must be available to third-party resources and provide an image for download";
                                    };
                                    readonly profile_link: {
                                        readonly type: "string";
                                        readonly description: "Link to the profile of the chat participant in a third-party chat system";
                                    };
                                    readonly profile: {
                                        readonly type: "object";
                                        readonly description: "Chat participant profile.";
                                        readonly properties: {
                                            readonly phone: {
                                                readonly type: "string";
                                                readonly description: "Phone number. When creating an incoming lead, the phone number will be added to the contact data";
                                            };
                                            readonly email: {
                                                readonly type: "string";
                                                readonly description: "Email address. When creating an incoming lead, the email address will be added to the contact data";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly message: {
                                readonly type: "object";
                                readonly description: "An array contains the message components.";
                                readonly required: readonly ["type"];
                                readonly properties: {
                                    readonly type: {
                                        readonly type: "string";
                                        readonly description: "Message type, one of the following: text, contact, file, video, picture, voice, audio, sticker, location";
                                    };
                                    readonly text: {
                                        readonly type: "string";
                                        readonly description: "The field is mandatory for the “text” type, can be empty for other types";
                                    };
                                    readonly media: {
                                        readonly type: "string";
                                        readonly description: "Url to the file, video, picture, voice, audio, or sticker. Url should be available for download";
                                    };
                                    readonly file_size: {
                                        readonly type: "integer";
                                        readonly description: "The size of the file from the “media” field (Optional)";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly file_name: {
                                        readonly type: "string";
                                        readonly description: "The name of the file from the “media” field url, the field is optional. Ignored for the “voice” type";
                                    };
                                    readonly contact: {
                                        readonly type: "object";
                                        readonly description: "Mandatory fields for messages of type contact (contact information).";
                                        readonly properties: {
                                            readonly name: {
                                                readonly type: "string";
                                                readonly description: "Contact name";
                                            };
                                            readonly phone: {
                                                readonly type: "string";
                                                readonly description: "Contact phone";
                                            };
                                        };
                                    };
                                    readonly location: {
                                        readonly type: "object";
                                        readonly description: "Mandatory fields for messages of type location (geoposition).";
                                        readonly properties: {
                                            readonly lon: {
                                                readonly type: "number";
                                                readonly description: "Longitude";
                                                readonly format: "float";
                                                readonly minimum: -3.402823669209385e+38;
                                                readonly maximum: 3.402823669209385e+38;
                                            };
                                            readonly lat: {
                                                readonly type: "number";
                                                readonly description: "Latitude";
                                                readonly format: "float";
                                                readonly minimum: -3.402823669209385e+38;
                                                readonly maximum: 3.402823669209385e+38;
                                            };
                                        };
                                    };
                                };
                            };
                            readonly silent: {
                                readonly type: "boolean";
                                readonly description: "Defines whether the message triggers a notification in the Kommo account";
                            };
                            readonly reply_to: {
                                readonly type: "object";
                                readonly description: "The object of the embedded message. The message from a quote with a reply can only belong to the same chat as the message being sent.";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "The ID of the quoted message in the Chats API. If passed, the remaining fields do not need to be filled in, they will be determined automatically. In case of passing the ID, scrolling to the message will also work if the chat is in the same card.";
                                    };
                                    readonly msgid: {
                                        readonly type: "string";
                                        readonly description: "The ID of the quoted message on the integration side. If passed, the remaining fields do not need to be filled in, they will be determined automatically. In case of passing the ID, scrolling to the message will also work if the chat is in the same card.";
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                        readonly description: "Mandatory if no ID is passed. Message type can be one of the following: text, contact, file, video, picture, voice, audio, sticker, location.";
                                    };
                                    readonly text: {
                                        readonly type: "string";
                                        readonly description: "Mandatory for the \"text\" type if no ID is passed. For other message types, this can be empty.";
                                    };
                                    readonly file_name: {
                                        readonly type: "string";
                                        readonly description: "Optional. File name";
                                    };
                                    readonly file_size: {
                                        readonly type: "integer";
                                        readonly description: "Optional. File size in bytes";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly media_duration: {
                                        readonly type: "integer";
                                        readonly description: "Optional. Duration for video/audio/voice messages";
                                        readonly format: "int32";
                                        readonly minimum: -2147483648;
                                        readonly maximum: 2147483647;
                                    };
                                    readonly location: {
                                        readonly type: "object";
                                        readonly description: "Mandatory for location type messages if no ID is passed.";
                                        readonly properties: {
                                            readonly lon: {
                                                readonly type: "number";
                                                readonly description: "Longitude";
                                                readonly format: "float";
                                                readonly minimum: -3.402823669209385e+38;
                                                readonly maximum: 3.402823669209385e+38;
                                            };
                                            readonly lat: {
                                                readonly type: "number";
                                                readonly description: "Latitude";
                                                readonly format: "float";
                                                readonly minimum: -3.402823669209385e+38;
                                                readonly maximum: 3.402823669209385e+38;
                                            };
                                        };
                                    };
                                    readonly sender: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "string";
                                                readonly description: "Sender ID on the integration side, if passed, the remaining fields do not need to be filled in, they will be determined automatically.";
                                            };
                                            readonly ref_id: {
                                                readonly type: "string";
                                                readonly description: "Sender ID in the Chats API, if passed, the remaining fields do not need to be filled in, they will be determined automatically.";
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly description: "Mandatory if no ID is passed. Sender name";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly scope_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "You obtain the scope ID in the response of step 2";
                };
            };
            readonly required: readonly ["scope_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly Date: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Date and time when the request was generated. The signature will be valid for 15 minutes from this Date. The date should be in the format “Thu, 01 Jan 2023 12:00:00 +0000” (RFC2822)";
                };
                readonly "Content-type": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Request data type. Currently, only application/json is supported.";
                };
                readonly "Content-MD5": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "For the request body, it is necessary to calculate the MD5 hash and indicate it in the header in lowercase. At the same time, it is important to keep in mind that the request body is calculated as a stream of bytes without considering the end of JSON markup, and if there are “\\n” or spaces at the end, they will also be taken into account";
                };
                readonly "X-Signature": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Signature of the request as a string. It is formed from the name of the method (GET/POST) in uppercase, with the values of the headers concatenated by “\\n”. Header values ​​come in a specific order. If there is no header, an empty string is specified instead. Next, add the requested path from the URL without the protocol and domain (without GET parameters) to the line. The resulting string is calculated using HMAC-SHA1, and as a secret, we use the channel secret obtained during registration. The resulting hash in lowercase is indicated in the X-Signature header.";
                };
            };
            readonly required: readonly ["Date", "Content-type"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly new_message: {
                    readonly type: "object";
                    readonly properties: {
                        readonly conversation_id: {
                            readonly type: "string";
                            readonly examples: readonly ["XXXXXXXXX-a27e-7ajfj39223edd"];
                        };
                        readonly sender_id: {
                            readonly type: "string";
                            readonly examples: readonly ["XXXXXXXXX-daw2332fw"];
                        };
                        readonly msgid: {
                            readonly type: "string";
                            readonly examples: readonly ["XXXXXXXXX-iw204is04"];
                        };
                        readonly ref_id: {
                            readonly type: "string";
                            readonly examples: readonly ["msgid1"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const SendReactions: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly conversation_id: {
                readonly type: "string";
                readonly description: "Chat ID on the integration side";
            };
            readonly id: {
                readonly type: "string";
                readonly description: "Message ID on the Kommo side. The field is required if the msgid field is not passed";
            };
            readonly msgid: {
                readonly type: "string";
                readonly description: "Message ID on the integration side. The field is required if the id field is not passed";
            };
            readonly user: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "ID of the user who has sent/removed the reaction on the integration side";
                    };
                    readonly ref_id: {
                        readonly type: "string";
                        readonly description: "ID of the user who has sent/removed the reaction on the Kommo side. Required field when entering a reaction by the user of Kommo";
                    };
                };
            };
            readonly type: {
                readonly type: "string";
                readonly description: "Action type";
                readonly enum: readonly ["react", "unreact"];
            };
            readonly emoji: {
                readonly type: "string";
                readonly description: "Required field for the “react” type";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly scope_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Obtain scope ID in the step 2";
                };
            };
            readonly required: readonly ["scope_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Content-Type": {
                    readonly type: "string";
                    readonly default: "application/json";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Request data type. Currently, only application/json is supported.";
                };
                readonly Date: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Date and time when the request was generated. The signature will be valid for 15 minutes from this Date. The date should be in the format “Thu, 01 Jan 2023 12:00:00 +0000” (RFC2822)";
                };
                readonly "Content-MD5": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "For the request body, it is necessary to calculate the MD5 hash and indicate it in the header in lowercase. At the same time, it is important to keep in mind that the request body is calculated as a stream of bytes without considering the end of JSON markup, and if there are “\\n” or spaces at the end, they will also be taken into account. For GET requests, MD5 must also be calculated. Even if nothing is passed in the request body, MD5 will be obtained from an empty string.";
                };
                readonly "X-Signature": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Signature of the request as a string. It is formed from the name of the method (GET/POST) in uppercase, with the values of the headers concatenated by “\\n”. Header values ​​come in a specific order. If there is no header, an empty string is specified instead. Next, add the requested path from the URL without the protocol and domain (without GET parameters) to the line. The resulting string is calculated using HMAC-SHA1, and as a secret, we use the channel secret obtained during registration. The resulting hash in lowercase is indicated in the X-Signature header.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const TypingInfo: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly conversation_id: {
                readonly type: "string";
                readonly description: "Chat ID on the integration side";
            };
            readonly sender: {
                readonly type: "object";
                readonly description: "User ID on the integration side";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "User ID on the integration side";
                    };
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly scope_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Get the scope ID in the step 2";
                };
            };
            readonly required: readonly ["scope_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Content-Type": {
                    readonly type: "string";
                    readonly enum: readonly ["application/json"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Request data type. Currently, only application/json is supported.";
                };
                readonly Date: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Date and time when the request was generated. The signature will be valid for 15 minutes from this Date. The date should be in the format “Thu, 01 Jan 2023 12:00:00 +0000” (RFC2822)";
                };
                readonly "Content-MD5": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "For the request body, it is necessary to calculate the MD5 hash and indicate it in the header in lowercase. At the same time, it is important to keep in mind that the request body is calculated as a stream of bytes without considering the end of JSON markup, and if there are “\\n” or spaces at the end, they will also be taken into account. For GET requests, MD5 must also be calculated. Even if nothing is passed in the request body, MD5 will be obtained from an empty string.";
                };
                readonly "X-Signature": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Signature of the request as a string. It is formed from the name of the method (GET/POST) in uppercase, with the values of the headers concatenated by “\\n”. Header values ​​come in a specific order. If there is no header, an empty string is specified instead. Next, add the requested path from the URL without the protocol and domain (without GET parameters) to the line. The resulting string is calculated using HMAC-SHA1, and as a secret, we use the channel secret obtained during registration. The resulting hash in lowercase is indicated in the X-Signature header.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "204": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateDeliveryStatus: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly RAW_BODY: {
                readonly type: "object";
                readonly properties: {
                    readonly msgid: {
                        readonly type: "string";
                        readonly description: "Message ID on Kommo side. You obtain it in the step 5. Must match the msgid in the method URL.";
                    };
                    readonly delivery_status: {
                        readonly type: "string";
                        readonly enum: readonly ["-", "1", "2", "-1"];
                    };
                    readonly error_code: {
                        readonly type: "string";
                        readonly enum: readonly ["901", "902", "903", "904", "905"];
                    };
                    readonly error: {
                        readonly type: "string";
                        readonly description: "An error text will be displayed to the user. Don’t send in case of status not error.";
                    };
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly scope_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "You can obtain scope ID in the Step 2";
                };
                readonly msgid: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Message ID";
                };
            };
            readonly required: readonly ["scope_id", "msgid"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Content-Type": {
                    readonly type: "string";
                    readonly enum: readonly ["application/json"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Request data type. Currently, only application/json is supported.";
                };
                readonly Date: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Date and time when the request was generated. The signature will be valid for 15 minutes from this Date. The date should be in the format “Thu, 01 Jan 2023 12:00:00 +0000” (RFC2822)";
                };
                readonly "Content-MD5": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "For the request body, it is necessary to calculate the MD5 hash and indicate it in the header in lowercase. At the same time, it is important to keep in mind that the request body is calculated as a stream of bytes without considering the end of JSON markup, and if there are “\\n” or spaces at the end, they will also be taken into account. For GET requests, MD5 must also be calculated. Even if nothing is passed in the request body, MD5 will be obtained from an empty string.";
                };
                readonly "X-Signature": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Signature of the request as a string. It is formed from the name of the method (GET/POST) in uppercase, with the values of the headers concatenated by “\\n”. Header values ​​come in a specific order. If there is no header, an empty string is specified instead. Next, add the requested path from the URL without the protocol and domain (without GET parameters) to the line. The resulting string is calculated using HMAC-SHA1, and as a secret, we use the channel secret obtained during registration. The resulting hash in lowercase is indicated in the X-Signature header.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { ChatHistory, ConnectChannel, CreateChat, DisconnectChannel, SendImportMessages, SendReactions, TypingInfo, UpdateDeliveryStatus };
