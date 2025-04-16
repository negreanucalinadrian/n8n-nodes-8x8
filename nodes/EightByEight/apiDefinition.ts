import {IEghtOperationList} from "./types";
import {INodePropertyOptions} from "n8n-workflow/dist/Interfaces";

export const RESOURCE_SMS = 'sms' as const;
export type RESOURCE_LIST = typeof RESOURCE_SMS;

type OneOfResource = {
    [K in RESOURCE_LIST]: Record<K, IEghtOperationList>;
}[RESOURCE_LIST];

interface ApiDefinition<> {
    resources: INodePropertyOptions[];
    definition: OneOfResource
}

export const apiDefinitionTest: ApiDefinition= {
    resources: [{
        name: 'SMS',
        value: 'sms',
    }],
    definition: {
        sms: {
            base: 'https://sms.8x8.com/api/v1/subaccounts/{subAccountId}/messages',
            operations: {
                sendSMS: {
                    uri: '',
                    method: 'POST',
                    displayName: 'Send SMS',
                    description: "Send a message",
                    default: true,
                    requestParameters: ['message.message']
                },
                sendSMSBatch: {
                    uri: '/batch',
                    method: 'POST',
                    displayName: 'Send SMS batch',
                    description: "Send a message and wait for a reply"
                },
                cancelBatchScheduledSMS: {
                    uri: '/batch/{batchId}',
                    method: 'DELETE',
                    displayName: 'Cancel batch of scheduled SMS',
                    description: "Send a templated message"
                },
                sendSMSSuccessFeedback: {
                    uri: '/{umid}/feedback',
                    method: 'POST',
                    displayName: 'SMS Success Feedback',
                    description: "Send a templated message"
                },
                cancelTheScheduledSMS: {
                    uri: '/{umid}',
                    method: 'DELETE',
                    displayName: 'Cancel the scheduled SMS',
                    description: "Send a templated message"
                }
            }
        }
    }
}