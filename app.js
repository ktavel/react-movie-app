import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './src/components/MovieList';
import MovieListHeading from './src/components/MovieListHeading';
import SearchBox from './src/components/SearchBox';
import AddFavorite from './src/components/AddFavorites';
import RemoveFavorites from './src/components/RemoveFavorites';


const App = ()=> {
    const [movies, setMovies] = useState([]);
    const [Favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');

        const getMovieRequest = async () => {
            const url = `https://omdbapi.com/?s=${searchValue}&apikey=c6ec6f7e`

            const response = await fetch(url);
            const responseJson = await response.json();

           if (responseJson.Search) {
            setMovies(response.json.Search);
           }
            
        }

        useEffect(() => {
            getMovieRequest(searchValue);
        }, [searchValue]);

        useEffect(() => {
            const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites')
            );
            setFavorites(movieFavorites);
        }, []);

        const saveToLoacalStorage = (items) => {
            localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
        }

        const addFavoriteMovie = (movie) => {
            const newFavoriteList = [...Favorites, movie];
            setFavorites(newFavoriteList);
            saveToLoacalStorage(newFavoriteList);
        }

        const removeFavoriteMovie = (movie) => {
            const newFavoriteList = Favorites.filter((favorite)=> favorite.imdbID !== movie.imdbID);

            setFavorites(newFavoriteList);
            saveToLoacalStorage(newFavoriteList);
        };

    return (
         <div className='container-fluid movie-app'>
            <div className='row d-flex align-itmes-center mt-4 mb-4'>
                 <MovieListHeading heading='movies' />
                 <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className='row'>
                <MovieList movies={movies} handleFavoritesClick={addFavoriteMovie} favoriteComponent = {AddFavorite} />
            </div>
            <div className='row d-flex align-itmes-center mt-4 mb-4'>
                 <MovieListHeading heading='Favorites' />
    </div>
    <div className='row'>
                <MovieList movies={Favorites} handleFavoritesClick={addFavoriteMovie} favoriteComponent = {AddFavorite} />
            </div>
            </div>
    );
}


export default App;