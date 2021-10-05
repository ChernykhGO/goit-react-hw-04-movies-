import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';
// import HomeViews from "./views/HomeViews";
// import Moviesview from "./views/MoviesView";
// import NotFoundView from "./views/NotFoundView";
// import MovieDetailsView from "./views/MovieDetailsView";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const HomeViews = lazy(() =>
  import('./views/HomeViews' /* webpackChankName: "HomeViews-view" */),
);
const MoviesView = lazy(() =>
  import('./views/MoviesView' /* webpackChankName: "Moviesview-view" */),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView' /* webpackChankName: "NotFoundView-view" */),
);
const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailsView' /* webpackChankName: "NotFoundView-view" */
  ),
);

export default function App() {
  return (
    <>
      <Container>
        <AppBar />
        <Suspense fallback={<p>Загружаем...</p>}>
          <Switch>
            <Route path="/" exact>
              <HomeViews />
            </Route>

            <Route path="/movies" exact>
              <MoviesView />
            </Route>

            <Route path="/movies/:movieId">
              <MovieDetailsView />
            </Route>

            <Route>
              <NotFoundView />
            </Route>
          </Switch>
        </Suspense>

        <ToastContainer autoClose={3000} position="top-center" />
      </Container>
    </>
  );
}
