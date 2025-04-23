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

// The mapping object that uses the correct structure
export const executionMapping = {
    [RESOURCE_SMS]: smsOperations,
    [RESOURCE_VERIFICATION]: verificationApi
};
