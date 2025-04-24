import { useState, useEffect } from "react";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Favorites from "./components/Favorites";
import "./App.css";
import Navbar from "./components/Navbar";

function App({ showOnlyFavorites = false }) {
  const [movies, setMovies] = useState([]); // For movie list
  const [showAddForm, setShowAddForm] = useState(false); // To toggle add form visibility
  const [searchTerm, setSearchTerm] = useState(""); // Search term to filter movies
  const [favorites, setFavorites] = useState([]); // Store list of favorite movie ids

  useEffect(() => {
    // Fetch movies from the API (db.json)
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data));

    // Fetch favorite movie ids from the API
    fetch("http://localhost:3000/favorites")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched favourites:", data) || // Log the data to check its structure
          setFavorites(data.map((f) => f.id)); // extract just the IDs
      });
  }, []);

  const addMovie = (newMovie) => {
    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((savedMovie) => {
        setMovies([...movies, savedMovie]);
      });
  };


  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addReview = (movieId, review) => {
    const movieToUpdate = movies.find((movie) => movie.id === movieId);
    const updatedMovie = {
      ...movieToUpdate,
      reviews: [...movieToUpdate.reviews, review],
    };

    fetch(`http://localhost:3000/movies/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    }).then(() => {
      setMovies(
        movies.map((movie) => (movie.id === movieId ? updatedMovie : movie))
      );
    });
  };

  const updateLikes = (movieId, type) => {
    const movieToUpdate = movies.find((movie) => movie.id === movieId);
    const updatedMovie = {
      ...movieToUpdate,
      [type]: movieToUpdate[type] + 1,
    };

    fetch(`http://localhost:3000/movies/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    }).then(() => {
      setMovies(
        movies.map((movie) => (movie.id === movieId ? updatedMovie : movie))
      );
    });
  };

const toggleFavorite = (movieId) => {
  const isFavorite = favorites.includes(movieId);
  let updatedFavorites;

  if (isFavorite) {
    updatedFavorites = favorites.filter((id) => id !== movieId);
    fetch(`http://localhost:3000/favorites/${movieId}`, {
      method: "DELETE",
    }).then(() => setFavorites(updatedFavorites));
  } else {
    updatedFavorites = [...favorites, movieId];
    fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: movieId }),
    }).then(() => setFavorites(updatedFavorites));
  }
};


  return (
    <div className="app">
      <Navbar />
      <h1>Movie Discovery App</h1>

      <div className="controls">
        <SearchBar setSearchTerm={setSearchTerm} />
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Hide Form" : "Add Movie"}
        </button>
      </div>

      {/* Add movie form visibility */}
      {showAddForm && <AddMovie onAddMovie={addMovie} />}

      {/* Show Favorite Movies */}
      {showOnlyFavorites ? (
        <Favorites
          movies={movies}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onAddReview={addReview}
          onUpdateLikes={updateLikes}
        />
      ) : (
        <MovieList
          movies={filteredMovies}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
          onAddReview={addReview}
          onUpdateLikes={updateLikes}
        />
      )}
    </div>
  );
}

export default App;
