import { useState, useEffect } from 'react';
// import { useParams } from "react-router-dom";
// import PageHeading from "../components/PageHeading/PageHeading";
import movieApi from '../services/movieApi';

export default function ReviewsView({ movieId }) {
  const [reviews, setReviews] = useState(null);
  // console.log(movieId);

  useEffect(() => {
    movieApi
      .fetchApi(`movie/${movieId}/reviews?`)
      .then(data => {
        setReviews(data.results);
        // console.log(data);
      })
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews &&
            reviews.map(el => (
              <li key={el.id}>
                <p>Author: {el.author}</p>
                <p>{el.content}</p>
              </li>
            ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
}
