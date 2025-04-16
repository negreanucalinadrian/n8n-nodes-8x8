export interface IEghtOperation {
    uri: string;
    method: "POST" | "GET" | "PUT" | "DELETE";
    description: string;
    displayName: string;
    default?: boolean;
    requestParameters?: string[];
}

export interface IEghtOperationList {
    base: string;
    operations: Record<string, IEghtOperation>;
}