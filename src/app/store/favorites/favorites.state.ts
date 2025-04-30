import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

export class AddFavorite {
  static readonly type = '[Favorites] Add';
  constructor(public movieId: string) {}
}

export class RemoveFavorite {
  static readonly type = '[Favorites] Remove';
  constructor(public movieId: string) {}
}

export class InitFavorites {
  static readonly type = '[Favorites] Init';
}

export interface FavoritesStateModel {
  favorites: string[];
}

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: {
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
  }
})
@Injectable()
export class FavoritesState {
  @Selector()
  static getFavorites(state: FavoritesStateModel): string[] {
    return state.favorites;
  }

  @Action(InitFavorites)
  initFavorites(ctx: StateContext<FavoritesStateModel>) {
    const stored = localStorage.getItem('favorites');
    const list = stored ? JSON.parse(stored) : [];
    ctx.patchState({ favorites: list });
  }

  @Action(AddFavorite)
  addFavorite(ctx: StateContext<FavoritesStateModel>, action: AddFavorite) {
    const state = ctx.getState();
    const updated = Array.from(new Set([...state.favorites, action.movieId]));
    localStorage.setItem('favorites', JSON.stringify(updated));
    ctx.patchState({ favorites: updated });
  }

  @Action(RemoveFavorite)
  removeFavorite(ctx: StateContext<FavoritesStateModel>, action: RemoveFavorite) {
    const updated = ctx.getState().favorites.filter(id => id !== action.movieId);
    localStorage.setItem('favorites', JSON.stringify(updated));
    ctx.patchState({ favorites: updated });
  }
}
