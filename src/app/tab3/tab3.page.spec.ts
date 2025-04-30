/// <reference types="jest" />

import { Tab3Page } from './tab3.page';

describe('Tab3Page', () => {
  let component: Tab3Page;

  beforeEach(() => {
    const mockStore = {
      dispatch: jest.fn(),
      selectSnapshot: () => 'default'
    } as any;

    component = new Tab3Page(mockStore);
  });

  it('should set language and dispatch action', () => {
    component.setLanguage('german');
    expect(component.selectedLang).toBe('german');
  });
});
