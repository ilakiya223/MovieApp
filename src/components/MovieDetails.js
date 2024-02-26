import React from 'react';

const MovieDetails = ({ movie, additionalData, onClose }) => {
    return (
        <div className="movie-details-card">
            <div className="popup">
                <h2>{movie.Title}</h2>
                <p>Year: {additionalData.Year}</p>
                <p>Actors: {additionalData.Actors}</p>
                <p>Genre: {additionalData.Genre}</p>
                <p>Language: {additionalData.Language}</p>
                <p>Plot: {additionalData.Plot}</p>
                <p>Director: {additionalData.Director}</p>
                <p>Writer: {additionalData.Writer}</p>
                <p>Rated: {additionalData.Rated}</p>
                <p>IMDB Rating: {additionalData.imdbRating}</p>
                <p>Box Office: {additionalData.BoxOffice}</p>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );

};

export default MovieDetails;