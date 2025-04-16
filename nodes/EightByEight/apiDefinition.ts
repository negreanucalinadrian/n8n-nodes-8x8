import {IEghtOperationList} from "./types";

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
                uri: '',
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
        ]
    }
]