import { useState } from 'react'
import AddMovie from './components/AddMovie'

import './App.css'

function App() {
  const [movies, setMovies] = useState([]);//enables adding state to funcional component

   
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
      });//creates new array containing existing movies and appends new movie data at the end
    
  }

  
  return (
    <div className="app">
      <div className="controls">
        {/*trigger button*/}
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Hide Form" : "Add Movie"}
        </button>
      </div>
      {/*it only appears when button is clicked*/}
      {showAddForm && <AddMovie onAddMovie={addMovie} />}
    </div>
  );
}

export default App
