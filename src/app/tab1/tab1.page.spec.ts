import { Tab1Page } from './tab1.page';
import { Movie } from '../store/movies/movie.model';

describe('Tab1Page', () => {
  let component: Tab1Page;

  beforeEach(() => {
    const mockStore = {
      dispatch: () => { },
      select: () => ({ subscribe: () => { } }),
      selectSnapshot: () => 'default'
    } as any;

    const mockToastController = {
      create: () => Promise.resolve({ present: () => { } })
    } as any;

    component = new Tab1Page(mockStore, mockToastController);
  });

  it('should return original title when language is default', () => {
    component.selectedLanguage = 'default';

    const movie: Movie = {
      uid: '1',
      title: 'Star Trek Title',
      originalTitle: 'Star Trek Original',
      usReleaseDate: '2000-01-01',
      stardateFrom: 1000,
      stardateTo: 2000,
    };

    const result = component.getTitleInfo(movie);
    expect(result.title).toBe('Star Trek Original');
    expect(result.original).toBeNull();
  });

  it('should return localized title and original for another language', () => {
    component.selectedLanguage = 'german';

    const movie: Movie = {
      uid: '1',
      title: 'Star Trek Title',
      originalTitle: 'Star Trek Original',
      titleGerman: 'Star Trek Auf Deutsch',
      usReleaseDate: '',
      stardateFrom: 0,
      stardateTo: 0,
    };

    const result = component.getTitleInfo(movie);
    expect(result.title).toBe('Star Trek Auf Deutsch');
    expect(result.original).toBe('Star Trek Original');
  });

  it('should fallback to original title if localized is missing', () => {
    component.selectedLanguage = 'polish';

    const movie: Movie = {
      uid: '1',
      title: 'Star Trek Title',
      originalTitle: 'Star Trek Original',
      usReleaseDate: '',
      stardateFrom: 0,
      stardateTo: 0,
    };

    const result = component.getTitleInfo(movie);
    expect(result.title).toBe('Star Trek Original');
    expect(result.original).toBe('Star Trek Original');
  });
});
