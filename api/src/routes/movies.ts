import express, { Request, Response } from "express";
import { movieModel } from "../models/movie";

// Skapa en route för (/movies) i vårt api
export const moviesRouter = express.Router();

// CRUD goes here
// http://localhost:3000/movies

// CREATE
moviesRouter.post("/", async (req: Request, res: Response) => {
  // http://localhost:3000/movies
  const title = req.body.title;
  const length = req.body.length;
  console.log("Handling POST request from vite", title, length);

  // Skapa ett nytt objekt
  const newMovie = new movieModel({
    title: title,
    length: length,
  });

  try {
    // Lägg till i listan
    // movies.push(newMovie);
    const savedMovie = await newMovie.save();

    // Skicka tillbaka det nya objektet som skapades
    res.status(201).json(savedMovie);
  } catch (error) {
    // Om det blir fel, skicka tillbaka 400 och felmeddelandet
    res.status(400).json(error);
  }
});

// READ
moviesRouter.get("/", async (req: Request, res: Response) => {
  // http://localhost:3000/movies

  // Skicka tillbaka hela listan med objekt
  const movies = await movieModel.find();
  res.status(200).json(movies);
});
moviesRouter.get("/:id", async (req: Request, res: Response) => {
  // http://localhost:3000/movies/abc123

  const movie = await movieModel.findById(req.params.id);
  res.status(200).json(movie);
});

// UPDATE
moviesRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    await movieModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      length: req.body.length,
    });

    const movie = await movieModel.findById(req.params.id);

    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE
moviesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    await movieModel.findByIdAndDelete(req.params.id);
    res.status(200).send();
  } catch (error) {
    res.status(400).json(error);
  }
});
