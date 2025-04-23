import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeOperationError,
} from "n8n-workflow";

import {NodeConnectionType} from "n8n-workflow/dist/Interfaces";
import {ApiDefHelper} from "./helpers/apiDef.helper";
import {RequestHelper} from "./helpers/request.helper";
import {RESOURCE_LIST, RESOURCE_SMS, RESOURCE_VERIFICATION} from "./apiDefinition";
import {ExecutionFunction, executionMapping} from "./execution";
import {RequestUriParams} from "./types";

export class EightByEight implements INodeType {
    description: INodeTypeDescription = {
        displayName: "EightByEight (8x8)",
        name: "eightByEight",
        icon: "file:logo.svg",
        group: ["input"],
        version: 1,
        subtitle: '={{$parameter["operation"]}}',
        description: "8x8 API operations",
        defaults: {
            name: "EightByEight",
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: "eightByEightApi",
                required: true,
            },
        ],
        properties: [
            {
                displayName: "Resource",
                name: "resource",
                type: "options",
                noDataExpression: true,
                options: ApiDefHelper.getResources(),
                default: RESOURCE_SMS,
            },
            ApiDefHelper.generateApiFromOperation(RESOURCE_SMS),
            ApiDefHelper.generateApiFromOperation(RESOURCE_VERIFICATION),
            ...ApiDefHelper.getParameters(),
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        let returnData: INodeExecutionData[] = [];
        const resource = this.getNodeParameter("resource", 0) as RESOURCE_LIST;
        const operation = this.getNodeParameter("operation", 0) as string;

        for (let i = 0; i < items.length; i++) {
            try {
                const requestUriParams: RequestUriParams = {}
                //URI params
                const uriParamList = RequestHelper.getAllUriParams(resource, operation);
                for (const uriParam of uriParamList) {
                    requestUriParams[uriParam] = this.getNodeParameter(uriParam, i) as string;
                }
                if (!executionMapping[resource]) {
                    throw new Error(`There is no resource by name ${resource}`)
                }
                // @ts-ignore
                if (!executionMapping[resource][operation]) {
                    throw new Error(`There is no operation ${resource}-${operation}`)
                }
                // @ts-ignore
                const operationMethod:ExecutionFunction = executionMapping[resource][operation]
                const operationOutput = await operationMethod({
                    context: this,
                    i:i,
                    requestUriParams: requestUriParams
                });
                returnData = returnData.concat(operationOutput);
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({json: {error: error.message}});
                } else {
                    throw new NodeOperationError(this.getNode(), error);
                }
            }
        }

        return [this.helpers.returnJsonArray(returnData)];
    }
}
