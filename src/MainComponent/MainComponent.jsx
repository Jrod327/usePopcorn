import ListBox from "./ListBox/ListBox";
import WatchedBox from "./WatchedBox/WatchedBox";

export default function MainComponent() {
	return (
		<main className="main">
			<ListBox />
			<WatchedBox />
		</main>
	);
}
