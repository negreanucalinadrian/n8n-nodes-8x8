import {INodePropertyOptions} from "n8n-workflow/dist/Interfaces";

export interface IEghtOperation {
    operation:string;
    uri: string;
    method: "POST" | "GET" | "PUT" | "DELETE";
    description: string;
    displayName: string;
    default?: boolean;
}

export interface IEghtOperationList {
    resource: INodePropertyOptions;
    base: string;
    operations: IEghtOperation[];
}