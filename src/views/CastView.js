import { useState, useEffect } from 'react';
import movieApi from '../services/movieApi';

export default function CastView({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    movieApi
      .fetchApi(`movie/${movieId}/credits?`)
      .then(data => {
        setCast(data.cast);
        // console.log(data);
      })
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul>
          {cast &&
            cast.map(el => (
              <li key={el.id}>
                <img
                  width="150"
                  src={
                    el.profile_path
                      ? `https://image.tmdb.org/t/p/w500${el.profile_path}`
                      : `https://cdn-icons-png.flaticon.com/512/2748/2748638.png`
                  }
                  alt={el.name}
                />
                <p>{el.name}</p>
                <p>Character: {el.character}</p>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
