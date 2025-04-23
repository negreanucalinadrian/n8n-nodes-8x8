import {IExecuteFunctions} from "n8n-workflow";
import {RequestHelper} from "../../helpers/request.helper";
import {RESOURCE_VERIFICATION} from "../../apiDefinition";
import {ResponseHelper} from "../../helpers/response.helper";
import {FormRequest, RequestUriParams} from "../../types";

export const executeSmaCoverageCheck = async (context: IExecuteFunctions, i: number, requestUriParams: RequestUriParams, operation: string) => {
    const formParams: FormRequest = {};
    const parameterList = ['clientIp', 'destination', 'country'];
    for (const parameterString of parameterList) {
        formParams[parameterString] = context.getNodeParameter(parameterString, i) as string;
    }
    const request = RequestHelper.buildRequest(RESOURCE_VERIFICATION, operation, requestUriParams, formParams);
    const response = await context.helpers.requestWithAuthentication.call(context, 'eightByEightApi', request);
    return ResponseHelper.handleResponse(response);
}