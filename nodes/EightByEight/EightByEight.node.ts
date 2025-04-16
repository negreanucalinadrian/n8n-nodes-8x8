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
import {RESOURCE_LIST, RESOURCE_SMS} from "./apiDefinition";
/* eslint-disable  @typescript-eslint/no-explicit-any */
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
            ...ApiDefHelper.getParameters(),
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const requestHelper = new RequestHelper();
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const resource = this.getNodeParameter("resource", 0) as RESOURCE_LIST;
        const operation = this.getNodeParameter("operation", 0) as string;

        for (let i = 0; i < items.length; i++) {
            try {
                const requestUriParams: Record<string, string> = {}
                //URI params
                const uriParamList = requestHelper.getAllUriParams(resource, operation);
                for (const uriParam of uriParamList) {
                    requestUriParams[uriParam] = this.getNodeParameter(uriParam, i) as string;
                }
                //Form params
                let formParams: Record<string, string | any> = {};
                if (resource === RESOURCE_SMS) {
                    switch (operation) {
                    case "sendSMS": {
                        formParams = RequestHelper.getCleanFormData(
                                this.getNodeParameter("message.message", i) as Record<string, string>
                        );
                        break;
                    }
                    case "sendSMSBatch": {
                        const parameterList = ['clientBatchId', 'includeMessagesInResponse', 'clientIp'];
                        for (const parameterString of parameterList) {
                            formParams[parameterString] = this.getNodeParameter(parameterString, i) as string;
                        }
                        try {
                            const destinations = this.getNodeParameter('destinations.destinations', i) as Array<any>;
                            formParams['destinations'] = destinations.map(d => d.destination) as string[];
                        } catch (_) {
                            // Ignore missing destinations
                        }
                        try {
                            const template = this.getNodeParameter('template.template', i) as Array<any>;
                            formParams['template'] = template;
                        } catch (_) {
                            // Ignore missing destinations
                        }
                        try {
                            console.log('Messages',this.getNodeParameter('messages',i ));
                            const messages = this.getNodeParameter('messages.messages', i) as Array<any>;
                            formParams['message'] = messages;
                        } catch (_) {
                            // Ignore missing destinations
                        }
                        formParams = RequestHelper.getCleanFormData(formParams);
                        break;
                    }
                    case "cancelTheScheduledSMS":
                    case "cancelBatchScheduledSMS": {
                        break;
                    }
                    default:
                        throw new Error(`The operation "${operation}" is currently under development.`);
                    }
                }
                const request = requestHelper.buildRequest(resource, operation, requestUriParams, formParams);
                const response = await this.helpers.requestWithAuthentication.call(this, 'eightByEightApi', request);
                if (Array.isArray(response.data)) {
                    returnData.push(
                        ...response.data.map((response: Record<string, string>) => ({json: response})),
                    );
                } else {
                    returnData.push({json: response});
                }
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
