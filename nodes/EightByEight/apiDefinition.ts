import {IEghtOperationList} from "./types";
import {INodeProperties} from "n8n-workflow/dist/Interfaces";

export const RESOURCE_SMS = 'sms' as const;
export type RESOURCE_LIST = typeof RESOURCE_SMS;

export const messageForm: INodeProperties[] = [
    {
        displayName: 'Destination',
        name: 'destination',
        type: 'string',
        required: true,
        default: '',
        description: 'MSISDN (destination mobile phone number). We accept both international and national formats (for national you have to specify country in the dedicated field).',
    },
    {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        required: true,
        default: '',
        description: 'Message body - the text of the message',
    },
    {
        displayName: 'Country',
        name: 'country',
        type: 'string',
        default: '',
        description: 'Optional country code of Destination number(ISO 3166-1 alpha-2), if you know it. It will help to convert number from national to international format',
    },
    {
        displayName: 'Source',
        name: 'source',
        type: 'string',
        default: '',
        description: 'Source number (SenderId) - "From:" field for the SMS',
    },
    {
        displayName: 'Client managed id',
        name: 'clientMessageId',
        type: 'string',
        default: '',
        description: 'Client managed id for the message : your own unique reference',
    },
    {
        displayName: 'Encoding',
        name: 'encoding',
        type: 'options',
        description: 'Select character encoding format',
        options: [
            {
                name: 'Auto Detect',
                value: 'AUTO',
                description: 'Automatically detect encoding',
            },
            {
                name: 'GSM7',
                value: 'GSM7',
            },
            {
                name: 'UCS2',
                value: 'UCS2',
            },
        ],
        default: 'AUTO',
    },
    //TODO : sendSMS && sendSMSBatch
    {
        displayName: 'Schedule date',
        name: 'scheduled',
        type: 'dateTime',
        default: '',
        description: 'Date and time when a schedule delivery of the message must happen',
    },
    {
        displayName: 'Expiry date',
        name: 'expiry',
        type: 'dateTime',
        default: '',
        description: 'Date and time after which a message cannot be sent',
    },
    {
        displayName: 'Webhook url',
        name: 'dlrCallbackUrl',
        type: 'string',
        default: '',
        description: 'Webhook URL where delivery status for the SMS will be posted (Overwrites your default account callback URL).',
        required: false,
        ignoreValidationDuringExecution: true
    },
    {
        displayName: 'Client Ip',
        name: 'clientIp',
        type: 'string',
        default: '',
        description: 'Fill this field to limit the number of SMS sent within a period of time based on IP address.\n' +
            'If the request is forwarded by one or multiple proxies, to enforce the rate limit to client IP correctly, you may want to look up the X-Forwarded-For header and retrieve the actual origin IP and assign it to this field.',
        required: false,
    },
    {
        displayName: 'Track',
        name: 'track',
        type: 'string',
        default: '',
        description: 'Indicate whether use the sent SMS for tracking conversion rate.\n' +
            'Use Outcome for tracking and None for no tracking.\n' +
            'If no value is provided, there\'s no tracking unless subaccount has been configured for tracking beforehand.\n' +
            'The conversion rate is measured by 8x8 to monitor your application QoS.\n' +
            'To complete the tracking, you will also need to use Feedback API to update the sent result.',
        required: false,
    }
];


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
                values: [...messageForm],
                required: true
            }],
        },
        //Send SMS batch
        //TODO: sendSMSBatch
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
                    resource: [RESOURCE_SMS],
                    operation: ["sendSMSBatch"],
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
                    values: [
                        {
                            displayName: 'Destination',
                            name: 'destination',
                            type: 'string',
                            required: true,
                            default: '',
                            description: 'Phone numbers to send an SMS to',
                        },
                    ],
                },
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
                    values: [
                        {
                            displayName: 'Text',
                            name: 'text',
                            type: 'string',
                            required: true,
                            default: '',
                            description: 'SMS body (ie: text of the message)',
                        },
                        {
                            displayName: 'Source',
                            name: 'source',
                            type: 'string',
                            required: false,
                            default: '',
                            description: 'Alphanumeric or numeric string used as Sender ID for the SMS',
                        },
                        {
                            displayName: 'Encoding',
                            name: 'encoding',
                            type: 'options',
                            description: 'Select character encoding format',
                            options: [
                                {
                                    name: 'Auto Detect',
                                    value: 'AUTO',
                                    description: 'Automatically detect encoding',
                                },
                                {
                                    name: 'GSM7',
                                    value: 'GSM7',
                                },
                                {
                                    name: 'UCS2',
                                    value: 'UCS2',
                                },
                            ],
                            default: 'AUTO',
                        },
                        {
                            displayName: 'Schedule date',
                            name: 'scheduled',
                            type: 'dateTime',
                            default: '',
                            description: 'Date and time when a schedule delivery of the message must happen',
                        },
                        {
                            displayName: 'Expiry date',
                            name: 'expiry',
                            type: 'dateTime',
                            default: '',
                            description: 'Date and time after which a message cannot be sent',
                        },
                        {
                            displayName: 'Webhook url',
                            name: 'dlrCallbackUrl',
                            type: 'string',
                            default: '',
                            description: 'Webhook URL where delivery status for the SMS will be posted (Overwrites your default account callback URL).',
                            required: false,
                            ignoreValidationDuringExecution: true
                        },
                    ],
                },
            ],
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
                    values: [...messageForm],
                },
            ],
        }
        ]
    }
] as const
