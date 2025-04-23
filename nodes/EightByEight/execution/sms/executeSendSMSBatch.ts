import {IExecuteFunctions} from "n8n-workflow";
import {RequestHelper} from "../../helpers/request.helper";
import {ResponseHelper} from "../../helpers/response.helper";
import {FormRequest, RequestUriParams} from "../../types";
import {RESOURCE_SMS} from "../../apiDefinition";

export const executeSendSMSBatch = async (context: IExecuteFunctions, i: number, requestUriParams: RequestUriParams, operation: string) => {
    let formParams: FormRequest = {};
    const parameterList = ['clientBatchId', 'includeMessagesInResponse', 'clientIp'];
    for (const parameterString of parameterList) {
        formParams[parameterString] = context.getNodeParameter(parameterString, i) as string;
    }
    try {
        const destinations = context.getNodeParameter('destinations.destinations', i) as Array<{destination:string}>;
        formParams['destinations'] = destinations.map(d => d.destination) as string[];
    } catch (_) {
        // Ignore missing
    }
    try {
        formParams['template'] = context.getNodeParameter('template.template', i) as Array<string>;
    } catch (_) {
        // Ignore missing
    }
    try {
        formParams['message'] = context.getNodeParameter('messages.messages', i) as Array<string>;
    } catch (_) {
        // Ignore missing
    }
    formParams = RequestHelper.getCleanFormData(formParams);
    const request = RequestHelper.buildRequest(RESOURCE_SMS, operation, requestUriParams, formParams);
    const response = await context.helpers.requestWithAuthentication.call(context, 'eightByEightApi', request);
    return ResponseHelper.handleResponse(response);
}