import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    /**
     * Step 2: Connect chat channel
     *
     * @throws FetchError<400, types.ConnectChannelResponse400> 400
     */
    connectChannel(body: types.ConnectChannelBodyParam, metadata: types.ConnectChannelMetadataParam): Promise<FetchResponse<200, types.ConnectChannelResponse200>>;
    connectChannel(metadata: types.ConnectChannelMetadataParam): Promise<FetchResponse<200, types.ConnectChannelResponse200>>;
    /**
     * This method allows you to create a chat before sending the first message.
     *
     * @summary Step 3: Create new chat
     * @throws FetchError<400, types.CreateChatResponse400> 400
     * @throws FetchError<403, types.CreateChatResponse403> 403
     * @throws FetchError<404, types.CreateChatResponse404> 404
     */
    createChat(body: types.CreateChatBodyParam, metadata: types.CreateChatMetadataParam): Promise<FetchResponse<200, types.CreateChatResponse200>>;
    /**
     * Step 5: Send, receive, or import messages
     *
     * @throws FetchError<400, types.SendImportMessagesResponse400> 400
     * @throws FetchError<403, types.SendImportMessagesResponse403> 403
     */
    sendImportMessages(body: types.SendImportMessagesBodyParam, metadata: types.SendImportMessagesMetadataParam): Promise<FetchResponse<200, types.SendImportMessagesResponse200>>;
    sendImportMessages(metadata: types.SendImportMessagesMetadataParam): Promise<FetchResponse<200, types.SendImportMessagesResponse200>>;
    /**
     * The method allows you to get a list of messages in a specific chat.
     *
     * @summary Get chat history
     * @throws FetchError<400, types.ChatHistoryResponse400> 400
     * @throws FetchError<403, types.ChatHistoryResponse403> 403
     */
    chatHistory(metadata: types.ChatHistoryMetadataParam): Promise<FetchResponse<200, types.ChatHistoryResponse200> | FetchResponse<204, types.ChatHistoryResponse204>>;
    /**
     * The method allows you to update the delivery status of a specific message.
     *
     * @summary Update message delivery status
     * @throws FetchError<400, types.UpdateDeliveryStatusResponse400> 400
     * @throws FetchError<403, types.UpdateDeliveryStatusResponse403> 403
     * @throws FetchError<404, types.UpdateDeliveryStatusResponse404> 404
     */
    updateDeliveryStatus(body: types.UpdateDeliveryStatusBodyParam, metadata: types.UpdateDeliveryStatusMetadataParam): Promise<FetchResponse<200, types.UpdateDeliveryStatusResponse200>>;
    updateDeliveryStatus(metadata: types.UpdateDeliveryStatusMetadataParam): Promise<FetchResponse<200, types.UpdateDeliveryStatusResponse200>>;
    /**
     * The method provides transferring information that the client is currently typing
     * something in the messenger. The information will be displayed in Kommo interface.
     *
     * @summary Transfer typing information
     * @throws FetchError<403, types.TypingInfoResponse403> 403
     * @throws FetchError<404, types.TypingInfoResponse404> 404
     */
    typingInfo(body: types.TypingInfoBodyParam, metadata: types.TypingInfoMetadataParam): Promise<FetchResponse<204, types.TypingInfoResponse204>>;
    typingInfo(metadata: types.TypingInfoMetadataParam): Promise<FetchResponse<204, types.TypingInfoResponse204>>;
    /**
     * After disconnecting the channel, you will stop receiving webhooks for outgoing messages.
     *  The “initiate conversation” option will also be disabled in the lead card (upon the
     * expiration of the UI/UX cache).
     *
     * @summary Disconnect chat channel
     * @throws FetchError<400, types.DisconnectChannelResponse400> 400
     * @throws FetchError<403, types.DisconnectChannelResponse403> 403
     * @throws FetchError<404, types.DisconnectChannelResponse404> 404
     */
    disconnectChannel(body: types.DisconnectChannelBodyParam, metadata: types.DisconnectChannelMetadataParam): Promise<FetchResponse<200, types.DisconnectChannelResponse200>>;
    disconnectChannel(metadata: types.DisconnectChannelMetadataParam): Promise<FetchResponse<200, types.DisconnectChannelResponse200>>;
    /**
     * The method allows you to send or remove a reaction from a specific message.
     *
     * @summary Send or withdraw reactions
     * @throws FetchError<400, types.SendReactionsResponse400> 400
     * @throws FetchError<403, types.SendReactionsResponse403> 403
     * @throws FetchError<404, types.SendReactionsResponse404> 404
     */
    sendReactions(body: types.SendReactionsBodyParam, metadata: types.SendReactionsMetadataParam): Promise<FetchResponse<200, types.SendReactionsResponse200>>;
    sendReactions(metadata: types.SendReactionsMetadataParam): Promise<FetchResponse<200, types.SendReactionsResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
