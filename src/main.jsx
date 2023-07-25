import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
import StarRating from "./StarRating";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StarRating
			maxStars={5}
			messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
		/>
		<StarRating maxStars={4} size={100} color={"red"} />
	</React.StrictMode>
);
