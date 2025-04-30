import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Movie } from './movie.model';
import { LoadMovies, SetMovies } from './movie.actions';
import { MovieService } from '../../services/movie.service';
import { tap } from 'rxjs/operators';

export interface MovieStateModel {
  movies: Movie[];
}

@State<MovieStateModel>({
  name: 'movies',
  defaults: {
    movies: []
  }
})
@Injectable()
export class MovieState {
  constructor(private movieService: MovieService) {}

  @Selector()
  static allMovies(state: MovieStateModel): Movie[] {
    return state.movies.sort((a, b) => new Date(a.usReleaseDate).getTime() - new Date(b.usReleaseDate).getTime());
  }

  @Action(LoadMovies)
  loadMovies(ctx: StateContext<MovieStateModel>) {
    const stored = localStorage.getItem('movies');
    if (stored) {
      ctx.patchState({ movies: JSON.parse(stored) });
      return;
    }

    return this.movieService.fetchMovies().pipe(
      tap((res) => {
        const movies = res?.movies || [];
        localStorage.setItem('movies', JSON.stringify(movies));
        ctx.patchState({ movies });
      })
    );
  }

  @Action(SetMovies)
  setMovies(ctx: StateContext<MovieStateModel>, action: SetMovies) {
    ctx.patchState({ movies: action.movies });
    localStorage.setItem('movies', JSON.stringify(action.movies));
  }
}
