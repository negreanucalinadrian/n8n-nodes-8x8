import {INodeProperties} from "n8n-workflow/dist/Interfaces";
import {apiDefinitionTest} from "../apiDefinition";

export class ApiDefHelper {
    static generateApiFromOperation(resource: string): INodeProperties {
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
            options: [],
            default: ''
        };
        //@ts-ignore
        const config = apiDefinitionTest.definition[resource] as any;
        for (const operationName in config["operations"]) {
            //@ts-ignore
            result.options.push({
                name: config["operations"][operationName].displayName,
                value: operationName,
                description: config["operations"][operationName].description,
            })
            if (config["operations"][operationName].default) {
                result.default = operationName;
            }
        }

        return result;
    }
}