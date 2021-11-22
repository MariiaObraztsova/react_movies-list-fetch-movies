/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useState } from 'react';
import { getMovieByTitle } from '../../api';
import './FindMovie.scss';

import { MovieCard } from '../MovieCard';

type Props = {
  addMovie: (movie: Movie) => void,
};

export const FindMovie: React.FC<Props> = ({ addMovie }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [title, setTitle] = useState('');
  const [isTitleChanged, setIsTitleChanged] = useState(true);
  const [isMovieFound, setIsMovieFound] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleChanged(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (movie) {
      addMovie(movie as Movie);
    }
  };

  const hadleFindMovieButton = async () => {
    try {
      const movieFromServer = await getMovieByTitle(title);

      if (movieFromServer) {
        setMovie(movieFromServer);
        setIsMovieFound(true);
      }
    } catch (error) {
      setMovie(null);
      setIsTitleChanged(false);
      setIsMovieFound(false);
    }
  };

  return (
    <>
      <form
        className="find-movie"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label" htmlFor="movie-title">
            Movie title
          </label>

          <div className="control">
            <input
              type="text"
              id="movie-title"
              name="title"
              value={title}
              placeholder="Enter a title to search"
              className={classNames('input', { 'is-danger': !isTitleChanged })}
              onChange={handleInputChange}
            />
          </div>

          {!isTitleChanged && (
            <p className="help is-danger">
              Can&apos;t find a movie with such a title
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="button"
              className="button is-light"
              onClick={hadleFindMovieButton}
            >
              Find a movie
            </button>
          </div>

          <div className="control">
            <button
              type="submit"
              className="button is-primary"
            >
              Add to the list
            </button>
          </div>
        </div>
      </form>

      {!isMovieFound && (
        <h2 className="title">Movie not found</h2>
      )}
      {movie && (
        <div className="container">
          <h2 className="title">Preview</h2>
          <MovieCard movie={movie} />
        </div>
      )}
    </>
  );
};
