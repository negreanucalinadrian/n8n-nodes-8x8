import {RESOURCE_SMS, RESOURCE_VERIFICATION} from "../apiDefinition";
import {IExecuteFunctions} from "n8n-workflow";
import {SMSOperations} from "./SmsOperations";
import {VerificationOperations} from "./VerificationOperations";

const smsOperations = new SMSOperations();
const verificationApi = new VerificationOperations();

export interface ExecutionParams {
    context: IExecuteFunctions, i: number, requestUriParams: Record<string, string>
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
export type ExecutionFunction = (params: ExecutionParams)=>Promise<any[]>;

// ResourceMap now reflects all supported resource handlers
interface ResourceMap {
    [RESOURCE_SMS]: SMSOperations;
    [RESOURCE_VERIFICATION]: VerificationOperations;
}

// The mapping object that uses the correct structure
export const executionMapping: ResourceMap = {
    [RESOURCE_SMS]: {
        sendSMS: smsOperations.sendSMS,
        sendSMSBatch: smsOperations.sendSMSBatch,
        cancelTheScheduledSMS: smsOperations.cancelTheScheduledSMS,
        cancelBatchScheduledSMS: smsOperations.cancelBatchScheduledSMS
    },
    [RESOURCE_VERIFICATION]: {
        initiateVerification: verificationApi.initiateVerification,
        validateVerification: verificationApi.validateVerification,
        smaCoverageCheck: verificationApi.smaCoverageCheck
    }
};
