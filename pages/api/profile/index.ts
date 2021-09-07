import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'profile-data.json');
}

export function extractFeedback(filePath:string) {
  const fileData:any = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'PUT') {
      let editData = {
        id:req.body.id,
        name:req.body.name,
        age:req.body.age,
        token:req.body.token,
        country:req.body.country,
      }

      console.log(editData);
      
      const filePath = buildFeedbackPath();
      fs.writeFileSync(filePath, JSON.stringify(editData));
      res.status(201).json({ message: 'Success!', profile: editData });
    }
    else if(req.method === 'GET'){
      const filePath = buildFeedbackPath();
    
      const data = extractFeedback(filePath);
      res.status(200).json({ message: 'Success!', profile: data });
    }

  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
