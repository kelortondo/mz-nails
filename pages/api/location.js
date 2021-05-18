
import connectDB from '../../database/index.js';
import { updateLocation, getLocation } from '../../database/controllers/location.js';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    updateLocation(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err.message)
      } else {
        res.status(201).send(result)
      }
    });
  } else if (req.method === 'GET') {
    getLocation((err, result) => {
      if (err) {
        res.status(500).send('Error getting location info')
      } else {
        res.status(200).send(result)
      }
    })
  }
}
export default connectDB(handler);