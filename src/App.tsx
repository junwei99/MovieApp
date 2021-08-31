import React from 'react';
import './App.css';
import { MoviePage, Homepage, SearchMovies } from './pages';
import { Router } from '@reach/router';
import './assets/fonts/style.css';

const apiKey = '328c283cd27bd1877d9080ccb1604c91';

const recentMoviesURL: string = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=primary_release_date.desc&primary_release_date.lte=2021-12-31
`;

const alphabeticalMoviesURL: string =
  '/3/discover/movie?api_key=328c283cd27bd1877d9080ccb1604c91&language=en&primary_release_date.lte=2021-08-22&sort_by=original_title.asc&include_adult=false&page=1';

const voteAverageMoviesURL: string =
  '3/movie/top_rated?api_key=328c283cd27bd1877d9080ccb1604c91&language=en-US&page=1';

function App() {
  return (
    <>
      <Router>
        <Homepage path="/" url={recentMoviesURL} />
        <Homepage path="/latest" url={recentMoviesURL} />
        <Homepage path="/alphabetical" url={alphabeticalMoviesURL} />
        <Homepage path="/rating" url={voteAverageMoviesURL} />
        <MoviePage path="/movie/:movieId" />
        <SearchMovies path="/searchmovies" />
      </Router>
    </>
  );
}

export default App;
