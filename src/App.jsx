import NavBar from "./NavBar/NavBar.jsx";
import Search from "./NavBar/Search.jsx";
import Logo from "./NavBar/Logo.jsx";
import NumResults from "./NavBar/NumResults.jsx";
import MainComponent from "./MainComponent/MainComponent.jsx";
import MovieList from "./MainComponent/ListBox/MovieList.jsx";
import Summary from "./MainComponent/WatchedBox/Summary.jsx";
import WatchedMovieList from "./MainComponent/WatchedBox/WatchedMovieList.jsx";
import MovieDetails from "./MainComponent/WatchedBox/MovieDetails.jsx";
import Box from "./MainComponent/Box.jsx";
import Loader from "./Loader.jsx";
import ErrorMessage from "./ErrorMessag.jsx";
import { useState, useEffect } from "react";

export const apiKey = "cf7d3cb2";

export default function App() {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState("");
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState("");
	const [selectedID, setSelectedID] = useState(null);

	function handleSelectMovie(id) {
		setSelectedID(selectedID => (id === selectedID ? null : id));
	}

	function handleCloseMovie() {
		setSelectedID(null);
	}

	function handleWatched(movie) {
		setWatched(watched => [...watched, movie]);
	}

	function handleDeleteWatchedMovie(id) {
		setWatched(watched => watched.filter(movie => movie.imdbID !== id));
	}

	useEffect(() => {
		const controller = new AbortController();

		async function fetchMovies() {
			try {
				setIsLoading(true);
				setIsError("");
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
					{ signal: controller.signal }
				);

				if (!res.ok) throw new Error(res.status);

				const data = await res.json();

				if (data.Response === "False") throw new Error("Movie not found");

				setMovies(data.Search);
				setIsLoading(false);
				setIsError("");
			} catch (err) {
				console.error(err.message);

				if (err.name !== "AbortError") {
					setIsError(err.message);
				}
			} finally {
				setIsLoading(false);
			}
		}

		if (query.length < 3) {
			setMovies([]);
			setIsError("");
			return;
		}

		fetchMovies();

		return () => controller.abort();
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
					{!isLoading && !isError && (
						<MovieList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
					{isError && <ErrorMessage message={isError} />}
				</Box>
				<Box>
					{selectedID ? (
						<MovieDetails
							selectedID={selectedID}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleWatched}
							watched={watched}
						/>
					) : (
						<>
							<Summary watched={watched} />
							<WatchedMovieList
								watched={watched}
								onDeleteWatchedMovie={handleDeleteWatchedMovie}
							/>
						</>
					)}
				</Box>
			</MainComponent>
		</>
	);
}
