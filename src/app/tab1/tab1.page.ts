import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Movie } from '../store/movies/movie.model';
import { MovieState } from '../store/movies/movie.state';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AddFavorite, FavoritesState } from '../store/favorites/favorites.state';
import { SettingsState } from '../store/settings/settings.state';

@Component({
  standalone: true,
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class Tab1Page implements OnInit {
  @Select(MovieState.allMovies) movies$!: Observable<Movie[]>;
  @Select(FavoritesState.getFavorites) favorites$!: Observable<string[]>;
  @Select(SettingsState.language) language$!: Observable<string>;
  selectedLanguage = 'default'

  favoritesList: string[] = [];

  constructor(private store: Store, private toastController: ToastController) { }

  ngOnInit() {
    this.favorites$.subscribe((favs) => {
      this.favoritesList = favs;
    });

    this.language$.subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }

  async toggleFavorite(movie: Movie) {
    const isAlreadyFav = this.favoritesList.includes(movie.uid);

    const toast = await this.toastController.create({
      message: isAlreadyFav
        ? 'This title is already a favorite.'
        : `"${movie.title}" added to favorites!`,
      duration: 2000,
      position: "top",
      buttons: [
        {
          text: '✕',
          role: 'cancel'
        }
      ],
      color: isAlreadyFav ? 'warning' : 'success',
    });

    if (!isAlreadyFav) {
      this.store.dispatch(new AddFavorite(movie.uid));
    }

    toast.present();
  }

  isFavorite(uid: string): boolean {
    return this.favoritesList.includes(uid);
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
