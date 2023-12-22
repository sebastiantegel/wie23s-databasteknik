import axios from "axios";
import "./../scss/style.scss";
import { IMovie } from "../models/IMovie";

const createHtml = (movies: IMovie[]) => {
  const moviesContainer = document.getElementById("movies");

  (moviesContainer as HTMLDivElement).innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    const title = document.createElement("h3");
    const lengthTag = document.createElement("p");

    title.innerHTML = movie.title;
    lengthTag.innerHTML = movie.length.toString();
    movieContainer.addEventListener("click", async () => {
      const movieResponse = await axios.get<IMovie>(
        "http://localhost:3000/movies/" + movie._id
      );

      console.log(movieResponse.data);
    });

    movieContainer.appendChild(title);
    movieContainer.appendChild(lengthTag);
    moviesContainer?.appendChild(movieContainer);
  });
};

document
  .getElementById("newMovieForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = (document.getElementById("newMovieTitle") as HTMLInputElement)
      .value;

    const length = +(
      document.getElementById("newMovieLength") as HTMLInputElement
    ).value;

    const newMovieResponse = await axios.post<IMovie>(
      "http://localhost:3000/movies",
      { title, length },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    movies.push(newMovieResponse.data);
    createHtml(movies);
  });

const response = await axios.get<IMovie[]>("http://localhost:3000/movies");
const movies: IMovie[] = response.data;
createHtml(movies);
