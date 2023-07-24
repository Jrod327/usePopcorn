import ListBox from "./ListBox/ListBox";
import WatchedBox from "./WatchedBox/WatchedBox";

// eslint-disable-next-line react/prop-types
export default function MainComponent({ movies }) {
	return (
		<main className="main">
			<ListBox movies={movies} />
			<WatchedBox />
		</main>
	);
}
