import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import * as path from 'path';

const getContent = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { type } = req.query;

  try {
    if (!type || (typeof type !== 'string') || !['information', 'about', 'interests'].includes(type.toLowerCase())) {
      return res.status(400).json({ error: 'Parametro equivocado.' });
    }

    const filePath = path.join(process.cwd(), 'src', 'resources', type.toLowerCase() === 'interests'
      ? 'interests.txt' : type.toLowerCase() === 'information' ? 'information.txt' : 'about.txt');

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const content = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    return res.status(200).json(content);
  } catch (error) {
    return res.status(500).json({ error: `Error fetching ${type} content` });
  }
};

export default getContent;
