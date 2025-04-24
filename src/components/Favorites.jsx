import MovieList from "./MovieList";
// import Navbar from "./Navbar";

function Favorites({
  movies = [], // default to empty array
  favorites = [], // default to empty array
  onToggleFavorite,
  onAddReview,
  onUpdateLikes,
}) {
  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

  return (
    <div>
      {/* <Navbar /> */}
      <h2>Your Favorite Movies</h2>
      {favoriteMovies.length > 0 ? (
        <MovieList
          movies={favoriteMovies}
          onToggleFavorite={onToggleFavorite}
          favorites={favorites}
          onAddReview={onAddReview}
          onUpdateLikes={onUpdateLikes}
        />
      ) : (
        <p>You haven't added any favorites yet.</p>
      )}
    </div>
  );
}

export default Favorites;
