import NavBar from "./NavBar/NavBar.jsx";
import Search from "./NavBar/Search.jsx";
import Logo from "./NavBar/Logo.jsx";
import NumResults from "./NavBar/NumResults.jsx";
import MainComponent from "./MainComponent/MainComponent.jsx";
import MovieList from "./MainComponent/ListBox/MovieList.jsx";
import Summary from "./MainComponent/WatchedBox/Summary.jsx";
import WatchedMovieList from "./MainComponent/WatchedBox/WatchedMovieList.jsx";
import Box from "./MainComponent/Box.jsx";
import { tempMovieData } from "./tempMovieData.js";
import { tempWatchedData } from "./tempWatchedData.js";
import { useState } from "react";

export default function App() {
	const [movies, setMovies] = useState(tempMovieData);
	const [query, setQuery] = useState("");
	const [watched, setWatched] = useState(tempWatchedData);

	return (
		<>
			<NavBar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>

			<MainComponent>
				<Box>
					<MovieList movies={movies} />
				</Box>
				<Box>
					<Summary watched={watched} />
					<WatchedMovieList watched={watched} />
				</Box>
			</MainComponent>
		</>
	);
}
