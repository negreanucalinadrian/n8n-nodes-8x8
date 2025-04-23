import {IExecuteFunctions} from "n8n-workflow";
import {RequestHelper} from "../../helpers/request.helper";
import {RESOURCE_VERIFICATION} from "../../apiDefinition";
import {ResponseHelper} from "../../helpers/response.helper";
import {RequestUriParams} from "../../types";

export const executeValidateVerification = async (context: IExecuteFunctions, i: number, requestUriParams: RequestUriParams, operation: string) => {
    const request = RequestHelper.buildRequest(RESOURCE_VERIFICATION, operation, requestUriParams, {});
    const response = await context.helpers.requestWithAuthentication.call(context, 'eightByEightApi', request);
    return ResponseHelper.handleResponse(response);
}