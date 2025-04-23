import {IExecuteFunctions} from "n8n-workflow";
import {RequestHelper} from "../../helpers/request.helper";
import {ResponseHelper} from "../../helpers/response.helper";
import {RequestUriParams} from "../../types";
import {RESOURCE_SMS} from "../../apiDefinition";

export const executeSendSMS = async (context: IExecuteFunctions, i: number, requestUriParams: RequestUriParams, operation: string) => {
    const formParams = RequestHelper.getCleanFormData(
        context.getNodeParameter("message.message", i) as Record<string, string>
    );
    const request = RequestHelper.buildRequest(RESOURCE_SMS, operation, requestUriParams, formParams);
    const response = await context.helpers.requestWithAuthentication.call(context, 'eightByEightApi', request);
    return ResponseHelper.handleResponse(response);
}