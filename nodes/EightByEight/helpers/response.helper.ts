/* eslint-disable  @typescript-eslint/no-explicit-any */
export class ResponseHelper {
    static handleResponse = (response: { data: any }) => {
        const returnData: any[] = [];
        if (Array.isArray(response.data)) {
            returnData.push(
                ...response.data.map((response: Record<string, string>) => ({json: response})),
            );
        } else {
            returnData.push({json: response});
        }
        return returnData;
    }
}