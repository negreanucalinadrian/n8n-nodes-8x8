import {IAuthenticateGeneric, ICredentialType, NodePropertyTypes} from "n8n-workflow";

export class EightByEight implements ICredentialType {
    name = "eightByEightApi";
    displayName = "8x8 API";
    //@ts-ignore
    icon = "file:logo.svg";
    documentationUrl = "https://developers.8x8.com";
    properties = [
        {
            typeOptions: {
                password: true,
            },
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string' as NodePropertyTypes,
            default: '',
        },
    ];
    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '=Bearer {{$credentials.apiKey}}',
            },
        },
    };
}
