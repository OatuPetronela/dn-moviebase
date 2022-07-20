import { fetcher } from '../../../utils/api';
import Watchlist from '../../../models/Watchlist';
import dbConnect from '../../../utils/dbConnect';


export default async function handler(req, res) {
  await dbConnect();

    let response = await Watchlist.find();
   
    if (response) {
      res.status(200).json({response} );
    } else {
      res.status(404).json(response);
    }
}
