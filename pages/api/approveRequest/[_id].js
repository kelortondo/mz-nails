import connectDB from '../../../database/index.js';
import { approveRequest } from '../../../database/controllers/client.js';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    approveRequest(req.query, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(201).send('<html><p>Appointment request approved! An email has been sent to the client to confirm. You may close this window.</p></html>')
      }
    })
  }
}

export default connectDB(handler);