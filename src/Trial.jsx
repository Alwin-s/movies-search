import React, { useState } from 'react';

function MovieSearch() {
    const [movieName, setMovieName] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const apiKey = "fa1c9c03";

    const searchMovie = () => {
        setLoading(true);
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "False") {
                    setError("No movie found");
                    setMovieData(null);
                } else {
                    setMovieData(data);
                    setError(null);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setError("Something went wrong. Please try again later.");
                setMovieData(null);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h2>Movie Search</h2>
            <input type="text" value={movieName} onChange={e => setMovieName(e.target.value)} placeholder="Enter movie name" />
            <button onClick={searchMovie} disabled={loading}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movieData && (
                <div>
                    <h3>{movieData.Title}</h3>
                    <p><strong>Released:</strong> {movieData.Released}</p>
                    <p><strong>Actors:</strong> {movieData.Actors}</p>
                    <p><strong>Plot:</strong> {movieData.Plot}</p>
                    <p><strong>Ratings:</strong> {movieData.Ratings.map(rating => `${rating.Source}: ${rating.Value}`).join(', ')}</p>
                    <img src={movieData.Poster} alt={`${movieData.Title} Poster`} />
                </div>
            )}
        </div>
    );
}

export default MovieSearch;
