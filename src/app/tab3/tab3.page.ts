import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SetLanguage, SettingsState } from '../store/settings/settings.state';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab3Page {
  selectedLang: string = 'default';

  availableLanguages = [
    { label: 'Default (English)', value: 'default' },
    { label: 'Bulgarian', value: 'bulgarian' },
    { label: 'German', value: 'german' },
    { label: 'Japanese', value: 'japanese' },
    { label: 'Polish', value: 'polish' },
    { label: 'Russian', value: 'russian' },
  ];

  constructor(private store: Store) {
    this.selectedLang = this.store.selectSnapshot(SettingsState.language);
  }

  setLanguage(lang: string) {
    this.selectedLang = lang;
    this.store.dispatch(new SetLanguage(lang));
  }
}