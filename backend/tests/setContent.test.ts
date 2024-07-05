import { NextApiRequest, NextApiResponse } from 'next';
import setContent from '../src/pages/api/profile/update';

describe('setContent API', () => {
let mockReq: Partial<NextApiRequest>;
let mockRes: Partial<NextApiResponse>;
let mockJson: jest.Mock<any, any>;
let mockStatus: jest.Mock<any, any>;

beforeEach(() => {
mockReq = {
method: 'POST',
body: {
information: ['Info1', 'Info2'],
about: 'About content',
interests: ['Interest1', 'Interest2'],
},
};
mockJson = jest.fn();
mockStatus = jest.fn().mockReturnValue({ json: mockJson });

mockRes = {
status: mockStatus,
json: mockJson,
};
});

it('should update content with valid request', async () => {
await setContent(mockReq as NextApiRequest, mockRes as NextApiResponse);

expect(mockStatus).toHaveBeenCalledWith(200);
expect(mockJson).toHaveBeenCalled();
expect(mockJson.mock.calls[0][0]).toEqual({ message: 'Informacion actualizada.' });
});

it('should handle missing body parameters', async () => {
mockReq.body = {};

await setContent(mockReq as NextApiRequest, mockRes as NextApiResponse);

expect(mockStatus).toHaveBeenCalledWith(400);
expect(mockJson).toHaveBeenCalledWith({ error: 'Informacion requerida.' });
});
});
