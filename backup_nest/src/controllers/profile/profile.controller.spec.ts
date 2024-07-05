import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { promises as fs } from 'fs';
import * as path from 'path';

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
    readFile: jest.fn(),
  },
}));

describe('ProfileController', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('setContent', () => {
    it('should update content', async () => {
      const information = ['info1', 'info2'];
      const about = 'This is about';
      const interests = ['interest1', 'interest2'];

      await controller.setContent(information, about, interests);

      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(process.cwd(), 'src', 'resources', 'information.txt'),
        information.join('\n'),
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(process.cwd(), 'src', 'resources', 'about.txt'),
        about,
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(process.cwd(), 'src', 'resources', 'interests.txt'),
        interests.join('\n'),
      );
    });

    it('should throw an error if content is missing', async () => {
      await expect(controller.setContent(null, null, null)).rejects.toThrow('Informacion requerida.');
    });
  });

  describe('getContent', () => {
    it('should return content of the specified type', async () => {
      const mockData = 'line1\nline2\nline3';
      (fs.readFile as jest.Mock).mockResolvedValue(mockData);

      const result = await controller.getContent('information');

      expect(result).toEqual(['line1', 'line2', 'line3']);
      expect(fs.readFile).toHaveBeenCalledWith(
        path.join(process.cwd(), 'src', 'resources', 'information.txt'),
        'utf-8',
      );
    });

    it('should throw an error if type is invalid', async () => {
      await expect(controller.getContent('invalidType')).rejects.toThrow('Parametro equivocado.');
    });

    it('should throw an error if reading file fails', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

      await expect(controller.getContent('information')).rejects.toThrow('Error fetching information content: File not found');
    });
  });
});
