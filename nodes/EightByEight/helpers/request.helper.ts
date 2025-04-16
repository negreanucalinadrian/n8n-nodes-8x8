import {IRequestOptions} from "n8n-workflow/dist/Interfaces";
import {RESOURCE_LIST} from "../apiDefinition";
import {ApiDefHelper} from "./apiDef.helper";
/* eslint-disable  @typescript-eslint/no-explicit-any */
export class RequestHelper {
    private replacePlaceholders(template: string, data: Record<string, string>) {
        return template.replace(/{(\w+)}/g, (_, key) => {
            if (key in data) return data[key];
            return `{${key}}`;
        });
    }

    buildRequest(resource: RESOURCE_LIST, operation: string, uriParams: Record<string, string>, formParams: object): IRequestOptions {
        const baseReq: IRequestOptions = {
            headers: {
                Accept: "application/json",
            },
            json: true,
        };
        const baseOperationConfig = ApiDefHelper.getResource(resource);
        const operationConfig = ApiDefHelper.getOperation(resource, operation);
        baseReq.uri = this.replacePlaceholders(baseOperationConfig.base + operationConfig.uri, uriParams);
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
    static getCleanFormData(formParams: Record<string, any>): Record<string, any> {
        const cleanValue = (value: any): any => {
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
                const cleanedObject: Record<string, any> = {};
                for (const key in value) {
                    const cleaned = cleanValue(value[key]);
                    if (cleaned !== undefined) {
                        cleanedObject[key] = cleaned;
                    }
                }
                return Object.keys(cleanedObject).length > 0 ? cleanedObject : undefined;
            }

            return value; // For numbers, booleans, etc.
        };

        return cleanValue(formParams) ?? {};
    }

    getAllUriParams(resource: RESOURCE_LIST, operation: string) {
        const operationDef = ApiDefHelper.getOperation(resource, operation);
        const str = ApiDefHelper.getResource(resource).base + operationDef.uri;
        return [...str.matchAll(/{(.*?)}/g)].map(m => m[1]);
    }
}

