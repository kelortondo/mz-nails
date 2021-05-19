// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../../database/index.js';
import { getRequestedApts } from '../../database/controllers/client.js';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    createClient(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err.message)
      } else {
        res.status(201).send(result)
      }
    });
  } else if (req.method === 'GET') {
    getRequestedApts((err, result) => {
      if (err) {
        res.status(500).send('Error getting requested appointment info')
      } else {
        res.status(200).send(result)
      }
    })
  }
}
export default connectDB(handler);