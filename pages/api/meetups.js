import { addMeetup, getMeetups } from '../../utils/db';

/**
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @returns
 */
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const result = await getMeetups();
      res.status(200).json(result);
    }
    if (req.method === 'POST') {
      const result = await addMeetup(req.body);
      res.status(201).json(result);
    }
  } catch (error) {
    console.info(error.stack);
  }
}
