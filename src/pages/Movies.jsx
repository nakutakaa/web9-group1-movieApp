// Movie.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Movie() {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Movie not found");
        }
        return res.json();
      })
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <p>Loading trailer...</p>;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>{movie.title} Trailer</h1>
      <p>{movie.description}</p>
      {movie.trailer ? (
        <div style={{ marginTop: "1rem" }}>
          <iframe
            width="80%"
            height="400"
            src={movie.trailer}
            title={`${movie.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>No trailer available</p>
      )}
    </div>
  );
}

export default Movie;
