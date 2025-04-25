import { useState, useEffect } from "react";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Favorites from "./components/Favorites";
import "./App.css";
import Navbar from "./components/Navbar";
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
      .then((response) => response.json())
      .then((data) => setMovies(data));

    // Fetch favorite movie ids from the API()
    fetch("http://localhost:3000/favorites")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched favourites:", data) || // Log the data to check its structure
          setFavorites(data.map((f) => f.id)); // extract just the IDs
      });
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
    if (showOnlyFavorites) return favorites.includes(movie.id);
    if (showOnlyNonFavorites) return !favorites.includes(movie.id);
    return true; // Show all if neither flag is set
  });
  // const filteredMovies = movies.filter(
  //   (movie) =>
  //     showOnlyFavorites
  //       ? favorites.includes(movie.id) // If showing favorites
  //       : !favorites.includes(movie.id) // If showing NON-favorites
  // );

  // const filteredMovies = movies.filter((movie) =>
  //   movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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
