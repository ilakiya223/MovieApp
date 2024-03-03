import React from 'react';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    //const ClickMovie = props.onMovieClick;
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content-around m-3'>
                    <img src={movie.Poster} alt='movie' className="movie-image" key={index} onClick={() => props.onMovieClick(movie)}></img>
                    <div
                        onClick={() => props.handleFavouritesClick(movie)}
                        className='overlay d-flex align-items-center justify-content-center'
                    >
                        <FavouriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;