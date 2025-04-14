export interface IEghtOperation {
    uri: string;
    method: "POST" | "GET" | "PUT" | "DELETE";
}

export interface IEghtOperationList {
    base: string;
    operations: Record<string, IEghtOperation>;
}