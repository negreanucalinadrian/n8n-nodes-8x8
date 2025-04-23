import {INodeProperties, INodePropertyOptions} from "n8n-workflow/dist/Interfaces";
/* eslint-disable  @typescript-eslint/no-explicit-any */

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
    parameters: INodeProperties[]
}
export type FormRequestValue = string|number|object|undefined;
export type FormRequest = Record<string, FormRequestValue>;
export type RequestUriParams= Record<string, string>;
export type MethodNames<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T];