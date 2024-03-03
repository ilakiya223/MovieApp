import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import MovieDetails from './components/MovieDetails';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchVal}&apikey=58e6fd90`
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data)

    // const url1 = `http://www.omdbapi.com/?s=avengers&apikey=58e6fd90`
    // const response1 = await fetch(url1);
    // const data1 = await response1.json();



    if (data.Search) {
      setMovies(data.Search)
    }
  };

  // if (data1.Search) {
  //   setFavoritesMovie(data1.Search)
  // }

  useEffect(() => {
    getMovieRequest(searchVal);
  }, [searchVal]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-mov-ie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    if (favourites.find((favMovie) => favMovie.imdbID === movie.imdbID)) {
      // If the movie is already in the favorites list, don't add it again
      // console.log("Movie already exists in favorites");
      return;
    }
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const openMovieDetails = async (movie) => {
    const imdbId = movie.imdbID;
    console.log("imdbId", imdbId)
    const url1 = `http://www.omdbapi.com/?apikey=58e6fd90&i=${imdbId}`;
    const response1 = await fetch(url1);
    const data1 = await response1.json();
    console.log(data1)
    setAdditionalData(data1);
    setSelectedMovie(movie);
  };

  const closeMovieDetails = () => {
    setAdditionalData(null);
    setSelectedMovie(null);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchVal={searchVal} setSearchVal={setSearchVal} />
      </div>

      <div className='row' style={{ margin: '3px', overflow: 'auto' }}>
        <MovieList
          movies={movies}
          onMovieClick={openMovieDetails}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>

      {selectedMovie && (
        <div className="popup">
          <MovieDetails movie={selectedMovie} additionalData={additionalData} onClose={closeMovieDetails} />
        </div>
      )}

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
          onMovieClick={openMovieDetails}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>

    </div>
  );
};

export default App;

