import {IExecuteFunctions} from "n8n-workflow";
import {FormRequest, RequestUriParams} from "../../types";
import {RequestHelper} from "../../helpers/request.helper";
import {ResponseHelper} from "../../helpers/response.helper";
import {RESOURCE_VERIFICATION} from "../../apiDefinition";

export const executeInitiateVerification = async (context: IExecuteFunctions, i: number, requestUriParams: RequestUriParams, operation: string) => {
    let formParams: FormRequest = {};
    const parameterList = ['destination', 'country', 'channel','brand','codeLength','codeValidity','codeType','templateString','language','resetSession','resendingInterval','callbackUrl','clientIp'];
    for (const parameterString of parameterList) {
        formParams[parameterString] = context.getNodeParameter(parameterString, i) as string;
    }
    try {
        formParams['sms'] = context.getNodeParameter('sms.sms', i) as Array<string>;
    } catch (_) {
        // Ignore missing
    }
    try {
        formParams['call'] = context.getNodeParameter('call.call', i) as Array<string>;
    } catch (_) {
        // Ignore missing
    }
    try {
        formParams['whatsApp'] = context.getNodeParameter('whatsApp.whatsApp', i) as Array<string>;
    } catch (_) {
        // Ignore missing
    }
    formParams = RequestHelper.getCleanFormData(formParams);
    const request = RequestHelper.buildRequest(RESOURCE_VERIFICATION, operation, requestUriParams, formParams);
    const response = await context.helpers.requestWithAuthentication.call(context, 'eightByEightApi', request);
    return ResponseHelper.handleResponse(response);
}