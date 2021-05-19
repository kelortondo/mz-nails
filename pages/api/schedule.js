
import connectDB from '../../database/index.js';
import { getApprovedApts } from '../../database/controllers/client.js';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    getApprovedApts((err, result) => {
      if (err) {
        res.status(500).send('Error getting appointment info')
      } else {
        res.status(200).send(result)
      }
    })
  }
}
export default connectDB(handler);