"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'kommo/unknown (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    SDK.prototype.connectChannel = function (body, metadata) {
        return this.core.fetch('/{channel_id}/connect', 'post', body, metadata);
    };
    /**
     * This method allows you to create a chat before sending the first message.
     *
     * @summary Step 3: Create new chat
     * @throws FetchError<400, types.CreateChatResponse400> 400
     * @throws FetchError<403, types.CreateChatResponse403> 403
     * @throws FetchError<404, types.CreateChatResponse404> 404
     */
    SDK.prototype.createChat = function (body, metadata) {
        return this.core.fetch('/{scope_id}/chats', 'post', body, metadata);
    };
    SDK.prototype.sendImportMessages = function (body, metadata) {
        return this.core.fetch('/{scope_id}', 'post', body, metadata);
    };
    /**
     * The method allows you to get a list of messages in a specific chat.
     *
     * @summary Get chat history
     * @throws FetchError<400, types.ChatHistoryResponse400> 400
     * @throws FetchError<403, types.ChatHistoryResponse403> 403
     */
    SDK.prototype.chatHistory = function (metadata) {
        return this.core.fetch('/{scope_id}/chats/{conversation_id}/history', 'get', metadata);
    };
    SDK.prototype.updateDeliveryStatus = function (body, metadata) {
        return this.core.fetch('/{scope_id}/{msgid}/delivery_status', 'post', body, metadata);
    };
    SDK.prototype.typingInfo = function (body, metadata) {
        return this.core.fetch('/{scope_id}/typing', 'post', body, metadata);
    };
    SDK.prototype.disconnectChannel = function (body, metadata) {
        return this.core.fetch('/{channel_id}/disconnect', 'delete', body, metadata);
    };
    SDK.prototype.sendReactions = function (body, metadata) {
        return this.core.fetch('/{scope_id}/react', 'post', body, metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
