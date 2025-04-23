import {FormRequest} from "../types";
import {RequestHelper} from "../helpers/request.helper";
import {RESOURCE_VERIFICATION} from "../apiDefinition";
import {ResponseHelper} from "../helpers/response.helper";
import {ExecutionParams} from "./index";


export class VerificationOperations {

    async initiateVerification(params: ExecutionParams) {
        let formParams: FormRequest = {};
        const parameterList = ['destination', 'country', 'channel', 'brand', 'codeLength', 'codeValidity', 'codeType', 'templateString', 'language', 'resetSession', 'resendingInterval', 'callbackUrl', 'clientIp'];
        for (const parameterString of parameterList) {
            formParams[parameterString] = params.context.getNodeParameter(parameterString, params.i) as string;
        }
        try {
            formParams['sms'] = params.context.getNodeParameter('sms.sms', params.i) as Array<string>;
        } catch (_) {
            // Ignore missing
        }
        try {
            formParams['call'] = params.context.getNodeParameter('call.call', params.i) as Array<string>;
        } catch (_) {
            // Ignore missing
        }
        try {
            formParams['whatsApp'] = params.context.getNodeParameter('whatsApp.whatsApp', params.i) as Array<string>;
        } catch (_) {
            // Ignore missing
        }
        formParams = RequestHelper.getCleanFormData(formParams);
        const request = RequestHelper.buildRequest<VerificationOperations>(RESOURCE_VERIFICATION, 'initiateVerification', params.requestUriParams, formParams);
        const response = await params.context.helpers.requestWithAuthentication.call(params.context, 'eightByEightApi', request);
        return ResponseHelper.handleResponse(response);
    }

    async validateVerification(params: ExecutionParams) {
        const request = RequestHelper.buildRequest<VerificationOperations>(RESOURCE_VERIFICATION, 'validateVerification', params.requestUriParams, {});
        const response = await params.context.helpers.requestWithAuthentication.call(params.context, 'eightByEightApi', request);
        return ResponseHelper.handleResponse(response);
    }

    async smaCoverageCheck(params: ExecutionParams) {
        const formParams: FormRequest = {};
        const parameterList = ['clientIp', 'destination', 'country'];
        for (const parameterString of parameterList) {
            formParams[parameterString] = params.context.getNodeParameter(parameterString, params.i) as string;
        }
        const request = RequestHelper.buildRequest<VerificationOperations>(RESOURCE_VERIFICATION, 'smaCoverageCheck', params.requestUriParams, formParams);
        const response = await params.context.helpers.requestWithAuthentication.call(params.context, 'eightByEightApi', request);
        return ResponseHelper.handleResponse(response);
    }
}