import { NextApiRequest, NextApiResponse } from 'next'
import { connectDatabase, insertDocument, uniqueEmailDataBase } from '../../../helper/db-util';


const requestAPI = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    const { email, password } = req.body

    if ((!email ||
      email.trim() === '' ||
      !email.includes('@') ||
      !password ||
      password.trim() === '' ||
      password.trim().length < 7)) {
      res.status(422).json({ message: 'Invalid email and password' })
      return
    }

    let client: any

    try {
      client = await connectDatabase()
    } catch (err) {
      res.status(500).json({ message: 'Server Error' })
      return
    }


    try {

      let userEmailCheck = await uniqueEmailDataBase(client, 'users', { email })

      if (userEmailCheck) {
        res.status(422).json({ message: 'User exists already' })
        client.close()
        return
      }

      await insertDocument(client, 'users', { email, password })
      res.status(201).json({ message: 'Created user', auth: true })
      client.close()

    } catch {
      res.status(500).json({ message: 'Insert not document ' })
      return
    }
  }

}

export default requestAPI






