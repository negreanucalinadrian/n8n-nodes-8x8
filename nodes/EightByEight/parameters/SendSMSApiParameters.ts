import {INodeProperties} from "n8n-workflow/dist/Interfaces";

const messageForm: INodeProperties[] = [
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
    //scheduled
    //expiry
    //dlrCallbackUrl
    //clientIp
    //track
];

export const sendSMSApiParameters: INodeProperties[] = [{
    displayName: "Sub-Account ID",
    name: "subAccountId",
    type: "string",
    default: "",
    description: "ID of the sub-account.",
    displayOptions: {
        show: {
            resource: ["sms"],
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
            resource: ["sms"],
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
            resource: ["sms"],
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
    },  // Remove sortable - not needed for fixed collections
    displayOptions: {
        show: {
            resource: ['sms'],
            operation: ['sendSMS'],
        },
    },
    default: {},
    description: 'Message composition parameters',
    placeholder: 'Add Message Fields',
    options: [{
        displayName: 'Message Details',
        name: 'details',
        values: [...messageForm],  // Wrap in "values" for fixedCollection
    }],
},
//Send SMS batch
//TODO: sendSMSBatch
//clientBatchId
//destinations
//template
//includeMessagesInResponse
//clientIp
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
            resource: ["sms"],
            operation: ["sendSMSBatch"],
        },
    },
    default: {},
    description: 'Array of message objects to send',
    placeholder: 'Add Message',
    options: [
        {
            name: 'message',
            displayName: 'Message',
            values: [...messageForm],
        },
    ],
}
]
