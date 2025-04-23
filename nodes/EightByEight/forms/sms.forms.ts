import {INodeProperties} from "n8n-workflow/dist/Interfaces";

export const smsMessageForm: INodeProperties[] = [
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

export const smsVerificationForm: INodeProperties[] = [
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
]

export const callVerificationForm: INodeProperties[] = [
    {
        displayName: 'Source',
        name: 'source',
        type: 'string',
        required: false,
        default: '',
        description: 'Alphanumeric or numeric string used as Sender ID for the SMS',
    },
    {
        displayName: 'Speed',
        name: 'speed',
        type: 'number',
        required: true,
        default: '0.8',
        description: 'It designates the speed of speech in the resulting message.\n' +
            'Accepted values range from 0.5 to 2, as a two digit number.',
    },
    {
        displayName: 'Repetition',
        name: 'repetition',
        type: 'number',
        required: true,
        default: '2',
        description: 'It designated the amount of times to repeat the text content.\n' +
            'Accepted values are 1, 2 or 3.',
    },
    {
        displayName: 'VoiceProfile',
        name: 'voiceProfile',
        type: 'string',
        required: false,
        default: '',
        description: 'It designates the voice, gender and accent for the message you are sending.\n' +
            'All available voice profiles can be found at https://developer.8x8.com/connect/reference/vm-voice-languages-and-profiles.\n' +
            'The default value will be chosen based on the language parameter value.',
    },
]

export const whatsAppVerificationForm: INodeProperties[] = [
    {
        displayName: 'TemplateName',
        name: 'templateName',
        type: 'string',
        required: true,
        default: '',
        description: 'It designates the name of the WhatsApp Authentication Template to be used.',
    },
]

export const smsTemplateForm: INodeProperties[] = [
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
]

export const smsDestinationForm: INodeProperties[] = [
    {
        displayName: 'Destination',
        name: 'destination',
        type: 'string',
        required: true,
        default: '',
        description: 'Phone numbers to send an SMS to',
    },
]