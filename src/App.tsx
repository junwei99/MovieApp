import React from 'react';
import './App.css';
import { MoviePage, Homepage, SearchMovies } from './pages';
import { Router } from '@reach/router';
import './assets/fonts/style.css';

const apiKey = '328c283cd27bd1877d9080ccb1604c91';

const recentMoviesURL: string = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=primary_release_date.desc&primary_release_date.lte=2021-12-31
`;

// const alphabeticalMoviesURL: string = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en&primary_release_date.lte=2021-08-22&sort_by=original_title.asc&include_adult=false`;

const voteAverageMoviesURL: string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`;

const popularityMoviesURL: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;

const upcomingMoviesURL: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;

const nowPlayingMoviesURL: string = `
https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

function App() {
  return (
    <>
      <Router>
        <Homepage path="/latest" url={recentMoviesURL} />
        <Homepage path="/" url={popularityMoviesURL} />
        {/* <Homepage path="/alphabetical" url={alphabeticalMoviesURL} /> */}
        <Homepage path="/rating" url={voteAverageMoviesURL} />
        <Homepage path="/popular" url={popularityMoviesURL} />
        <Homepage path="/upcoming" url={upcomingMoviesURL} />
        <Homepage path="/nowplaying" url={upcomingMoviesURL} />
        <MoviePage path="/movie/:movieId" />
        <SearchMovies path="/searchmovies" />
      </Router>
    </>
  );
}

export default App;
