import {IEghtOperationList} from "./types";
import {smsDestinationForm, smsMessageForm, smsTemplateForm} from "./forms";

export const RESOURCE_SMS = 'sms' as const;
export type RESOURCE_LIST = typeof RESOURCE_SMS;

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
        }
        ]
    }
]
