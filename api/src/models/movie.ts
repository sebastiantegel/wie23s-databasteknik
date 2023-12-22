import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: false,
  },
});

export const movieModel = mongoose.model("Movie", movieSchema);
