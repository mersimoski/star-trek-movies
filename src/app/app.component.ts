import { Component } from '@angular/core';
import { LoadMovies } from './store/movies/movie.actions';
import { InitFavorites } from './store/favorites/favorites.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch([LoadMovies, InitFavorites]);
  }
}
