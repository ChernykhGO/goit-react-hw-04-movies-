import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import movieApi from '../services/movieApi';
import PageHeading from '../components/PageHeading/PageHeading';
import style from './MovieDetalisView.module.css';

export default function HomeViews() {
  const [movies, setMovies] = useState([]);
  const { url } = useRouteMatch();
  // console.log(url);
  const location = useLocation();
  // console.log(location);

  useEffect(() => {
    movieApi
      .fetchApi('trending/movie/day?')
      .then(data => setMovies(data.results))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className={style.trending}>
      <hr />
      <PageHeading text="Trending today" />

      {movies &&
        movies.map(movie => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `${url}movies/${movie.id}`,
                state: { from: location },
              }}
            >
              {movie.original_title}
            </Link>
          </li>
        ))}
    </div>
  );
}
