import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import movieApi from '../services/movieApi';
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';

export default function Moviesview() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const { url } = useRouteMatch();
  const location = useLocation();
  // console.log(location);

  const history = useHistory();
  // console.log(history);

  const params = new URL(document.location).searchParams;
  const myquery = params.get('query');

  useEffect(() => {
    if (!myquery) {
      return;
    }
    setMovies([]);
    movieApi
      .fetchApi(`search/movie?query=${myquery}&`)
      .then(data => {
        setMovies(data.results);
        console.log(data.results);
      })
      .catch(error => console.log(error));
    // .finally(setMovies(""));
  }, [myquery]);

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.info('Введите название в строке поиска!');
    }
    setQuery(query);

    // movieApi
    //   .fetchApi(`search/movie?query=${query}&`)
    //   .then(data => {
    //     setMovies(data.results);
    //     console.log(data.results);
    //     // setQuery(query);
    //   })
    //   .catch(error => console.log(error))
    //   .finally(setQuery(query));

    history.push({ ...location, search: `?query=${query}` });
  };

  const handleChange = event => {
    setQuery(event.target.value.toLowerCase());
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          value={query}
          onChange={handleChange}
          name="query"
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>

      {movies &&
        movies.map(movie => (
          <li key={movie.id}>
            <NavLink
              to={{
                pathname: `${url}/${movie.id}`,
                state: { from: location },
              }}
            >
              {movie.original_title}
            </NavLink>
          </li>
        ))}
    </>
  );
}
