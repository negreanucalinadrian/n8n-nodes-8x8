import {IRequestOptions} from "n8n-workflow/dist/Interfaces";
import {RESOURCE_LIST} from "../apiDefinition";
import {ApiDefHelper} from "./apiDef.helper";
import {FormRequest, FormRequestValue, RequestUriParams} from "../types";

export class RequestHelper {
    private static replacePlaceholders(template: string, data: RequestUriParams) {
        return template.replace(/{(\w+)}/g, (_, key) => {
            if (key in data) return data[key];
            return `{${key}}`;
        });
    }

    static buildRequest(resource: RESOURCE_LIST, operation: string, uriParams: RequestUriParams, formParams: FormRequest): IRequestOptions {
        const baseReq: IRequestOptions = {
            headers: {
                Accept: "application/json",
            },
            json: true,
        };
        const baseOperationConfig = ApiDefHelper.getResource(resource);
        const operationConfig = ApiDefHelper.getOperation(resource, operation);
        baseReq.uri = RequestHelper.replacePlaceholders(baseOperationConfig.base + operationConfig.uri, uriParams);
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
    static getCleanFormData(formParams: FormRequest): FormRequest {
        const cleanValue = (value: FormRequestValue): FormRequestValue => {
            if (typeof value === 'string') {
                const trimmed = value.trim();
                return trimmed === '' ? undefined : trimmed;
            }

            if (Array.isArray(value)) {
                const cleanedArray = value
                    .map(cleanValue)
                    .filter(v => v !== undefined);
                return cleanedArray.length > 0 ? cleanedArray : undefined;
            }

            if (typeof value === 'object' && value !== null) {
                const cleanedObject: FormRequest = {};
                for (const key in value) {
                    // @ts-ignore
                    const cleaned = cleanValue(value[key]);
                    if (cleaned !== undefined) {
                        cleanedObject[key] = cleaned;
                    }
                }
                return Object.keys(cleanedObject).length > 0 ? cleanedObject : undefined;
            }

            return value; // For numbers, booleans, etc.
        };

        // @ts-ignore
        return cleanValue(formParams) ?? {};
    }

    static getAllUriParams(resource: RESOURCE_LIST, operation: string) {
        const operationDef = ApiDefHelper.getOperation(resource, operation);
        const str = ApiDefHelper.getResource(resource).base + operationDef.uri;
        return [...str.matchAll(/{(.*?)}/g)].map(m => m[1]);
    }
}

