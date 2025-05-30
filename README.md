# Amojo API Integration

This Node.js application implements Amojo API integration with signed requests for channel communication.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   # Server Configuration
   PORT=3000

   # Amojo API Configuration
   AMOJO_SECRET=your_amojo_secret
   AMOJO_BASE_URL=https://amojo.amocrm.ru
   AMOJO_CUSTOM_ORIGIN_ID=your_custom_origin_id
   AMOJO_ACCOUNT_ID=your_account_id
   AMOJO_CHANNEL_TITLE=your_channel_title
   AMOJO_HOOK_API_VERSION=v2

   # API Timeouts (in milliseconds)
   API_TIMEOUT=5000
   ```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| PORT | Server port number | No | 3000 |
| AMOJO_SECRET | Your Amojo API secret key | Yes | - |
| AMOJO_BASE_URL | Amojo API base URL | Yes | - |
| AMOJO_CUSTOM_ORIGIN_ID | Your custom origin ID | Yes | - |
| AMOJO_ACCOUNT_ID | Your Amojo account ID | Yes | - |
| AMOJO_CHANNEL_TITLE | Title for your channel | Yes | - |
| AMOJO_HOOK_API_VERSION | API version for hooks | Yes | - |
| API_TIMEOUT | API request timeout in ms | No | 5000 |

## Running the Application

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Connect to Amojo Channel
- **POST** `/connect-channel`
- This endpoint implements the signed request to connect to an Amojo channel
- The implementation includes:
  - RFC2822 date formatting
  - MD5 checksum calculation
  - SHA1 HMAC signature generation
  - Proper header formatting
- Example Response:
  ```json
  {
    "success": true,
    "status": 200,
    "data": {
      // Response from Amojo API
    }
  }
  ```

## Implementation Details

The application implements the following security measures:
- MD5 checksum of request body
- SHA1 HMAC signature using the provided secret
- RFC2822 date formatting
- Content-Type verification
- Proper header formatting according to Amojo API specifications
- Environment variable validation on startup

### Request Headers
The following headers are automatically generated:
- `Date`: RFC2822 formatted date
- `Content-Type`: application/json
- `Content-MD5`: MD5 checksum of request body
- `X-Signature`: SHA1 HMAC signature

### Error Handling

The application includes comprehensive error handling:
- Missing environment variables
- Invalid request format
- Network errors
- API response errors
- Timeout handling (configurable via API_TIMEOUT)

## Security Notes

- The implementation uses secure cryptographic functions
- All signatures and checksums are properly formatted
- Request timeout is configurable
- Error responses include detailed information for debugging
- Sensitive configuration is stored in environment variables
- Environment variables are validated on application startup 