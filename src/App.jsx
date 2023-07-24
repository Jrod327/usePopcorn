import NavBar from "./NavBar/NavBar.jsx";
import MainComponent from "./MainComponent/MainComponent.jsx";
import { tempMovieData } from "./tempMovieData.js";
import { useState } from "react";

export default function App() {
	const [movies, setMovies] = useState(tempMovieData);
	return (
		<>
			<NavBar movies={movies} />
			<MainComponent movies={movies} />
		</>
	);
}
