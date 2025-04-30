import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

export class SetLanguage {
  static readonly type = '[Settings] Set Language';
  constructor(public language: string) {}
}

export interface SettingsStateModel {
  language: string;
}

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    language: localStorage.getItem('language') || 'default'
  }
})
@Injectable()
export class SettingsState {
  @Selector()
  static language(state: SettingsStateModel) {
    return state.language;
  }

  @Action(SetLanguage)
  setLanguage(ctx: StateContext<SettingsStateModel>, action: SetLanguage) {
    localStorage.setItem('language', action.language);
    ctx.patchState({ language: action.language });
  }
}
