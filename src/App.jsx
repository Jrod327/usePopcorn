import NavBar from "./NavBar/NavBar.jsx";
import Search from "./NavBar/Search.jsx";
import Logo from "./NavBar/Logo.jsx";
import NumResults from "./NavBar/NumResults.jsx";
import MainComponent from "./MainComponent/MainComponent.jsx";
import MovieList from "./MainComponent/ListBox/MovieList.jsx";
import Summary from "./MainComponent/WatchedBox/Summary.jsx";
import WatchedMovieList from "./MainComponent/WatchedBox/WatchedMovieList.jsx";
import Box from "./MainComponent/Box.jsx";
import Loader from "./Loader.jsx";
import ErrorMessage from "./ErrorMessag.jsx";
// import { tempMovieData } from "./tempMovieData.js";
// import { tempWatchedData } from "./tempWatchedData.js";
import { useState, useEffect } from "react";

const apiKey = "cf7d3cb2";

export default function App() {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState("interstellar");
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState("");

	useEffect(() => {
		async function fetchMovies() {
			try {
				setIsLoading(true);
				const res = await fetch(
					`http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`
				);

				if (!res.ok) throw new Error(res.status);

				const data = await res.json();

				if (data.Response === "False") throw new Error("Movie not found");

				setMovies(data.Search);
				setIsLoading(false);
			} catch (err) {
				console.error(err.message);
				setIsError(err.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchMovies();
	}, [query]);

	return (
		<>
			<NavBar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>

			<MainComponent>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !isError && <MovieList movies={movies} />}
					{isError && <ErrorMessage message={isError} />}
				</Box>
				<Box>
					<Summary watched={watched} />
					<WatchedMovieList watched={watched} />
				</Box>
			</MainComponent>
		</>
	);
}
