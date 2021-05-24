// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../../../database/index.js';
import { approveRequest } from '../../../database/controllers/client.js';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    approveRequest(req.query, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send('<html><p>Appointment request approved!</p></html>');
      }
    })
  }
}

export default connectDB(handler);