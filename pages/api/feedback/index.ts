import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
// import path from 'path';
import { connectDatabase, getAllDocuments, insertDocument } from '../../../helper/db-util';

// export function buildFeedbackPath(folder:string,pathname:string) {
//     return path.join(process.cwd(), folder, pathname);
// }

// export function extractFeedback(filePath) {
//     const fileData: any = fs.readFileSync(filePath);
//     const data = JSON.parse(fileData);
//     return data;
// }


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    let client: any;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        client.close()
        return;
    }


    if (req.method === 'POST') {
        const { text, author, date } = req.body
        let newFeedback = { text, author, date };

        if (!text || text.trim() === '' &&
            !author || author.trim() === '' &&
            !date || date.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid cell.Please write!' });
            return
        }


        try {
            await insertDocument(client, 'feedbacks', newFeedback);
            client.close();
            res.status(201).json({ message: 'Success!', feedback: newFeedback });

        } catch (error) {
            res.status(500).json({ message: 'Inserting data failed!' });
            client.close()
            return;
        }

        // const filePath = buildFeedbackPath();
        // const data = extractFeedback(filePath);
        // data.push(newFeedback)
        // fs.writeFileSync(filePath, JSON.stringify(data));


    }

    if (req.method === 'GET') {
        // const filePath = buildFeedbackPath();
        // const data = extractFeedback(filePath);

        // res.status(200).json({ feedback: data });

        try {
            const documents = await getAllDocuments(client, 'feedbacks', { _id: -1 });
            res.status(200).json({ feedback: documents });
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed.' });
        }
    }

    // if (req.method === 'DELETE') {
    //     const filePath = buildFeedbackPath('data','feedback.json');
    //     const data = extractFeedback(filePath);
    //     const newData = data.filter(item => item.id !== req.body.id)

    //     fs.writeFileSync(filePath, JSON.stringify(newData));
    //     res.status(200).json({ message: 'Success!', feedback: newData });
    // }


}

export default handler
