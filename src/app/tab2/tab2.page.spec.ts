import { Tab2Page } from './tab2.page';
import { Movie } from '../store/movies/movie.model';

describe('Tab2Page', () => {
  let component: Tab2Page;

  beforeEach(() => {
    const mockStore = {
      dispatch: () => {},
      select: () => ({ subscribe: () => {} }),
      selectSnapshot: () => 'default'
    } as any;

    const mockToastController = {
      create: () => Promise.resolve({ present: () => {} })
    } as any;

    component = new Tab2Page(mockStore, mockToastController);
  });

  it('should return localized title and original for non-default language', () => {
    component.selectedLanguage = 'russian';
    const movie: Movie = {
      uid: '1',
      title: 'Star Trek Title',
      originalTitle: 'Star Trek Original',
      titleRussian: 'Звёздный путь',
      usReleaseDate: '1980-01-01'
    };
    const result = component.getTitleInfo(movie);
    expect(result.title).toBe('Звёздный путь');
    expect(result.original).toBe('Star Trek Original');
  });

  it('should fallback to original title if localized missing', () => {
    component.selectedLanguage = 'japanese';
    const movie: Movie = {
      uid: '1',
      title: 'Star Trek Title',
      originalTitle: 'Star Trek Original',
      usReleaseDate: '1980-01-01'
    };
    const result = component.getTitleInfo(movie);
    expect(result.title).toBe('Star Trek Original');
    expect(result.original).toBe('Star Trek Original');
  });
});
