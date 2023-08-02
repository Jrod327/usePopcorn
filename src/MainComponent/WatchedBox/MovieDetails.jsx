import { useEffect, useState } from "react";
import StarRating from "../../StarRating";
import Loader from "../../Loader";

/* eslint-disable react/prop-types */
export default function MovieDetails({ selectedID, onCloseMovie }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);

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

	console.log(title, year);

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
							<StarRating maxRating={10} size={24} />
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
