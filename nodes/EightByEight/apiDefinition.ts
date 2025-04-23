import {IEghtOperationList} from "./types";
import {
    callVerificationForm,
    smsDestinationForm,
    smsMessageForm,
    smsTemplateForm,
    smsVerificationForm, whatsAppVerificationForm
} from "./forms/sms.forms";

export const RESOURCE_SMS = 'sms' as const;
export const RESOURCE_VERIFICATION = 'verification_api' as const;
export type RESOURCE_LIST = typeof RESOURCE_SMS | typeof RESOURCE_VERIFICATION;

export const apiDefinition: IEghtOperationList[] = [
    {
        resource: {
            name: 'SMS',
            value: 'sms',
        },
        base: 'https://sms.8x8.com/api/v1/subaccounts/{subAccountId}/messages',
        operations: [
            {
                operation: 'sendSMS',
                uri: '/',
                method: 'POST',
                displayName: 'Send SMS',
                description: "Send a message",
                default: true,
            },
            {
                operation: 'sendSMSBatch',
                uri:
                    '/batch',
                method:
                    'POST',
                displayName:
                    'Send SMS batch',
                description:
                    "Send a message and wait for a reply"
            },
            {
                operation: 'cancelBatchScheduledSMS',
                uri:
                    '/batch/{batchId}',
                method:
                    'DELETE',
                displayName:
                    'Cancel batch of scheduled SMS',
                description:
                    "Send a templated message"
            },
            {
                operation: 'sendSMSSuccessFeedback',
                uri:
                    '/{umid}/feedback',
                method:
                    'POST',
                displayName:
                    'SMS Success Feedback',
                description:
                    "Send a templated message"
            },
            {
                operation: 'cancelTheScheduledSMS',
                uri:
                    '/{umid}',
                method:
                    'DELETE',
                displayName:
                    'Cancel the scheduled SMS',
                description:
                    "Send a templated message"
            }
        ],
        parameters: [{
            displayName: "Sub-Account ID",
            name: "subAccountId",
            type: "string",
            default: "",
            description: "ID of the sub-account.",
            displayOptions: {
                show: {
                    resource: [RESOURCE_SMS],
                    operation: ["sendSMS", "sendSMSBatch", "cancelBatchScheduledSMS", "sendSMSSuccessFeedback", "cancelTheScheduledSMS"],
                },
            },
            required: true,
            validateType: 'string',
        },
        {
            displayName: "Batch ID",
            name: "batchId",
            type: "string",
            default: "",
            description: "Batch id",
            displayOptions: {
                show: {
                    resource: [RESOURCE_SMS],
                    operation: ["cancelBatchScheduledSMS"],
                },
            },
            required: true,
            validateType: 'string',
        },
        {
            displayName: "Umid ID",
            name: "umid",
            type: "string",
            default: "",
            description: "Umid id",
            displayOptions: {
                show: {
                    resource: [RESOURCE_SMS],
                    operation: ["sendSMSSuccessFeedback", "cancelTheScheduledSMS"],
                },
            },
            required: true,
            validateType: 'string',
        },
        //Send sms
        {
            displayName: 'Message',
            name: 'message',
            type: 'fixedCollection',
            typeOptions: {
                multipleValues: false,
            },
            displayOptions: {
                show: {
                    resource: [RESOURCE_SMS],
                    operation: ['sendSMS'],
                },
            },
            default: {},
            description: 'Message composition parameters',
            placeholder: 'Add Message Fields',
            options: [{
                displayName: 'Message Details',
                name: 'message',
                values: [...smsMessageForm],
                required: true
            }],
        },
        //Send SMS batch
        {
            displayName: 'Client batch id',
            name: 'clientBatchId',
            type: 'string',
            default: '',
            description: 'Client managed id for this batch of messages : your own unique reference',
            required: false,
            displayOptions: {
                show: {
                    resource: [RESOURCE_SMS],
                    operation: ["sendSMSBatch"],
                },
            },
        },
        {
            displayName: 'Include message in response?',
            name: 'includeMessagesInResponse',
            type: 'options',
            default: '',
            description: 'Determines whether the response should include individual details for each message sent',
            options: [
                {
                    name: 'Skip',
                    value: '',
                },
                {
                    name: 'True',
                    value: true,
                },
                {
                    name: 'False',
                    value: false,
                },
            ],
            displayOptions: {
                show: {
                    resource: [RESOURCE_SMS],
                    operation: ["sendSMSBatch"],
                },
            },
        },
        {
            displayName: 'Client Ip',
            name: 'clientIp',
            type: 'string',
            default: '',
            description: 'Fill this field to limit the number of SMS sent within a period of time based on IP address.\n' +
                    'If the request is forwarded by one or multiple proxies, to enforce the rate limit to client IP correctly, you may want to look up the X-Forwarded-For header and retrieve the actual origin IP and assign it to this field.',
            required: false,
            displayOptions: {
                show: {
                    resource: [RESOURCE_SMS, RESOURCE_VERIFICATION],
                    operation: ["sendSMSBatch", "initiateVerification"],
                },
            },
        },
        {
            displayName: 'Client Ip',
            name: 'clientIp',
            type: 'string',
            default: '',
            description: 'This value designates the originated IP address of the active data session on client\'s device.',
            required: false,
            displayOptions: {
                show: {
                    resource: [RESOURCE_SMS],
                    operation: ["smaCoverageCheck"],
                },
            },
        },
        {
            required: true,
            displayName: 'Destinations',
            name: 'destinations',
            type: 'fixedCollection',
            typeOptions: {
                multipleValues: true,
                sortable: true,
            },
            displayOptions: {
                show: {
                    resource: [RESOURCE_SMS],
                    operation: ["sendSMSBatch"],
                },
            },
            default: {},
            description: 'Array containing the list of destinations phone numbers to send an SMS to',
            placeholder: 'Add Destination',
            options: [
                {
                    name: 'destinations',
                    displayName: 'Destination',
                    values: [...smsDestinationForm]
                }
            ],
        },
        {
            required: false,
            displayName: 'Template',
            name: 'template',
            type: 'fixedCollection',
            typeOptions: {
                multipleValues: false,
            },
            displayOptions: {
                show: {
                    resource: [RESOURCE_SMS],
                    operation: ["sendSMSBatch"],
                },
            },
            default: {},
            description: 'Object applying common properties to the SmsRequest objects in messages',
            placeholder: 'Add template',
            options: [
                {
                    name: 'template',
                    displayName: 'Template',
                    values: [...smsTemplateForm],
                }]
        },
        {
            displayName: 'Messages',
            name: 'messages',
            type: 'fixedCollection',
            typeOptions: {
                multipleValues: true,
                sortable: true,
            },
            displayOptions: {
                show: {
                    resource: [RESOURCE_SMS],
                    operation: ["sendSMSBatch"],
                },
            },
            default: {},
            description: 'Array of message objects to send',
            placeholder: 'Add Message',
            options: [
                {
                    name: 'messages',
                    displayName: 'Message',
                    values: [...smsMessageForm],
                },
            ],
        },
        {
            displayName: "Brand",
            name: "brand",
            type: "string",
            default: "",
            description: "If used, the brand parameter can be inserted as a placeholder in the text of the message defined in the template object. The brand could be inserted in plain-text in the text but using placeholders allows you to maintain a single request method while enabling Verify request across a wide range of products or brands.",
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            required: false,
            validateType: 'string',
        },
        {
            displayName: "CodeLength",
            name: "codeLength",
            type: "number",
            default: "4",
            description: "It designates the length the code that will be generated and inserted in your message.\n" +
                    "The value should be greater or equal to 3 and less or equal to 10.",
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            required: true,
            validateType: 'number',
        },
        {
            displayName: "CodeValidity",
            name: "codeValidity",
            type: "number",
            default: "300",
            description: "It designates the expiry period after which the generated code will not be valid for verification anymore. This value represents seconds. The value should be greater or equal to 30 and less or equal to 7200.",
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            required: true,
            validateType: 'number',
        },
        {
            displayName: "CodeType",
            name: "codeType",
            type: "options",
            default: "",
            options: [
                {
                    name: 'Skip',
                    value: '',
                },
                {
                    name: 'NUMERIC',
                    value: 'NUMERIC',
                },
                {
                    name: 'NUMERIC_WITH_DASH',
                    value: 'NUMERIC_WITH_DASH',
                },
                {
                    name: 'ALPHANUMERIC',
                    value: 'ALPHANUMERIC',
                },
                {
                    name: 'ALPHANUMERIC_CAPITALS',
                    value: 'ALPHANUMERIC_CAPITALS',
                },
                {
                    name: 'ALPHANUMERIC_EASY',
                    value: 'ALPHANUMERIC_EASY',
                },
            ],
            description: "It can be set to the following standard modes:\n" +
                    "NUMERIC\n" +
                    "regex: ^[0-9]{3,10}$)\n" +
                    "example: 123456\n" +
                    "NUMERIC_WITH_DASH\n" +
                    "regex ==> ^[0-9-]{3,10}$)\n" +
                    "example: 234-3294 or 231-461\n" +
                    "remarks:\n" +
                    "if codeLength == 3 then no dash sign will be used (=NUMERIC)\n" +
                    "only one dash will be used in the code and located at the center of the code or moved one character to the left of the center of the code if the code cannot be split into 2 halves of digits of same length (see example)\n" +
                    "ALPHANUMERIC\n" +
                    "regex ==> ^[a-zA-Z0-9]{3,10}$)\n" +
                    "example: fiQdAsr315\n" +
                    "ALPHANUMERIC_CAPITALS\n" +
                    "regex ==> ^[A-Z0-9]{3,10}$)\n" +
                    "example: FIQDASR315\n" +
                    "ALPHANUMERIC_EASY\n" +
                    "(regex: ^((?![IOQSZ])[A-Z0-9]){3,10}$)\n" +
                    "example: FDAR315\n" +
                    "remark: same as ALPHANUMERIC_CAPITALS but excluding I, O, Q, S and Z",
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            required: false,
        },
        {
            displayName: "Template",
            name: "templateString",
            type: "string",
            default: "",
            description: "It is only used for sms and call channels.\n" +
                    "It defines the content of your message, it can be customized for each request using the placeholders {code} and {brand}.\n" +
                    "NB: if personalizing the text of the template, make sure to include the {code} placeholder or your Verify SMS/CALL will not contain any code. The same goes with the {brand} placeholder, if not provided but used in the template, it will be empty.\n" +
                    "Default text (if no value is provided):\n" +
                    "If brand is specified:\n" +
                    "{brand}: Your verification code is {code}\n" +
                    "If brand is not specified:\n" +
                    "Your verification code is {code}",
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            required: false,
            validateType: 'string',
        },
        {
            displayName: "Language",
            name: "language",
            type: "string",
            default: "",
            description: "",
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            required: false,
            validateType: 'string',
        },
        {
            displayName: "ResetSession",
            name: "resetSession",
            type: "string",
            default: "",
            description: "This value defines the API behavior when it comes to code generation in the case of multiple requests sent to the same destination during the period of validity of a code sent previously.\n" +
                    "If the value is set to true: a new code will be generated and the verification request will be reinitialized. Be aware that it can lead to some confusion if the 2 SMS reach the destination device at the same time.\n" +
                    "If the value is set to false: as long as the verification is still in pending state, the same code will be re-sent and the validity will be extended.\n" +
                    "The default behavior (if the parameter is left empty) is to keep existing session with same OTP.",
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            required: false,
            validateType: 'string',
        },
        {
            displayName: "ResendingInterval",
            name: "resendingInterval",
            type: "number",
            default: "10",
            description: "It defines the API behavior when it comes to multiple requests to send a code to the same destination phone number during the validity time of a verification process.\n" +
                    "This value represents seconds.\n" +
                    "If the value is specified, the system will compare the timing of the current request with the last one for the same destination number. If the time difference between the two is less then resending interval, the OTP request will not be re-sent to the customer and the API will throw a 403 (forbidden) error.\n" +
                    "The value should be greater or equal to 10 and less or equal to 7200.",
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            required: true,
            validateType: 'number',
        },
        {
            displayName: "CallbackUrl",
            name: "callbackUrl",
            type: "string",
            default: "",
            description: "It defines the Webhook URL where status of verification attempts will be posted.",
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            required: false,
            validateType: 'string',
        },
        {
            required: false,
            displayName: 'SMS',
            name: 'sms',
            type: 'fixedCollection',
            typeOptions: {
                multipleValues: false,
            },
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            default: {},
            description: 'This object is taken into account only when the channel property is set to sms',
            placeholder: 'Add SMS parameter',
            options: [
                {
                    name: 'sms',
                    displayName: 'SMS',
                    values: [...smsVerificationForm],
                }]
        },
        {
            required: false,
            displayName: 'Call',
            name: 'call',
            type: 'fixedCollection',
            typeOptions: {
                multipleValues: false,
            },
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            default: {},
            description: 'This object is taken into account only when the channel property is set to call',
            placeholder: 'Add call parameter',
            options: [
                {
                    name: 'call',
                    displayName: 'Call',
                    values: [...callVerificationForm],
                }]
        },
        {
            required: false,
            displayName: 'WhatsApp',
            name: 'whatsApp',
            type: 'fixedCollection',
            typeOptions: {
                multipleValues: false,
            },
            displayOptions: {
                show: {
                    resource: [RESOURCE_VERIFICATION],
                    operation: ["initiateVerification"],
                },
            },
            default: {},
            description: 'This object is mandatory and is only taken into account when the channel property is set to whatsapp\n',
            placeholder: 'Add WhatsApp parameter',
            options: [
                {
                    name: 'whatsApp',
                    displayName: 'WhatsApp',
                    values: [...whatsAppVerificationForm],
                }]
        },
        ]
    },
    {
        resource: {
            name: 'Verification API',
            value: 'verification_api',
        },
        base: 'https://verify.8x8.com/api/v2/subaccounts/{subAccountId}',
        operations: [
            {
                operation: 'initiateVerification',
                uri: '/sessions',
                method: 'POST',
                displayName: 'Initiate verification',
                description: "This method allows you to:\n" +
                    "Generate and send a message containing a one-time password\n" +
                    "Place a Voice call containing a one-time password\n" +
                    "Initiate Silent Mobile Authentication (SMA) verification",
                default: true,
            },
            {
                operation: 'validateVerification',
                uri: '/sessions/{sessionId}',
                method: 'GET',
                displayName: 'Validate verification',
                description: "This method allows you to check the status of a verification request or to validate a code submitted by one of your user.",
            },
            {
                operation: 'smaCoverageCheck',
                uri: '/sma/coverage',
                method: 'POST',
                displayName: 'SMA coverage check',
                description: "This method allows you to check if user's device is supported by Silent Mobile Authentication (SMA). Could be used to perform pre-check before initiating SMA verification as SMA only support devices using a mobile data connection and does not support all phone numbers.",
            },
        ],
        parameters: [
            {
                displayName: "Destination",
                name: "destination",
                type: "string",
                default: "",
                description: "This value is the destination phone number to check.\n" +
                    "The destination can be submitted in two different formats:\n" +
                    "Local: a phone number without the international dialing prefix for the country. NB: when submitting a request with a destination in local format, the country parameter should not be empty.\n" +
                    "International: when using a destination in international format, the destination should be submitted as follow: it should include the international dialing prefix for the country (ex:65 for Singapore). 8x8 API accepts destination phone number with a leading + sign or without. The leading 0 of the local phone number, coming after the international dialing prefix has to be removed.",
                displayOptions: {
                    show: {
                        resource: [RESOURCE_VERIFICATION],
                        operation: ["smaCoverageCheck", "initiateVerification"],
                    },
                },
                validateType: 'string',
            },
            {
                displayName: "Country",
                name: "country",
                type: "string",
                default: "",
                description: "When using a local phone number (see above), the country parameter should not be left empty, it should contain the ISO Alpha-2 designating the country of origin of the destination phone number. 8x8 will then automatically adapt the destination for international routing by prepending the local phone number by with the international dialing prefix and removing any potential leading 0 from the local phone number.\n" +
                    "Without submitting this parameter for a local phone number, the 8x8 platform will not be able correctly process the phone number.",
                displayOptions: {
                    show: {
                        resource: [RESOURCE_VERIFICATION],
                        operation: ["smaCoverageCheck", "initiateVerification"],
                    },
                },
                validateType: 'string',
            },
            {
                displayName: "SessionId",
                name: "sessionId",
                type: "string",
                default: "",
                description: "SessionId generated on verification request",
                displayOptions: {
                    show: {
                        resource: [RESOURCE_VERIFICATION],
                        operation: ["validateVerification"],
                    },
                },
                validateType: 'string',
            },
            {
                displayName: 'Channel',
                name: 'channel',
                type: 'options',
                default: 'sms',
                description: 'Determines whether the response should include individual details for each message sent',
                required: false,
                options: [
                    {
                        name: 'sms',
                        value: 'sms',
                    },
                    {
                        name: 'call',
                        value: 'call',
                    },
                    {
                        name: 'whatsapp',
                        value: 'whatsapp',
                    },
                    {
                        name: 'viber',
                        value: 'viber',
                    },
                    {
                        name: 'sma',
                        value: 'sma',
                    },
                ],
                displayOptions: {
                    show: {
                        resource: [RESOURCE_SMS],
                        operation: ["sendSMSBatch"],
                    },
                },
            },
            {
                displayName: 'Channel',
                name: 'channel',
                type: 'options',
                default: 'sms',
                description: 'Determines whether the response should include individual details for each message sent',
                required: false,
                options: [
                    {
                        name: 'sms',
                        value: 'sms',
                    },
                    {
                        name: 'call',
                        value: 'call',
                    },
                    {
                        name: 'whatsapp',
                        value: 'whatsapp',
                    }
                ],
                displayOptions: {
                    show: {
                        resource: [RESOURCE_VERIFICATION],
                        operation: ["initiateVerification"],
                    },
                },
            },
        ]
    },

]
