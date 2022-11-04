import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './src/components/MovieList';
import MovieListHeading from './src/components/MovieListHeading';

const App = ()=> {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');

        const getMovieRequest = async () => {
            const url = 'https://omdbapi.com/?s=star+wars&apikey=c6ec6f7e'

            const response = await fetch(url);
            const responseJson = await response.json();

            console.log(responseJson);
            setMovies(response.json.Search);
        }

        useEffect(() => {
            getMovieRequest();
        }, [])

    
    
    return (
         <div className='container-fluid movie-app'>
            <div className='row'>
            <MovieListHeading />
            </div>
            <div className='row'>
            <MovieList movies={movies} />
            </div>
        
    </div>
    );
    


export default App;