
import connectDB from '../../database/index.js';
import { getApprovedApts, deleteRequest, createClient, updateAppointment } from '../../database/controllers/client.js';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    getApprovedApts(req.query.date, (err, result) => {
      if (err) {
        res.status(500).send('Error getting appointment info')
      } else {
        res.status(200).send(result)
      }
    })
  } else if (req.method === 'DELETE') {
    deleteRequest(req.body.id, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(204).send(result);
      }
    })
  } else if (req.method === 'POST') {
    createClient(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err.message)
      } else {
        res.status(201).send(result)
      }
    })
  } else if (req.method == "PUT") {
    updateAppointment(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err.message)
      } else {
        res.status(201).send(result)
      }
    })
  }
}
export default connectDB(handler);