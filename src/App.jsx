import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import "./App.css";

import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App({ showOnlyFavorites = false, showOnlyNonFavorites = false }) {
  //STATE MANAGEMENT=>we used React hooks (useState) to manage application state
  //React hooks (useState) to manage application state
  const [movies, setMovies] = useState([]); // For movie list(Stores all movie data from db.json)
  const [showAddForm, setShowAddForm] = useState(false); // To toggle add form visibility
  const [searchTerm, setSearchTerm] = useState(""); // Search term to filter movies
  const [favorites, setFavorites] = useState([]); // Store list of favorite movie ids



  //DATA FETCHING
  useEffect(() => {

    // Fetch movies from the API (db.json)=>Uses useEffect hook for side effects (data loading)
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));


    // Fetch favorite movie ids from the API
    fetch("http://localhost:3000/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data.map((f) => f.id)));
  }, []);

  //CRUD OPERATIONS:
  const addMovie = (newMovie) => {
    //we use POST request to controlled form submission
    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add movie");
        return res.json();
      })
      .then((savedMovie) => {
        setMovies([...movies, savedMovie]);
        toast.success("Movie added successfully!");
      })
      .catch((error) => {
        Swal.fire({ title: "Error!", text: error.message, icon: "error" });
      });
  };
  // In App.jsx
  const filteredMovies = movies.filter((movie) => {
    const isFavorite = favorites.includes(movie.id);
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (showOnlyFavorites) return isFavorite && matchesSearch;
    if (showOnlyNonFavorites) return !isFavorite && matchesSearch;
    return matchesSearch;

    
  });
  


  
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
    //PUT requests to update movie data
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
    //controlled form submission
    const isFavorite = favorites.includes(movieId);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((id) => id !== movieId);
      fetch(`http://localhost:3000/favorites/${movieId}`, {
        method: "DELETE",
      })
        .then(() => {
          setFavorites(updatedFavorites);
          toast.success("Removed from favorites!");
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Failed to remove favorite",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    } else {
      updatedFavorites = [...favorites, movieId];
      fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: movieId }),
      })
        .then(() => {
          setFavorites(updatedFavorites);
          toast.success("Added to favorites!");
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Failed to add favorite",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };


  //ROUTING & COMPOSITION:
  return (
    <div className="app">
      {/* Navigation component */}
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
      {/* Notification container */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>

  );
}

export default App;
