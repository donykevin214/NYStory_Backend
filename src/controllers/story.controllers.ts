/**
 *
 * @param {import('express').Request} req The request
 * @param {import('express').Response} res The response
 * @param {Function} next Go to the next middleware
 */

import { Request, Response } from 'express';
import { sendError } from '~/helpers/main.helper';
import debug from 'debug';
import axios from 'axios';
import config from '~/config';
const log = debug('app:controllers:story');


const getStoryData = async (req: Request, res: Response) => {
  const { type } = req.body;
  try {
    const { data } = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${type}.json?api-key=${config.nytApiKey}`);
    let result = [];
    for (let i = 0; i < data.num_results; i++) {
      if (data.results[i].title !== "") {
        result.push({
          title: data.results[i].title,
          url: data.results[i].url,
          image: data.results[i].multimedia?.at(0).url
        })
      }
    }

    return res.status(200).json({ success: true, result });
  } catch (err) {
    log('error', 'err:', err);
    return sendError(req, res, 400, 'Invalid data: ');
  }
};


export default {
  getStoryData,
};
