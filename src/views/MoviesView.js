import { useState } from 'react';
import { toast } from 'react-toastify';
import movieApi from '../services/movieApi';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';

export default function Moviesview() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const { url } = useRouteMatch();
  const location = useLocation();
  console.log(location);

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.info('Введите название в строке поиска!');
    }
    setQuery('');

    movieApi
      .fetchApi(`search/movie?query=${query}&`)
      .then(data => {
        setMovies(data.results);
        console.log(data.results);
      })
      .catch(error => console.log(error))
      .finally(setQuery(query));
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

// useEffect(() => {
//   if (!query) {
//     return;
//   }
//   setMovies([]);
//   movieApi
//     .fetchApi(`search/movie?query=${query}&`)
//     .then((data) => {
//       setMovies(data.results);
//       console.log(data.results);
//     })
//     .catch((error) => console.log(error))
//     .finally(setMovies(""));
// }, [query]);
