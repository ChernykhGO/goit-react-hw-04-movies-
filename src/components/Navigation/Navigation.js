import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav>
    <NavLink
      exact
      to="/"
      className={styles.nav}
      activeClassName={styles.activeNavLink}
    >
      Home
    </NavLink>

    <NavLink
      to="/movies"
      className={styles.nav}
      activeClassName={styles.activeNavLink}
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
