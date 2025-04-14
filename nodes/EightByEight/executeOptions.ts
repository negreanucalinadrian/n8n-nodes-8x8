import {IRequestOptions} from "n8n-workflow/dist/Interfaces";
import {IEghtOperationList} from "./types";

const replacePlaceholders = (template: string, data: Record<string, string>) => {
    return template.replace(/{(\w+)}/g, (_, key) => {
        if (key in data) return data[key];
        return `{${key}}`;
    });
}

const operations: Record<string, IEghtOperationList> = {
    sms: {
        base: 'https://sms.8x8.com/api/v1/subaccounts/{subAccountId}/messages',
        operations: {
            sendSMS: {
                uri: '',
                method: 'POST'
            },
            sendSMSBatch: {
                uri: '/batch',
                method: 'POST'
            },
            cancelBatchScheduledSMS: {
                uri: '/batch/{batchId}',
                method: 'DELETE'
            },
            sendSMSSuccessFeedback: {
                uri: '/{umid}/feedback',
                method: 'POST'
            },
            cancelTheScheduledSMS: {
                uri: '/{umid}',
                method: 'DELETE'
            }
        }
    }
}

export const buildRequest = (resource: string, operation: string, uriParams: Record<string, string>, formParams: object): IRequestOptions => {
    const baseReq: IRequestOptions = {
        headers: {
            Accept: "application/json",
        },
        json: true,
    };
    const baseOperationConfig = operations[resource];
    const operationConfig = baseOperationConfig.operations[operation];
    baseReq.uri = replacePlaceholders(baseOperationConfig.base + operationConfig.uri, uriParams);
    baseReq.method = operationConfig.method;
    if (["POST", "PUT"].includes(baseReq.method || '')) {
        baseReq.body = formParams;
    }
    return baseReq;
}
/**
 * Removes empty fields from form object and trims each value
 *
 * @param formParams
 */
export const getCleanFormData = (formParams: Record<string, string>): Record<string, string> => {
    const formDataTemp = JSON.parse(JSON.stringify(formParams));
    for (const key in formDataTemp) {
        formDataTemp[key] = formDataTemp[key].trim();
        if (formDataTemp[key] === '') {
            delete formDataTemp[key];
        }
    }
    return formDataTemp;
}