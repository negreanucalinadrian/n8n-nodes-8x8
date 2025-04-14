import {INodeProperties} from "n8n-workflow";

export const sendSMSApi: INodeProperties[] =
    [{
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ["sms"],
            },
        },
        options: [
            {
                name: "Send SMS",
                value: "sendSMS",
                description: "Send a message",
            },
            {
                name: "Send SMS batch",
                value: "sendSMSBatch",
                description: "Send a message and wait for a reply",
            },
            {
                name: "Cancel batch of scheduled SMS",
                value: "cancelBatchScheduledSMS",
                description: "Send a templated message",
            },
            {
                name: "SMS Success Feedback",
                value: "sendSMSSuccessFeedback",
                description: "Send a templated message",
            },
            {
                name: "Cancel the scheduled SMS",
                value: "cancelTheScheduledSMS",
                description: "Send a templated message",
            },
        ],
        default: "sendSMS",
    }]
