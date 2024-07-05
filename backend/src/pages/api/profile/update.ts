import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import * as path from 'path';

const setContent = async (req: NextApiRequest, res: NextApiResponse) => {
if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
return res.status(200).end();
  }

if (req.method !== 'POST') {
res.setHeader('Allow', ['POST']);
return res.status(405).end(`Method ${req.method} Not Allowed`);
}

const { information, about, interests } = req.body;

try {
if (!information || !about || !interests) {
return res.status(400).json({ error: 'Informacion requerida.' });
}

await Promise.all([
fs.writeFile(path.join(process.cwd(), 'src', 'resources', 'information.txt'), information.join('\n')),
fs.writeFile(path.join(process.cwd(), 'src', 'resources', 'about.txt'), about),
fs.writeFile(path.join(process.cwd(), 'src', 'resources', 'interests.txt'), interests.join('\n'))
]);

return res.status(200).json({ message: "Informacion actualizada." });
} catch (error) {
return res.status(500).json({ error: `Error updating content` });
}
};

export default setContent;
