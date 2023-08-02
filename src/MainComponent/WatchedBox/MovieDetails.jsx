/* eslint-disable react/prop-types */
export default function MovieDetails({ selectedID, onCloseMovie }) {
	return (
		<div className="details">
			<button className="btn-back" onClick={onCloseMovie}>
				&larr;
			</button>
			{selectedID}
		</div>
	);
}
