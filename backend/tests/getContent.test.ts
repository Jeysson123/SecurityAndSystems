import { NextApiRequest, NextApiResponse } from 'next';
import getContent from '../src/pages/api/profile/content';

describe('getContent API', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;
  let mockJson: jest.Mock<any, any>;
  let mockStatus: jest.Mock<any, any>;

  beforeEach(() => {
    mockReq = {
      method: 'GET',
      query: {
        type: 'information', 
      },
    };
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockRes = {
      status: mockStatus,
      json: mockJson,
    };
  });

  it('should retrieve content with valid request', async () => {
    await getContent(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalled();
  });

  it('should handle errors correctly', async () => {
    mockReq.query = {}; 

    await getContent(mockReq as NextApiRequest, mockRes as NextApiResponse);

    expect(mockStatus).toHaveBeenCalledWith(400); 
    expect(mockJson).toHaveBeenCalledWith({ error: 'Parametro equivocado.' }); 
  });
});
