/* eslint-disable react/prop-types */
import { useState } from "react";
import Search from "./Search.jsx";
import Logo from "./Logo.jsx";
import NumResults from "./NumResults.jsx";

export default function NavBar({movies}) {
	const [query, setQuery] = useState("");

	return (
		<nav className="nav-bar">
			<Logo />
			<Search query={query} setQuery={setQuery} />
			<NumResults movies={movies} />
		</nav>
	);
}
