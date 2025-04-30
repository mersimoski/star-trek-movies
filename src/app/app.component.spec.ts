import { AppComponent } from './app.component';
import { Store } from '@ngxs/store';

describe('AppComponent', () => {
  it('should create the app', () => {
    const mockStore = {
      dispatch: () => {},
      selectSnapshot: () => null
    } as unknown as Store;

    const app = new AppComponent(mockStore);
    expect(app).toBeTruthy();
  });
});
