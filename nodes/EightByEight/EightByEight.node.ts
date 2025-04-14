import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeOperationError,
} from "n8n-workflow";
import {sendSMSApi} from "./apis/SendSMSApi";
import {sendSMSApiParameters} from "./parameters/SendSMSApiParameters";
import {buildRequest} from "./executeOptions";
import {NodeConnectionType} from "n8n-workflow/dist/Interfaces";

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
                options: [
                    {
                        name: "SMS",
                        value: "sms",
                    }
                ],
                default: "sms",
            },
            ...sendSMSApi,
            ...sendSMSApiParameters,
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const resource = this.getNodeParameter("resource", 0) as string;
        const operation = this.getNodeParameter("operation", 0) as string;

        for (let i = 0; i < items.length; i++) {
            try {
                /* eslint-disable @typescript-eslint/no-explicit-any */
                const requestUriParams: any = {}
                //URI params
                if (resource === "sms") {
                    requestUriParams.subAccountId = this.getNodeParameter("subAccountId", i) as string;
                    if (operation === "cancelBatchScheduledSMS") {
                        requestUriParams.batchId = this.getNodeParameter("batchId", i) as string;
                    }
                    if (["sendSMSSuccessFeedback","cancelTheScheduledSMS"].includes(operation)) {
                        requestUriParams.umid = this.getNodeParameter("umid", i) as string;
                    }
                }
                //Form params
                let formParams: any = {}
                if (resource === "sms") {
                    if (operation === "sendSMS") {
                        formParams = this.getNodeParameter("message.message", i);
                        if (!formParams.text) {
                            throw new Error('Text is required');
                        }
                        if (!formParams.destination) {
                            throw new Error('Destination is required');
                        }
                        for (const key in formParams) {
                            if (formParams[key].trim() === '') {
                                delete formParams[key];
                            }
                        }
                    }
                }
                const request = buildRequest(resource, operation, requestUriParams, formParams);
                const response = await this.helpers.requestWithAuthentication.call(this, 'eightByEightApi', request);
                if (Array.isArray(response.data)) {
                    returnData.push(
                        ...response.data.map((team: any) => ({json: team})),
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
