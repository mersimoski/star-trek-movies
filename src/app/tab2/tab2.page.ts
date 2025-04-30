import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { Movie } from '../store/movies/movie.model';
import { MovieState } from '../store/movies/movie.state';
import {
  FavoritesState,
  RemoveFavorite,
} from '../store/favorites/favorites.state';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SettingsState } from '../store/settings/settings.state';

@Component({
  standalone: true,
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class Tab2Page implements OnInit {
  @Select(MovieState.allMovies) movies$!: Observable<Movie[]>;
  @Select(FavoritesState.getFavorites) favorites$!: Observable<string[]>;
  @Select(SettingsState.language) language$!: Observable<string>;
  
  selectedLanguage = 'default';
  favoriteMovies: Movie[] = [];

  constructor(private toastController: ToastController, private store: Store) {}

  ngOnInit() {

    combineLatest([this.movies$, this.favorites$]).subscribe(
      ([movies, favs]) => {
        this.favoriteMovies = movies.filter((m) => favs.includes(m.uid));
      }
    );

    this.language$.subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  async removeFavorite(movie: Movie) {
    this.store.dispatch(new RemoveFavorite(movie.uid));

    const toast = await this.toastController.create({
      message: `"${movie.title}" removed from favorites.`,
      duration: 2000,
      color: 'danger',
      position: "top",
      buttons: [
        {
          text: '✕',
          role: 'cancel'
        }
      ],
    });
    toast.present();
  }

  getLocalizedTitle(movie: Movie): string {
    if (!movie) return 'Unknown Title';
  
    if (this.selectedLanguage === 'default' || this.selectedLanguage === 'english') {
      return movie.title || movie.originalTitle || 'Untitled';
    }
  
    const key = `title${this.selectedLanguage.charAt(0).toUpperCase()}${this.selectedLanguage.slice(1)}` as keyof Movie;
    const value = movie[key];
  
    return typeof value === 'string' && value.length > 0
      ? value
      : movie.title || movie.originalTitle || 'Untitled';
  }

  getTitleInfo(movie: Movie): { title: string; original: string | null } {
    if (!movie) return { title: 'Untitled', original: null };
  
    if (this.selectedLanguage === 'default' || this.selectedLanguage === 'english') {
      return {
        title: movie.originalTitle || movie.title || 'Untitled',
        original: null
      };
    }
  
    const key = `title${this.selectedLanguage.charAt(0).toUpperCase()}${this.selectedLanguage.slice(1)}` as keyof Movie;
    const localized = movie[key];
  
    return {
      title: typeof localized === 'string' && localized.length > 0 ? localized : movie.originalTitle || movie.title || 'Untitled',
      original: movie.originalTitle || movie.title || null
    };
  }
}
