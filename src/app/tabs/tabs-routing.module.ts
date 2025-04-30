import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../tab1/tab1.page').then(m => m.Tab1Page) // root -> tab1
      },
      {
        path: 'favorites',
        loadComponent: () => import('../tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: 'settings',
        loadComponent: () => import('../tab3/tab3.page').then(m => m.Tab3Page)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
