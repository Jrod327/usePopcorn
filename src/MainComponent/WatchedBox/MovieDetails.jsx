import { useEffect, useState } from "react";
import StarRating from "../../StarRating";
import Loader from "../../Loader";

/* eslint-disable react/prop-types */
export default function MovieDetails({
	selectedID,
	onCloseMovie,
	onAddWatched,
	watched
}) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState("");

	const isWatched = watched.some(movie => movie.imdbID === selectedID);
	const watchedUserRating = watched.find(
		movie => movie.imdbID === selectedID
	)?.userRating;

	const apiKey = "cf7d3cb2";

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre
	} = movie;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedID,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(" ").at(0)),
			userRating: Number(userRating)
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	}

	useEffect(
		function () {
			async function getMovieDetails() {
				setIsLoading(true);
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedID}`
				);
				const data = await res.json();
				setMovie(data);
				setIsLoading(false);
			}
			getMovieDetails();
		},
		[selectedID]
	);

	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie}`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								IMDb Rating:
								{` ${imdbRating} ⭐`}
							</p>
						</div>
					</header>
					<section>
						<div className="rating">
							{!isWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={24}
										onSetRating={setUserRating}
									/>
									{userRating > 0 && (
										<button className="btn-add" onClick={handleAdd}>
											Add to list
										</button>
									)}
								</>
							) : (
								<p>You rated this movie {watchedUserRating} ⭐</p>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Staring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}
