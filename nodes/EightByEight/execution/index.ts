import {executeSendSMS} from "./sms/executeSendSMS";
import {executeSendSMSBatch} from "./sms/executeSendSMSBatch";
import {executeCancelTheScheduledSMS} from "./sms/executeCancelTheScheduledSMS";
import {executeCancelBatchScheduledSMS} from "./sms/executeCancelBatchScheduledSMS";
import {executeInitiateVerification} from "./verification_api/executeInitiateVerification";
import {executeValidateVerification} from "./verification_api/executeValidateVerification";
import {executeSmaCoverageCheck} from "./verification_api/executeSmaCoverageCheck";
import {RESOURCE_SMS, RESOURCE_VERIFICATION} from "../apiDefinition";
import {IExecuteFunctions, INodeExecutionData} from "n8n-workflow";

type ExecuteFn = (context: IExecuteFunctions, i: number, requestUriParams: Record<string, string>,operation:string ) => Promise<INodeExecutionData[]>;

// Define function types for SMS
interface SmsHandlers {
    sendSMS: ExecuteFn;
    sendSMSBatch: ExecuteFn;
    cancelTheScheduledSMS: ExecuteFn;
    cancelBatchScheduledSMS: ExecuteFn;
}

// Define function types for Verification
interface VerificationHandlers {
    initiateVerification: ExecuteFn;
    validateVerification: ExecuteFn;
    smaCoverageCheck: ExecuteFn;
}

// ResourceMap now reflects all supported resource handlers
interface ResourceMap {
    [RESOURCE_SMS]: SmsHandlers;
    [RESOURCE_VERIFICATION]: VerificationHandlers;
}

// The mapping object that uses the correct structure
export const executionMapping: ResourceMap = {
    [RESOURCE_SMS]: {
        sendSMS: executeSendSMS,
        sendSMSBatch: executeSendSMSBatch,
        cancelTheScheduledSMS: executeCancelTheScheduledSMS,
        cancelBatchScheduledSMS: executeCancelBatchScheduledSMS
    },
    [RESOURCE_VERIFICATION]: {
        initiateVerification: executeInitiateVerification,
        validateVerification: executeValidateVerification,
        smaCoverageCheck: executeSmaCoverageCheck
    }
};
