import { fetcher } from '../../../utils/api';
import Watchlist from '../../../models/Watchlist';
import dbConnect from '../../../utils/dbConnect';

const getMovieUrl = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`;

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    const watchlist = await Watchlist.findOne({ id });

    if (watchlist) {
      res.status(200).json({ found: true });
    } else {
      res.status(404).json({ found: false });
    }
  } else if (method === 'PUT') {
    const movie = await fetcher(getMovieUrl(id));
    console.log(movie);
    const watchlist = new Watchlist({ id, title: movie.title, date: movie.release_date, rating: movie.vote_average });
    await watchlist.save();

    res.status(200).json(movie);
  } else if (method === 'DELETE') {
    await Watchlist.deleteOne({ id });
    res.status(200).end('Ok');
  }
  res.status(400).end();
}
