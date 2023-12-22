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
    const moreInfoButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    title.innerHTML = movie.title;
    lengthTag.innerHTML = movie.length.toString();
    moreInfoButton.addEventListener("click", async () => {
      const movieResponse = await axios.get<IMovie>(
        "http://localhost:3000/movies/" + movie._id
      );

      console.log(movieResponse.data);
    });
    moreInfoButton.innerHTML = "Mer info";
    deleteButton.innerHTML = "Ta bort";
    deleteButton.addEventListener("click", async () => {
      const response = await axios.delete(
        "http://localhost:3000/movies/" + movie._id
      );
      if (response.status === 200) {
        const response = await axios.get<IMovie[]>(
          "http://localhost:3000/movies"
        );
        movies = response.data;
        createHtml(movies);
      }
    });

    movieContainer.appendChild(title);
    movieContainer.appendChild(lengthTag);
    movieContainer.appendChild(moreInfoButton);
    movieContainer.appendChild(deleteButton);
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
let movies: IMovie[] = response.data;
createHtml(movies);
