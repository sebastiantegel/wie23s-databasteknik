import express, { Request, Response, json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { moviesRouter } from "./routes/movies";
import { mongoose } from "@typegoose/typegoose";

// Skapa ett nytt api
const app = express();

// Hämta alla variabler från .env
dotenv.config();

// Hämta porten från .env-filen, om den inte finns använd 3000
const port = process.env.PORT || 3000;

// Sätt upp CORS, tillåt anrop från url: http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "*",
  })
);

// Tolka all data i anrop som json (JSON.parse(request.body))
app.use(json());

// Anslut till databasen
mongoose.connect(
  "mongodb+srv://sebastiantegel:UsMeHBSPvUpUoSs2@cluster0.a2ub8.mongodb.net/movieLibrary?retryWrites=true&w=majority"
);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.on("connected", () => {
  console.log("Connected to the database, we are alive and up and running!");
});

// http://localhost:3000
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world, updated!");
});

// Om vårt anrops url slutar med /movies, gå till moviesRouter och fortsätt där
app.use("/movies", moviesRouter);

// API:t skall lyssna på port 3000
// Detta "sätter igång" api:t.
app.listen(port, () => {
  console.log("Api up and running...");
});
