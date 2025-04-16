import {INodeProperties, IRequestOptions} from "n8n-workflow/dist/Interfaces";
import {RESOURCE_LIST} from "../apiDefinition";
import {ApiDefHelper} from "./apiDef.helper";

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
     * Note: Does not do recursion
     * Removes empty fields from form object and trims each value
     *
     * @param formParams
     */
    static getCleanFormData(formParams: Record<string, string>): Record<string, string> {
        const formDataTemp = JSON.parse(JSON.stringify(formParams));
        for (const key in formDataTemp) {
            formDataTemp[key] = formDataTemp[key].trim();
            if (formDataTemp[key] === '') {
                delete formDataTemp[key];
            }
        }
        return formDataTemp;
    }

    getAllUriParams(resource: RESOURCE_LIST, operation: string) {
        const operationDef = ApiDefHelper.getOperation(resource, operation);
        const str = ApiDefHelper.getResource(resource).base + operationDef.uri;
        return [...str.matchAll(/{(.*?)}/g)].map(m => m[1]);
    }

    /**
     * Throw error if missing required parameter
     * NOTE: Does not do recursion
     * @param nodeDefinition
     * @param request
     */
    static throwIfEmptyRequiredFields(nodeDefinition: INodeProperties[], request: Record<string, string>){
        for (const def of nodeDefinition) {
            if (def.required) {
                if (!request[def.name]) {
                    throw new Error(`Parameter ${def.name} is required and should not be empty`)
                }
            }
        }
    }
}

