import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Controller('profile')
export class ProfileController {

  @Post('update')
  async setContent(
    @Body('information') information: string[], @Body('about') about: string, @Body('interests') interests: string[]): Promise<string> {
    try {
      if (!information || !about || !interests) {
        throw new Error('Informacion requerida.');
      }
      
      await Promise.all([
        fs.writeFile(path.join(process.cwd(), 'src', 'resources','information.txt'), information.join('\n')),
        fs.writeFile(path.join(process.cwd(), 'src', 'resources','about.txt'), about),
        fs.writeFile(path.join(process.cwd(), 'src', 'resources','interests.txt'), interests.join('\n'))
      ]);

      return "Informacion actualizada.";
    } catch (error) {
      throw new Error(`Error updating content: ${error.message}`);
    }
  }

  @Get('content/:type')
  async getContent(@Param('type') type: string): Promise<string[]> {
    try {
      if (!type || (type.toLowerCase() !== 'interests' && type.toLowerCase() !== 'about' && type.toLowerCase() !== 'information')) {
        throw new Error('Parametro equivocado.');
      }

      const filePath = path.join(process.cwd(), 'src', 'resources', type.toLowerCase() === 'interests' 
      ? 'interests.txt' : type.toLowerCase() === 'information' ? 'information.txt' : 'about.txt');

      const fileContent = await fs.readFile(filePath, 'utf-8');

      return fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    } catch (error) {
      throw new Error(`Error fetching ${type} content: ${error.message}`);
    }
  }
}
