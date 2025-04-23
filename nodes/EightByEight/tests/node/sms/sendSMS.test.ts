import type {MockProxy} from 'jest-mock-extended';
import {mock} from 'jest-mock-extended';
import {type IExecuteFunctions} from 'n8n-workflow';
import {EightByEight} from "../../../EightByEight.node";

/* eslint-disable  @typescript-eslint/no-explicit-any */
describe('SMS node operations', () => {
    let whatsApp: EightByEight;
    let mockExecuteFunctions: MockProxy<IExecuteFunctions>;

    beforeEach(() => {
        whatsApp = new EightByEight();
        mockExecuteFunctions = mock<IExecuteFunctions>();

        mockExecuteFunctions.helpers = {
            requestWithAuthentication: jest.fn().mockResolvedValue({}),
            returnJsonArray: (...params: any[]) => JSON.stringify(params)
        } as never;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sendSMS operation successfully', async () => {
        const messageForm = {
            'destination': 'dest',
            'text': 'text',
            'country': ''
        }
        const expectedParamCall = {
            'destination': 'dest',
            'text': 'text',
        }
        // @ts-ignore
        mockExecuteFunctions.getNodeParameter.mockImplementation((key: string) => {
            if (key === 'resource') return 'sms';
            if (key === 'operation') return 'sendSMS';
            //Uri
            if (key === 'subAccountId') return '1234';
            //Form
            if (key === 'message.message') return messageForm;
        });
        // @ts-ignore
        mockExecuteFunctions.getInputData.mockReturnValue([1]);
        await whatsApp.execute.call(mockExecuteFunctions);
        expect(mockExecuteFunctions.helpers.requestWithAuthentication).toHaveBeenCalledWith(
            'eightByEightApi',
            {
                body: expectedParamCall,
                method: 'POST',
                json: true,
                headers:
                    {
                        "Accept": "application/json",
                    },
                uri: 'https://sms.8x8.com/api/v1/subaccounts/1234/messages/',
            },
        )
        ;
    });
});
