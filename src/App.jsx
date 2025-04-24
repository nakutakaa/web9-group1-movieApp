import { useState,useEffect } from 'react'
import AddMovie from './components/AddMovie'
import MovieList from './components/MovieList'
import SearchBar from "./components/SearchBar";
import Favorites from "./components/Favorites";
import "./App.css";
import Navbar from "./components/Navbar";


function App() {
  const [movies, setMovies] = useState([]); //enables adding state to funcional component
  const [showAddForm, setShowAddForm] = useState(false); // State variable to control the visibility of the add form (true = visible, false = hidden)
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

useEffect(() => {
  // Fetch movies
  fetch("http://localhost:3000/movies")
    .then((response) => response.json())
    .then((data) => setMovies(data));

  // Fetch favorites
  fetch("http://localhost:3000/favorites")
    .then((response) => response.json())
    .then((data) => setFavorites(data));
}, []);

const filteredMovies = movies.filter((movie) =>
  movie.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  function addMovie(newMovie) {
    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then(function (response) {
        return response.json(); //reads the body content ( movie data from db.json).
      })
      .then(function (data) {
        setMovies([...movies, data]);
      }); //creates new array containing existing movies and appends new movie data at the end
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
    let updatedFavorites;
    if (favorites.includes(movieId)) {
      updatedFavorites = favorites.filter((id) => id !== movieId);
    } else {
      updatedFavorites = [...favorites, movieId];
    }

    // Update favorites in db.json
    fetch("http://localhost:3000/favorites", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFavorites),
    }).then(() => setFavorites(updatedFavorites));
  };


  

  return (
    <div className="app">
      <Navbar/>
      <h1>Movie Discovery App</h1>
      
      <div className="controls">
        <SearchBar setSearchTerm={setSearchTerm} />
        {/*trigger button*/}
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Hide Form" : "Add Movie"}
        </button>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>
      {/*it only appears when button is clicked*/}
      {showAddForm && <AddMovie onAddMovie={addMovie} />}

      {showFavorites ? (
        <Favorites
          movies={movies.filter((movie) => favorites.includes(movie.id))}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
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
