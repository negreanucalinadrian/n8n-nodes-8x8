import {INodeProperties, INodePropertyOptions} from "n8n-workflow/dist/Interfaces";
import {apiDefinition, RESOURCE_LIST} from "../apiDefinition";
import {MethodNames} from "../types";

export class ApiDefHelper {

    static getParameters(): INodeProperties[] {
        let parameterList: INodeProperties[] = [];
        for (const def of apiDefinition) {
            parameterList = parameterList.concat(...def.parameters);
        }
        return parameterList;
    }

    static getResource(resource: RESOURCE_LIST) {
        const baseOperationConfig = apiDefinition.find(conf => conf.resource.value === resource);
        if (!baseOperationConfig) {
            throw new Error(`Could not find resource by name: ${resource}`)
        }
        return baseOperationConfig;
    }

    static getOperation<T>(resource: RESOURCE_LIST, operationName: MethodNames<T>) {
        const baseOperationConfig = ApiDefHelper.getResource(resource);
        const operationConfig = baseOperationConfig.operations.find(operation => operation.operation === operationName);
        if (!operationConfig) {
            throw new Error(`Could not find operation by name: '${operationName as string}' for resource ${resource}`)
        }
        return operationConfig;
    }

    static getResources(): INodePropertyOptions[] {
        const defList = [];
        for (const def of apiDefinition) {
            defList.push(def.resource);
        }
        return defList;
    }

    static generateApiFromOperation(resource: RESOURCE_LIST): INodeProperties {
        const result: INodeProperties = {
            displayName: "Operation",
            name: "operation",
            type: "options",
            noDataExpression: true,
            displayOptions: {
                show: {
                    resource: [resource],
                },
            },
            default: ''
        };
        result.options = [];
        const config = ApiDefHelper.getResource(resource);
        for (const operation of config.operations) {
            result.options.push({
                name: operation.displayName,
                value: operation.operation,
                description: operation.description,
            })
            if (operation.default) {
                result.default = operation.displayName;
            }
        }
        return result;
    }
}