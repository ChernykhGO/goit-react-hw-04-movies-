import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  useParams,
  useLocation,
  useHistory,
  Route,
  useRouteMatch,
  Switch,
} from 'react-router-dom';
import Moment from 'react-moment';
import movieApi from '../services/movieApi';
// import CastView from "./CastView";
import style from './MovieDetalisView.module.css';

const CastView = lazy(() =>
  import('./CastView.js' /* webpackChankName: "casts-view" */),
);
const ReviewsView = lazy(() =>
  import('./ReviewsView.js' /* webpackChankName: "rewiews-view" */),
);

export default function MovieDetailsView() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();

  // console.log(movieId);
  // console.log(url);
  // console.log(path);
  const location = useLocation();
  // console.log(location);
  const history = useHistory();

  useEffect(() => {
    movieApi
      .fetchApi(`movie/${movieId}?`)
      .then(setMovie)
      .catch(error => console.log(error));
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {/* <PageHeading text={`Фильм нашелся`} /> */}
      <button type="button" onClick={onGoBack}>
        Назад
      </button>
      <hr />
      {movie && (
        <>
          <div className={style.movieCard}>
            <div>
              <img
                width="300"
                src={
                  movie.poster_path &&
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
                alt={movie.original_title}
              />
            </div>
            <div className={style.movieInfo}>
              <h2>
                {movie.original_title}(
                <Moment format="YYYY">{movie.release_date}</Moment>)
                {/* ({movie.release_date.substring(0, 4)}) */}
              </h2>

              <p>User score: {movie.vote_average * 10} %</p>
              <h2>Overview: </h2>
              <p>{movie.overview}</p>
              <h2>Genres:</h2>
              {movie.genres.map(genre => genre.name).join(' ')}
              {/* {movie.genres.map((genres) => (
              <li key={genres.id}>{genres.name}</li> */}
              {/* ))} */}
            </div>
          </div>

          <h1>Additional information:</h1>

          <ul>
            <li>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>

            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>

          <Suspense fallback={<div>Загружаем...</div>}>
            <Switch>
              <Route path={`${path}/cast`}>
                <CastView movieId={movieId} />
              </Route>

              <Route path={`${path}/reviews`}>
                <ReviewsView movieId={movieId} />
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
    </>
  );
}
