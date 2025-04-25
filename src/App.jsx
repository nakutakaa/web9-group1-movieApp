import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));

    fetch("http://localhost:3000/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data.map((f) => f.id)));
  }, []);

  const addMovie = (newMovie) => {
    fetch('http:localhost:3000/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((savedMovie) => {
        setMovies([...movies, savedMovie]);
      });
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMovie = (newMovie) => {
    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((addedMovie) => {
        setMovies([...movies, addedMovie]);
      });
  };

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
    <Router>
      <div className="app">
        <Navbar />
        <h1>Movie Discovery App</h1>
        <div className="controls">
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <MovieList
                movies={filteredMovies}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
                onAddReview={addReview}
                onUpdateLikes={updateLikes}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favorites
                movies={movies}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onAddReview={addReview}
                onUpdateLikes={updateLikes}
              />
            }
          />
          <Route path="/add" element={<AddMovie onAddMovie={addMovie} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
