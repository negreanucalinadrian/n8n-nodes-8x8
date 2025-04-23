
import {FormRequest} from "../types";
import {RequestHelper} from "../helpers/request.helper";
import {RESOURCE_SMS} from "../apiDefinition";
import {ResponseHelper} from "../helpers/response.helper";
import {ExecutionParams} from "./index";

export class SMSOperations {

    public async cancelBatchScheduledSMS(params:ExecutionParams) {
        const request = RequestHelper.buildRequest<SMSOperations>(RESOURCE_SMS, 'cancelBatchScheduledSMS', params.requestUriParams, {});
        const response = await params.context.helpers.requestWithAuthentication.call(params.context, 'eightByEightApi', request);
        return ResponseHelper.handleResponse(response);
    }

    public async cancelTheScheduledSMS(params:ExecutionParams) {
        const request = RequestHelper.buildRequest<SMSOperations>(RESOURCE_SMS, 'cancelTheScheduledSMS', params.requestUriParams, {});
        const response = await params.context.helpers.requestWithAuthentication.call(params.context, 'eightByEightApi', request);
        return ResponseHelper.handleResponse(response);
    }

    public async sendSMSBatch(params:ExecutionParams) {
        let formParams: FormRequest = {};
        const parameterList = ['clientBatchId', 'includeMessagesInResponse', 'clientIp'];
        for (const parameterString of parameterList) {
            formParams[parameterString] = params.context.getNodeParameter(parameterString, params.i) as string;
        }
        try {
            const destinations = params.context.getNodeParameter('destinations.destinations', params.i) as Array<{
                destination: string
            }>;
            formParams['destinations'] = destinations.map(d => d.destination) as string[];
        } catch (_) {
            // Ignore missing
        }
        try {
            formParams['template'] = params.context.getNodeParameter('template.template', params.i) as Array<string>;
        } catch (_) {
            // Ignore missing
        }
        try {
            formParams['message'] = params.context.getNodeParameter('messages.messages', params.i) as Array<string>;
        } catch (_) {
            // Ignore missing
        }
        formParams = RequestHelper.getCleanFormData(formParams);
        const request = RequestHelper.buildRequest<SMSOperations>(RESOURCE_SMS, 'sendSMSBatch', params.requestUriParams, formParams);
        const response = await params.context.helpers.requestWithAuthentication.call(params.context, 'eightByEightApi', request);
        return ResponseHelper.handleResponse(response);
    }

    public async sendSMS(params:ExecutionParams) {
        const formParams = RequestHelper.getCleanFormData(
            params.context.getNodeParameter("message.message", params.i) as Record<string, string>
        );
        const request = RequestHelper.buildRequest<SMSOperations>(RESOURCE_SMS, 'sendSMS', params.requestUriParams, formParams);
        const response = await params.context.helpers.requestWithAuthentication.call(params.context, 'eightByEightApi', request);
        return ResponseHelper.handleResponse(response);
    }
}