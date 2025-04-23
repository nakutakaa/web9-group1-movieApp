import { useState } from 'react'
import AddMovie from "./AddMovie";

import './App.css'

function App() {
  const [movies, setMovies] = useState([]);//enables adding state to funcional component

   
  function addMovie(newMovie) {
    fetch("http://localhost:3001/movies", {
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
    <>
      
    </>
  )
}

export default App
