import mongoose from 'mongoose';

global.models = global.models || {};

global.models.Watchlist =
  global.models.Watchlist ||
  mongoose.model('Watchlist', {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: String },
  });

export default global.models.Watchlist;
