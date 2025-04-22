import React from 'react';
import MovieCard from './MovieCard';

function MovieList( {

}) {
  const movies = [
    { id: 1, title: 'Movie 1', year: 2021 },
    { id: 2, title: 'Movie 2', year: 2020 },
    { id: 3, title: 'Movie 3', year: 2019 },
    // Add more movie objects as needed
  ];

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;